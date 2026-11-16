import {Button, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router";

function NotFoundPage() {
    return (
        <Stack display="flex" alignItems="center" justifyContent="center" height="100dvh" spacing={2}
               textAlign={"center"} p={3}>
            <Typography variant="h1" fontWeight={700} color={"secondary"}>
                404
            </Typography>

            <Typography variant="h5">Page not found</Typography>

            <Typography color="text.secondary">
                The page you're looking for doesn't exist or has been moved.
            </Typography>

            <Button component={RouterLink} to="/home" variant="outlined" color="secondary">
                Go Home
            </Button>
        </Stack>
    );
}

export default NotFoundPage