import {SlideUp} from "./SlideUp.tsx";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {type ReactNode, useEffect, useState} from "react";

interface BaseDialogProps {
    open: boolean;
    isLoading?: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onClose: () => void;
    alert?: ReactNode;
    confirmDelaySeconds?: number;
    countdownStartedAt?: number | null;
}

export function BaseDialog({
                               open,
                               isLoading = false,
                               title,
                               description,
                               confirmText = "Confirm",
                               cancelText = "Cancel",
                               onConfirm,
                               onClose,
                               alert,
                               confirmDelaySeconds,
                               countdownStartedAt
                           }: BaseDialogProps) {
    const [remainingSeconds, setRemainingSeconds] = useState(0);

    useEffect(() => {
        if (!open || !countdownStartedAt || !confirmDelaySeconds) {
            return;
        }

        const updateCountdown = () => {
            const remaining = Math.max(
                0,
                Math.ceil(
                    (countdownStartedAt + confirmDelaySeconds * 1000 - Date.now()) / 1000
                )
            );

            setRemainingSeconds(remaining);

            if (remaining === 0) {
                window.clearInterval(interval);
            }
        };

        const interval = window.setInterval(updateCountdown, 250);

        updateCountdown();

        return () => window.clearInterval(interval);
    }, [open, countdownStartedAt, confirmDelaySeconds]);

    return (
        <Dialog
            open={open}
            onClose={() => !isLoading && onClose()}
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
                {title}
            </DialogTitle>

            <DialogContent sx={{textAlign: "center"}}>
                <DialogContentText id="delete-account-description" variant="body2">
                    {description}
                </DialogContentText>

                {alert}
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
                    onClick={onClose}
                    disabled={isLoading}
                    sx={{
                        borderRadius: 2,
                    }}
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    loading={isLoading}
                    disabled={isLoading || remainingSeconds > 0}
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
                    {remainingSeconds > 0
                        ? `${confirmText} (${remainingSeconds})`
                        : confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}