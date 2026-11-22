import {useState} from "react";
import {
    Alert,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {useLogOut} from "../hooks/UseAuth.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {useDeleteUser, useExportUserData} from "../hooks/UseUser.ts";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import {BaseDialog} from "./BaseDialog.tsx";

export function ProfileOptionsMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const {logout, isLoggingOut} = useLogOut();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openRequestDialog, setOpenRequestDialog] = useState(false);
    const {deleteAccount, isDeleting} = useDeleteUser();
    const [countdownStartedAt, setCountdownStartedAt] = useState<number | null>(null);
    const {downloadUserData, isDownloading} = useExportUserData();
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = async () => {
        handleMenuClose();
        await logout();
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            setOpenDeleteDialog(false);
            await handleLogout();
        } catch (error) {
            console.error("Failed to delete account:", error);
        }
    };

    const handleRequestData = async () => {
        try {
            await downloadUserData();
            setOpenRequestDialog(false);
        } catch (error) {
            console.error("Failed to export user data:", error);
        }
    };

    return (
        <>
            <IconButton
                aria-label="Profile options"
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                <MoreVertIcon sx={{color: "text.secondary"}}/>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                slotProps={{
                    paper: {
                        elevation: 3,
                        sx: {
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 2,
                        },
                    },
                    list: {
                        sx: {p: 0},
                    },
                }}
            >
                <MenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    sx={{
                        px: 2,
                        py: 1.5,
                        color: "secondary.main",
                        "& .MuiSvgIcon-root": {
                            color: "secondary.main",
                            transition: "transform 500ms ease",
                        },
                        "& .MuiListItemText-root": {
                            transition: "transform 500ms ease",
                        },
                        "&:hover": {
                            bgcolor: "secondary.main",
                            color: "black",
                            "& .MuiListItemIcon-root": {
                                color: "black",
                            },
                            "& .MuiSvgIcon-root": {
                                color: "black",
                                transform: "translateX(-3rem)",
                            },
                            "& .MuiListItemText-root": {
                                transform: "translateX(1.25rem)",
                            },
                        },
                    }}
                >
                    <ListItemIcon>
                        <LogoutOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Log out"/>
                </MenuItem>

                <Divider sx={{margin: "0 !important"}}/>

                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        setCountdownStartedAt(Date.now());
                        setOpenRequestDialog(true);
                    }}
                    disabled={isLoggingOut}
                    sx={{
                        px: 2,
                        py: 1.5,
                        "& .MuiSvgIcon-root": {
                            color: "text.disabled",
                            transition: "transform 500ms ease",
                        },
                        "& .MuiListItemText-root": {
                            color: "text.disabled",
                            transition: "transform 500ms ease",
                        },
                        "&:hover": {
                            color: "text.disabled",
                            "& .MuiSvgIcon-root": {
                                transform: "translateX(-3rem)",
                            },
                            "& .MuiListItemText-root": {
                                transform: "translateX(-1rem)",
                            },
                        },
                    }}
                >
                    <ListItemIcon>
                        <DescriptionOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Request my data"/>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        setCountdownStartedAt(Date.now());
                        setOpenDeleteDialog(true);
                    }}
                    sx={{
                        px: 2,
                        py: 1.5,
                        color: "secondary.main",
                        "& .MuiSvgIcon-root": {
                            color: "secondary.main",
                            transition: "transform 500ms ease",
                        },
                        "& .MuiListItemText-root": {
                            transition: "transform 500ms ease",
                        },
                        "&:hover": {
                            bgcolor: "secondary.main",
                            color: "black",
                            "& .MuiListItemIcon-root": {
                                color: "black",
                            },
                            "& .MuiSvgIcon-root": {
                                color: "black",
                                transform: "translateX(-3rem)",
                            },
                            "& .MuiListItemText-root": {
                                transform: "translateX(-0.5rem)",
                            },
                        },
                    }}
                >
                    <ListItemIcon>
                        <DeleteIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Delete account"/>
                </MenuItem>
            </Menu>

            <BaseDialog
                open={openDeleteDialog}
                isLoading={isDeleting}
                confirmDelaySeconds={10}
                countdownStartedAt={countdownStartedAt}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDeleteAccount}
                title="Delete Your Account"
                description="Are you sure you want to delete your account? This action will initiate the deletion of your profile and all associated data, including your watchlist, currently watching, and completed list."
                confirmText="Delete account"
                alert={
                    <Alert
                        icon={<InfoOutlinedIcon fontSize="small"/>}
                        severity="warning"
                        variant="outlined"
                        sx={{mt: 3, textAlign: "left", borderRadius: 3, alignItems: "center"}}
                    >
                        You can request an account restoration within 30 days.
                        After that, your account and data will be permanently deleted.
                    </Alert>
                }
            />

            <BaseDialog
                open={openRequestDialog}
                isLoading={isDownloading}
                confirmDelaySeconds={10}
                countdownStartedAt={countdownStartedAt}
                onClose={() => setOpenRequestDialog(false)}
                onConfirm={handleRequestData}
                title="Request Your Data"
                description="Would you like to download a copy of the personal data associated with your account? This includes your profile information, personal preferences, favorites, watchlist, currently watching, and completed lists."
                confirmText="Download Data"
            />
        </>
    );
}