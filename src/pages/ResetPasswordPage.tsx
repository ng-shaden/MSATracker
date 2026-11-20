import {Alert, Box, Button, Divider, Link as MuiLink, Stack, TextField, Typography} from "@mui/material";
import {AuthLayout} from "../components/auth/AuthLayout.tsx";
import {type SubmitEvent, useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router";
import {useResetPassword} from "../hooks/UseAuth.ts";

export function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const {resetPassword, isResettingPassword, error} = useResetPassword();
    const navigate = useNavigate();

    async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        resetPassword(
            email.trim(),
            {
                onSuccess: () => {
                    navigate("/login", {state: {forgotPasswordSuccess: true}})
                }
            }
        )
    }

    return (
        <AuthLayout>
            <Stack component="form" onSubmit={onSubmit} spacing={4}>
                <Box>
                    <Typography color={"textSecondary"} sx={{letterSpacing: '0.1em'}}>
                        Forgot your password? No worries! It happens.
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
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
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
                        disabled={!email.trim() || isResettingPassword}
                        fullWidth
                    >
                        {isResettingPassword ? "Sending..." : "Next"}
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