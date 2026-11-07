import {useState} from "react";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
import {useDeleteUser} from "../hooks/UseUser.ts";
import {SlideUp} from "./SlideUp.tsx";

export function ProfileOptionsMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const {logout, isLoggingOut} = useLogOut();
    const [openDialog, setOpenDialog] = useState(false);
    const {deleteAccount, isDeleting} = useDeleteUser();

    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = async () => {
        handleMenuClose();
        await logout();
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            setOpenDialog(false);
            await handleLogout();
        } catch (error) {
            console.error("Failed to delete account:", error);
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
                                transform: "translateX(-1rem)",
                            },
                        },
                    }}
                >
                    <ListItemIcon>
                        <LogoutOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Log out"/>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        setOpenDialog(true);
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
                                transform: "translateX(-1rem)",
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
            <Dialog
                open={openDialog}
                onClose={() => !isDeleting && setOpenDialog(false)}
                aria-labelledby="delete-account-title"
                aria-describedby="delete-account-description"
                maxWidth="sm"
                fullWidth
                slots={{transition: SlideUp}}
                slotProps={{
                    paper: {
                        sx: {borderRadius: 4, border: 1, borderColor: "divider", p: 1},
                    },
                }}
            >
                <DialogTitle
                    id="delete-account-title"
                    sx={{textAlign: "center", fontWeight: 700, pb: 1}}
                >
                    Delete your account?
                </DialogTitle>

                <DialogContent sx={{textAlign: "center"}}>
                    <DialogContentText id="delete-account-description" variant="body2">
                        Are you sure you want to delete your account? This action
                        will initiate the deletion of your profile and all associated
                        data, including your watchlist, currently watching, and completed list.
                    </DialogContentText>

                    <Alert icon={<InfoOutlinedIcon fontSize="small"/>} severity="warning" variant="outlined"
                           sx={{mt: 3, textAlign: "left", borderRadius: 3, alignItems: "center",}}>
                        You can request account restoration within 30 days.
                        After that, your account and data will be permanently deleted.
                    </Alert>
                </DialogContent>

                <DialogActions sx={{
                    px: 3,
                    pb: 2,
                    flexDirection: "column-reverse",
                    gap: 1,
                    "& > :not(style)": {
                        width: "100%"
                    }
                }}>
                    <Button
                        onClick={() => setOpenDialog(false)}
                        disabled={isDeleting}
                        sx={{
                            borderRadius: 2,
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteAccount}
                        loading={isDeleting}
                        variant="contained"
                        sx={{
                            bgcolor: "secondary.main",
                            color: "text.primary",
                            borderRadius: 2,
                            "&:hover": {
                                bgcolor: "secondary.dark",
                            },
                        }}
                    >
                        Delete account
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}