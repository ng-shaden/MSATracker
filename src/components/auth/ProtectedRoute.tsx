import {Navigate, Outlet, useLocation} from "react-router";
import {UserAuth} from "../../context/AuthContextProvider.tsx";
import {Box, CircularProgress} from "@mui/material";

export default function ProtectedRoute() {
    const {user, supabaseUser, loading} = UserAuth();
    const location = useLocation();

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress/>
            </Box>
        );
    }

    if (!supabaseUser || !user) {
        return (
            <Navigate to="/login" replace state={{from: location}}/>
        );
    }

    return <Outlet/>;
}
