import {Box, Button, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router";

export default function NotFoundPage() {
    return (
        <Stack
            minHeight="100dvh"
            alignItems="center"
            justifyContent="center"
            px={3}
            py={6}
            sx={{
                position: "relative",
                overflow: "hidden",
                textAlign: "center",
                background: (theme) => `radial-gradient(ellipse at 50% 45%, ${theme.palette.secondary.main}12 0%, transparent 55%)`,
            }}
        >
            {/* Decorative background elements */}
            <Box
                sx={{
                    position: "absolute",
                    width: 350,
                    height: 350,
                    borderRadius: "50%",
                    border: "1px solid",
                    borderColor: "divider",
                    opacity: 0.35,
                    pointerEvents: "none",
                }}
            />

            <Stack
                alignItems="center"
                spacing={3}
                maxWidth={520}
                sx={{position: "relative"}}
            >
                <Box
                    component="img"
                    src="/logo.png"
                    alt="msatracker logo"
                    sx={{
                        width: {xs: 150, sm: 190},
                    }}
                />

                <Stack spacing={0} alignItems="center">
                    <Typography
                        variant="h1"
                        fontWeight={800}
                        sx={{
                            fontSize: {xs: "6rem", sm: "8rem"},
                            lineHeight: 1,
                            color: "secondary.main",
                            textShadow: (theme) => `0 0 50px ${theme.palette.secondary.main}35`,
                        }}
                    >
                        404
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{mt: 2}}
                    >
                        Lost in the wrong scene?
                    </Typography>
                </Stack>

                <Typography
                    color="text.secondary"
                    sx={{
                        maxWidth: 380,
                        lineHeight: 1.8,
                    }}
                >
                    Looks like this page isn't part of our collection.
                    It may have been moved or no longer exists.
                </Typography>

                <Button
                    component={RouterLink}
                    to="/home"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                        mt: 2,
                        px: 4,
                        py: 1.2,
                        borderRadius: 2,
                        fontWeight: 600,
                        boxShadow: (theme) => `0 4px 20px ${theme.palette.secondary.main}35`,
                    }}
                >
                    Back to Home
                </Button>
            </Stack>
        </Stack>
    );
}