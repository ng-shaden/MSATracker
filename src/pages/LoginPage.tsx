import {useState, type SubmitEvent} from "react";
import {useLocation, useNavigate} from "react-router";
import {useLogIn} from "../hooks/UseAuth.ts";
import {AuthLayout} from "../components/auth/AuthLayout.tsx";
import {AuthForm} from "../components/auth/AuthForm.tsx";
import type {AuthError} from "@supabase/supabase-js";
import {NotificationPopUp} from "../components/NotificationPopUp.tsx";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, isLoggingIn, error} = useLogIn();
    const navigate = useNavigate();
    const location = useLocation();

    const [showSignupSuccess, setShowSignupSuccess] = useState(
        location.state?.signupSuccess === true
    );

    const [showForgotPasswordSuccess, setForgotPasswordSuccess] = useState(
        location.state?.forgotPasswordSuccess === true
    );

    const [showResetPasswordSuccess, setShowResetPasswordSuccess] = useState(
        location.state?.passwordResetSuccess === true
    );

    const isBanned = (error as AuthError | null)?.code === "user_banned";

    const errorMessage = isBanned ? "This account has been deleted. Please contact support." : error?.message;

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        login(
            {email: email.trim(), password},
            {onSuccess: () => navigate("/home", {replace: true})},
        );
    }

    return (
        <AuthLayout>
            <AuthForm
                title="Login to"
                subtitle="Welcome back! Sign in to continue."
                submitLabel="Login"
                loadingLabel="Logging in..."
                email={email}
                password={password}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSubmit={handleSubmit}
                isLoading={isLoggingIn}
                error={errorMessage}
                footerText="Don't have an account?"
                footerLinkText="Sign up"
                footerLinkTo="/signup"
            />

            <NotificationPopUp
                open={showSignupSuccess}
                onClose={() => setShowSignupSuccess(false)}
                title={"Account created successfully!"}
                subtitle={"Check your inbox to confirm your email address."}
            />

            <NotificationPopUp
                open={showForgotPasswordSuccess}
                onClose={() => setForgotPasswordSuccess(false)}
                title="Password reset email sent!"
                subtitle={"Check your inbox to reset your password."}
            />

            <NotificationPopUp
                open={showResetPasswordSuccess}
                onClose={() => setShowResetPasswordSuccess(false)}
                title="Your password has been updated!"
                subtitle="Please log in with your new password."
            />
        </AuthLayout>
    );
}