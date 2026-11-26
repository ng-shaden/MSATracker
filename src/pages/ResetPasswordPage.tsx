import {AuthLayout} from "../components/auth/AuthLayout.tsx";
import {useState, type SubmitEvent} from "react";
import {Alert, Box, Button, Divider, Link as MuiLink, Stack, TextField, Typography} from "@mui/material";
import {Link as RouterLink, useNavigate} from "react-router";
import {useLogOut, useUpdatePassword} from "../hooks/UseAuth.ts";

export function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {updatePassword, isUpdatingPassword, error} = useUpdatePassword();
    const navigate = useNavigate();
    const {logout, isLoggingOut} = useLogOut();

    // TODO secure (should check if user has authentication token page should be accessable to public users
    async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (password !== confirmPassword) return;

        try {
            await updatePassword(password);
            await logout();
            navigate("/login", {replace: true, state: { passwordResetSuccess: true },});
        } catch {
            // Errors are exposed through the mutation states.
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
                <Typography variant="body2" textAlign="center" color={"textSecondary"}
                            sx={{letterSpacing: '0.1em'}}>
                    Remembered your password? {" "}
                    <MuiLink
                        component={RouterLink}
                        to={"/login"}
                        underline="none"
                        sx={{
                            color: "secondary.main",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Log in
                    </MuiLink>
                </Typography>
            </Stack>
        </AuthLayout>
    )
}