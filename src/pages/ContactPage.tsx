import {Box, Divider, Stack, Typography, Link as MuiLink} from "@mui/material";
import {ContactFormFields} from "../components/ContactFormFields.tsx";
import {GITHUB_URL, LINKEDIN_URL} from "../utils/utils.ts";
import {Link as RouterLink} from "react-router"

export function ContactPage() {
    return (
        <Stack mt={{xs: 16}} mb={{xs: 10}} ml={{xs: 5, md: 8}} mr={{xs: 5, md: 8}} spacing={8}>
            <Stack spacing={3}>
                <Typography variant={"h3"}>
                    Contact{" "}
                    <Box component="span" color="secondary.main">
                        Us
                    </Box>
                </Typography>
                <Typography variant="body1" color="text.secondary" maxWidth={800}>
                    For general inquiries, feedback, technical support, or legal matters,
                    please use the contact form below. All inquiries are welcome and will
                    be reviewed as soon as possible. Alternatively, you may also reach out
                    through my {" "}
                    <MuiLink
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="secondary"
                        underline="hover"
                    >
                        LinkedIn
                    </MuiLink>
                    {" "}or{" "}
                    <MuiLink
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="secondary"
                        underline="hover"
                    >
                        GitHub
                    </MuiLink>
                    {" "}profiles.
                </Typography>
            </Stack>

            <Divider/>

            <ContactFormFields/>

            <Typography variant="body2" color="text.secondary">
                Your details are used only to respond to your enquiry. See our{" "}
                <MuiLink component={RouterLink} to="/privacy-policy" color="secondary" underline="hover">
                    Privacy Policy
                </MuiLink>.
            </Typography>
        </Stack>
    )
}