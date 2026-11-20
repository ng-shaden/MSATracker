import {useMutation} from "@tanstack/react-query";
import {logInWithEmail, logOut, resetPassword, signUpNewUser} from "../services/authServices.ts";
import {isUsernameTaken} from "../services/userServices.ts";

export function useLogIn() {
    const {mutate, isPending: isLoggingIn, error} = useMutation({
        mutationFn: ({email, password}: { email: string; password: string; }) => logInWithEmail(email, password),
    });

    return {
        login: mutate,
        isLoggingIn,
        error,
    };
}

export function useSignUp() {
    const {mutate, isPending: isSigningUp, error} = useMutation({
        mutationFn: async ({email, password, firstName, lastName, userName}: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            userName: string
        }) => {

            if (await isUsernameTaken(userName)) {
                throw new Error("USERNAME_TAKEN");
            }

            return signUpNewUser(email, password, firstName, lastName, userName);
        },
    });

    return {
        signUp: mutate,
        isSigningUp,
        error,
    };
}

export function useLogOut() {
    const {mutateAsync, isPending: isLoggingOut, error,} = useMutation({
        mutationFn: logOut,
    });

    return {
        logout: mutateAsync,
        isLoggingOut,
        error,
    };
}

export function useResetPassword() {
    const {mutate, isPending: isResettingPassword, error} = useMutation({
        mutationFn: resetPassword,
    });

    return {
        resetPassword: mutate,
        isResettingPassword,
        error,
    };
}