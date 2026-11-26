import {supabase} from "../lib/supabaseClient.ts";

export async function logInWithEmail(email: string, password: string) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) throw error;

    return {data};
}

export async function signUpNewUser(email: string, password: string, firstName: string, lastName: string, userName: string) {
    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: `${window.location.origin}/home`,
            data: {
                username: userName,
                email: email,
                first_name: firstName,
                last_name: lastName,
            }
        },
    })

    if (error) throw error;

    return {data};
}

export async function logOut() {
    const {error} = await supabase.auth.signOut({scope: "local"});
    if (error) throw error;
}

export async function resetPassword(email: string) {
    const {data, error} = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return {data};
}

export async function updatePassword(newPassword: string) {
    const {data, error} = await supabase.auth.updateUser({
        password: newPassword,
    });
    if (error) throw error;
    return {data};
}