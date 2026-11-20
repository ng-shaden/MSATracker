import {Alert, Snackbar, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Slide, {type SlideProps} from "@mui/material/Slide";

interface NotificationPopUpProps {
    open: boolean;
    onClose: () => void;
    title: string;
    subtitle: string;
}

export function NotificationPopUp({open, onClose, title, subtitle}: NotificationPopUpProps) {
    function SlideTransition(props: SlideProps) {
        return <Slide {...props} direction="left"/>;
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            slots={{transition: SlideTransition}}
            sx={{
                mt: 2,
                mr: {xs: 0, md: 2},
                "& .MuiSnackbarContent-root": {
                    borderRadius: 3,
                },
            }}
        >
            <Alert
                icon={<CheckIcon fontSize={"large"}/>}
                severity="success"
                variant="outlined"
                onClose={onClose}
                sx={{
                    borderRadius: 2,
                    border: "2px solid",
                    borderColor: "success.dark",
                    bgcolor: "background.paper",
                    color: "success.main",
                    "& .MuiAlert-icon": {
                        alignItems: "center",
                    },
                    "& .MuiAlert-message": {
                        py: 0.5,
                    }
                }}
            >
                <Typography variant={"subtitle1"} lineHeight={{xs: 1.1, sm: "auto"}} mb={{xs: 1, sm: 0.5}}
                            fontWeight={600}>{title}</Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={{xs: "auto", sm: 1.1}}>
                    {subtitle}
                </Typography>
            </Alert>
        </Snackbar>
    )
}