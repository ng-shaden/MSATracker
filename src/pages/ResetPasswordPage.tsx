import {AuthLayout} from "../components/auth/AuthLayout.tsx";
import {useState, type SubmitEvent} from "react";
import {Alert, Box, Button, Divider, Link as MuiLink, Stack, TextField, Typography} from "@mui/material";
import {Navigate, useNavigate} from "react-router";
import {useLogOut, useUpdatePassword} from "../hooks/UseAuth.ts";
import {UserAuth} from "../context/AuthContextProvider.tsx";

export function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {updatePassword, isUpdatingPassword, error} = useUpdatePassword();
    const navigate = useNavigate();
    const {logout, isLoggingOut} = useLogOut();
    const {isPasswordRecovery, loading} = UserAuth();

    // REQUIRED so that passwordResetSuccess gets passed on LoginPage as true and shows snackbar
    // (without: after successful updatePassword page rerenders and uses navigate to login from check below not the one in onSubmit
    const [isLeavingRecovery, setIsLeavingRecovery] = useState(false);

    // REQUIRED to check since at loading isPasswordRecovery is false because PASSWORD_RECOVERY_KEY is undefined and causes the user to navigate to login as per next check
    if (loading) return null;
    if (!isPasswordRecovery && !isLeavingRecovery) return <Navigate to="/login" replace/>;

    async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (password !== confirmPassword) return;

        try {
            await updatePassword(password);
            setIsLeavingRecovery(true);
            await logout();
            navigate("/login", {replace: true, state: {passwordResetSuccess: true}});
        } catch {
            setIsLeavingRecovery(false);
        }
    }

    async function handleBackToLogin() {
        try {
            setIsLeavingRecovery(true);
            await logout();
            navigate("/login", {replace: true});
        } catch {
            setIsLeavingRecovery(false);
        }
    }

    return (
        <AuthLayout>
            <Stack component="form" onSubmit={onSubmit} spacing={4}>
                <Box>
                    <Typography color={"textSecondary"} sx={{letterSpacing: '0.1em'}}>
                        Reset your password.
                    </Typography>

                    <Typography fontSize={{xs: "3rem", lg: "2.7rem", xl: "3rem"}} fontWeight={500}>
                        Get back in msa
                        <Box component="span" color="secondary.main">
                            tracker
                        </Box>
                    </Typography>
                </Box>

                <Stack spacing={2}>
                    <TextField
                        label="New password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password"
                        required
                        fullWidth
                    />

                    <TextField
                        label="Confirm password"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        autoComplete="new-password"
                        error={confirmPassword.length > 0 && password !== confirmPassword}
                        helperText={confirmPassword.length > 0 && password !== confirmPassword ? "Passwords do not match" : ""}
                        required
                        fullWidth
                    />

                    {error && (
                        <Alert severity="error">
                            {error.message}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={
                            isUpdatingPassword ||
                            isLoggingOut ||
                            !password ||
                            !confirmPassword ||
                            password !== confirmPassword
                        }
                    >
                        {"Reset password"}
                    </Button>
                </Stack>
                <Divider/>
                <Typography variant="body2" textAlign="center" color={"textSecondary"} sx={{letterSpacing: '0.1em'}}>
                    Remembered your password? {" "}
                    <MuiLink
                        component="button"
                        type="button"
                        onClick={handleBackToLogin}
                        underline="hover"
                        sx={{
                            all: "unset",
                            color: "secondary.main",
                        }}
                    >
                        Log in
                    </MuiLink>
                </Typography>
            </Stack>
        </AuthLayout>
    )
}