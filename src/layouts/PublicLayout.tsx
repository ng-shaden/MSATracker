import {Outlet, useNavigate} from "react-router";
import {Box, Stack, Typography} from "@mui/material";
import {Footer} from "../components/Footer.tsx";

export default function PublicLayout() {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate("/home")
    }

    return (
        <Box position={"relative"}>
            <Box position="fixed" top={20} left={{xs: 20, sm: 50}} zIndex={10}>
                <Stack direction={"row"} alignItems={"center"} spacing={1} onClick={handleLogoClick}
                       sx={{cursor: "pointer"}}>
                    <Box
                        component="img"
                        src="logo.png"
                        alt="msatracker logo"
                        width={{xs: 50}}
                    />
                    <Typography fontSize={{xs: "1.2rem", sm: "1.5rem"}} noWrap fontWeight={600}>
                        msa
                        <Box component={"span"} color={"secondary.main"}>
                            tracker
                        </Box>
                    </Typography>
                </Stack>
            </Box>
            <Outlet/>
            <Footer brandName={"msatracker"}/>
        </Box>
    );
}