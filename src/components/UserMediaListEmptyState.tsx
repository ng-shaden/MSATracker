import {alpha, Box, Button, Stack, Typography, useTheme} from "@mui/material";
import {Link} from "react-router";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import type {ElementType} from "react";

interface UserMediaListEmptyStateProps {
    icon: ElementType;
    overline: string
    title: string
    text: string
}

export function UserMediaListEmptyState({icon: Icon, overline, title, text}: UserMediaListEmptyStateProps) {
    const theme = useTheme();

    return (
        <Stack p={{xs: 5}} alignItems="center" justifyContent={"center"} spacing={3} border={"2px dashed"} borderRadius={3}
               borderColor={"divider"} flex={1}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    border: "0.8px solid",
                    borderColor: alpha(theme.palette.secondary.main, 0.8),
                    borderRadius: 4,
                    p: 2,
                }}
            >
                <Icon
                    sx={{
                        fontSize: {xs: "1.5rem", sm: "2rem", md: "3rem"},
                        transform: "rotate(-10deg)",
                        color: alpha(theme.palette.secondary.light, 0.8)
                    }}
                />
            </Box>
            <Stack alignItems="center" justifyContent={"center"} spacing={1}>
                <Typography variant="body1" color={alpha(theme.palette.secondary.main, 0.8)}>{overline}</Typography>
                <Typography color={alpha(theme.palette.text.primary, 0.9)} variant="h6">
                    {title}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                    {text}
                </Typography>
            </Stack>
            <Button component={Link} to="/home" variant={"outlined"} color="secondary" size={"large"}
                    endIcon={<ArrowRightAltOutlinedIcon/>} sx={{borderRadius: 2}}>
                Browse trending media
            </Button>
        </Stack>
    )
}