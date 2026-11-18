import {
    AppBar as MuiAppBar,
    type AppBarProps as MuiAppBarProps,
    Box,
    IconButton,
    Stack,
    styled,
    Toolbar,
    Typography,
} from "@mui/material";
import {collapsedDrawerWidth, drawerWidth, topBarHeight} from "../layoutConstants.ts";
import {SearchBar} from "./SearchBar.tsx";
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router";

interface AppBarProps extends MuiAppBarProps {
    open: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open = false}) => {
    const sidebarWidth = open ? drawerWidth : collapsedDrawerWidth;

    return {
        zIndex: theme.zIndex.drawer + 1,

        // Mobile
        marginLeft: 0,
        width: "100%",

        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: open
                ? theme.transitions.duration.enteringScreen
                : theme.transitions.duration.leavingScreen,
        }),

        // Desktop
        [theme.breakpoints.up("md")]: {
            marginLeft: sidebarWidth,
            width: `calc(100% - ${sidebarWidth}px)`,
        },
    };
});

interface TopBarProps {
    open: boolean;
    onMenuClick: () => void;
    onSearchOpen: () => void;
}

export default function TopBar({open, onMenuClick, onSearchOpen}: TopBarProps) {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/home")
    }

    return (
        <StyledAppBar position="fixed" open={open}>
            <Toolbar
                sx={{
                    height: topBarHeight,
                    bgcolor: "background.default",
                    borderBottom: 2,
                    borderColor: "divider",
                    alignItems: "center",
                    // position: "relative",
                }}
            >
                <IconButton
                    size="small"
                    aria-label="menu"
                    onClick={onMenuClick}
                    sx={{
                        display: {xs: "inline-flex", md: "none"},
                        mr: {xs: 1, md: 2},
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <Stack ml={{xs: 0, sm: 1.5, md: 2}} direction={"row"} flex={1} justifyContent={"space-between"}
                       alignItems={"center"}>
                    <Stack direction={"row"} alignItems={"center"} sx={{cursor: "pointer"}} onClick={handleLogoClick}>
                        <Box
                            component="img"
                            src="/logo.png"
                            alt="msatracker logo"
                            width={{xs: 50}}
                        />
                        <Typography variant="h5" noWrap fontWeight={600}>
                            msa
                            <Box component={"span"} color={"secondary.main"}>
                                tracker
                            </Box>
                        </Typography>
                    </Stack>
                    <SearchBar onSearchOpen={onSearchOpen}/>
                </Stack>
            </Toolbar>
        </StyledAppBar>
    );
}