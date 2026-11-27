import {type ReactNode, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.ts";
import {supabase} from "../lib/supabaseClient.ts";
import type {User as SupabaseUser} from "@supabase/supabase-js";
import type {User} from "../model/User.ts";

interface UserContextProviderProps {
    children: ReactNode;
}

const PASSWORD_RECOVERY_KEY = "password-recovery";

export const AuthContextProvider = ({children,}: UserContextProviderProps) => {
    const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | undefined>(undefined);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [sessionLoading, setSessionLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(true);

    const [isPasswordRecovery, setIsPasswordRecovery] = useState(
        () => sessionStorage.getItem(PASSWORD_RECOVERY_KEY) === "true"
    );

    // Restore the session and listen for authentication changes.
    useEffect(() => {
        let isMounted = true;

        const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            if (!isMounted) return;

            if (event === "PASSWORD_RECOVERY") {
                sessionStorage.setItem(PASSWORD_RECOVERY_KEY, "true");
                setIsPasswordRecovery(true);
            }

            if (event === "SIGNED_OUT") {
                sessionStorage.removeItem(PASSWORD_RECOVERY_KEY);
                setIsPasswordRecovery(false);
            }

            setSupabaseUser((prev) =>
                prev?.id === session?.user?.id ? prev : session?.user
            );
        });

        supabase.auth.getSession().then(({data, error}) => {
            if (!isMounted) return;

            if (error) {
                console.error("Failed to restore session:", error.message);
                setSupabaseUser(undefined);
                sessionStorage.removeItem(PASSWORD_RECOVERY_KEY);
                setIsPasswordRecovery(false);
            } else {
                setSupabaseUser(data.session?.user);

                if (!data.session) {
                    sessionStorage.removeItem(PASSWORD_RECOVERY_KEY);
                    setIsPasswordRecovery(false);
                }
            }

            setSessionLoading(false);
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    // Fetch the public profile for the authenticated user.
    useEffect(() => {
        let cancelled = false;

        async function fetchProfile() {
            // Wait until Supabase has restored the initial session.
            if (sessionLoading) return;

            if (!supabaseUser) {
                setUser(undefined);
                setProfileLoading(false);
                return;
            }

            setProfileLoading(true);

            try {
                const {data, error} = await supabase
                    .from("users")
                    .select(
                        "user_id, username, first_name, last_name, email, profile_picture"
                    )
                    .eq("user_id", supabaseUser.id)
                    .maybeSingle();

                if (cancelled) return;

                if (error) {
                    console.error("Failed to fetch profile:", error.message);
                    setUser(undefined);
                    return;
                }

                if (!data) {
                    console.error("No public profile found for this user.");
                    setUser(undefined);
                    await supabase.auth.signOut({scope: "local"});
                    return;
                }

                setUser({
                    userId: data.user_id,
                    username: data.username,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    profilePicture: data.profile_picture,
                });
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to fetch profile:", error);
                    setUser(undefined);
                }
            } finally {
                if (!cancelled) {
                    setProfileLoading(false);
                }
            }
        }

        void fetchProfile();

        return () => {
            cancelled = true;
        };
    }, [supabaseUser, sessionLoading]);

    const loading = sessionLoading || profileLoading;

    return (
        <AuthContext.Provider value={{supabaseUser, loading, user, setUser, isPasswordRecovery}}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
