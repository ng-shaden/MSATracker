import {Box, Divider, Stack, Typography, Link as MuiLink,} from "@mui/material";
import {Link as RouterLink} from "react-router";
import {CONTACT_EMAIL, OPERATOR_NAME} from "../utils/utils.ts";

export function TermsAndConditionsPage() {
    return (
        <Stack mt={{xs: 12, md: 16}} mb={{xs: 10}} mx={{xs: 5, md: 8}} spacing={5}>
            <Stack spacing={2}>
                <Typography variant="h3">
                    Terms &{" "}
                    <Box component="span" color="secondary.main">
                        Conditions
                    </Box>
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Last updated: 26 November 2026
                </Typography>

                <Typography variant="body1" color="text.secondary" maxWidth={850}>
                    Welcome to MSATracker ("we", "us" or "our").
                    These Terms & Conditions govern
                    your access to and use of MSATracker, including its
                    website, features and associated functionality (the "Service"). By creating an account or using the
                    Service, you
                    agree
                    to these Terms & Conditions. If you do not agree with
                    them, you should not use the Service.
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    MSATracker is operated by {OPERATOR_NAME}, based in Belgium.
                </Typography>
            </Stack>

            <Divider/>

            <Stack spacing={5} maxWidth={900}>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        1. Description of the Service
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        MSATracker is a platform designed to help users organize
                        and track movies, television series and anime. MSATracker is not a streaming service. We do not
                        host,
                        distribute or provide movies, television episodes or anime for streaming or downloading. The
                        Service allows users to:
                    </Typography>

                    <Stack>
                        <Typography variant="body1" color="text.secondary">
                            - Search for movies, series and anime.
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            - Create and manage personal watchlists.
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            - Track viewing progress and completed titles.
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            - Save and manage personal media-related preferences.
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            - Access other features made available through the platform.
                        </Typography>
                    </Stack>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        2. Eligibility
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You must be at least 13 years old to use MSATracker. If you are
                        under 18, you may use the Service only with the permission of a
                        parent or legal guardian. You must not use the Service if doing so
                        would violate applicable laws or regulations.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        3. Account Registration and Security
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You must create an account and sign in to use MSATracker.
                        When registering, you agree to provide accurate and
                        up-to-date information.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You are responsible for keeping your account credentials
                        confidential and for notifying us if you become aware of
                        unauthorized access to your account. You are responsible for activity carried out through
                        your account, to the extent permitted by applicable law.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You must not impersonate another person or create an
                        account using misleading information.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        4. Acceptable Use
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You agree to use MSATracker lawfully and responsibly.
                        You must not use the Service for unlawful purposes,
                        attempt to gain unauthorized access to accounts or
                        systems, interfere with its security or operation,
                        introduce malicious software, or exploit vulnerabilities.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You must not scrape or collect data through unauthorized
                        automated means, bypass security measures, distribute
                        spam or harmful material, or use the Service in a way
                        that negatively affects other users.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We reserve the right to investigate suspected violations
                        and take appropriate action where necessary.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        5. User-Submitted Content
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You may submit information and content to MSATracker,
                        such as profile pictures and account information.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You retain ownership of content you submit, where
                        applicable. By submitting content, you grant us a
                        limited, non-exclusive license to store, process,
                        display and use that content solely as necessary to
                        operate, maintain and provide the Service.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You are responsible for ensuring that content you submit
                        does not violate applicable laws or infringe the rights
                        of others.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We reserve the right to remove content that violates
                        these Terms & Conditions or applicable law.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        6. Intellectual Property
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Unless otherwise stated, the MSATracker name, branding,
                        logos, website design, original software and other
                        original materials are owned by or licensed to us.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You may not reproduce, distribute, modify, sell or
                        commercially exploit our intellectual property without
                        prior written permission, except where permitted by law.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Media titles, descriptions, posters and other third-party
                        materials remain the property of their respective owners
                        and are subject to their own rights and licenses.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        7. Third-Party Services
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        MSATracker relies on third-party services to operate certain
                        features, including{" "}
                        <MuiLink
                            href="https://www.themoviedb.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            color="secondary"
                        >
                            The Movie Database (TMDB)
                        </MuiLink>
                        {" "}for media information and images, and Supabase for
                        authentication, database and infrastructure services. These services
                        are subject to their own terms, privacy policies and availability.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved
                        by TMDB.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        For details on how these providers process personal data, see our{" "}
                        <MuiLink
                            component={RouterLink}
                            to="/privacy-policy"
                            underline="hover"
                            color="secondary"
                        >
                            Privacy Policy
                        </MuiLink>.
                    </Typography>

                    <Typography variant="subtitle1" fontWeight={600}>
                        Voluntary Donations
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        MSATracker may offer an optional way to donate to support its
                        development. Donations are entirely voluntary, do not give you any
                        additional features, rights or priority access, and do not
                        constitute a purchase of goods or services.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Donations are made through third-party platforms, such as
                        PayPal and Buy Me a Coffee, and are subject to their
                        respective terms and conditions and privacy policies.
                        Except where required by applicable law, donations are
                        non-refundable.
                    </Typography>

                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        8. Service Availability and Modifications
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We aim to keep MSATracker available and functioning
                        properly. However, we do not guarantee that the Service
                        will always be available, uninterrupted, secure or free
                        from errors. The Service may occasionally be unavailable due to
                        maintenance, updates, technical problems or circumstances
                        outside our control.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We may modify, suspend or discontinue all or part of
                        the Service where reasonably necessary.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        9. Account Suspension, Termination and Deletion
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We may suspend, restrict or terminate access to an
                        account where these Terms & Conditions have been
                        violated, the account is being used for unlawful or
                        harmful activities, a security risk exists, or we are
                        legally required to do so.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Where appropriate and legally permitted, we will inform
                        affected users of the reason for the action.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You may stop using MSATracker and request deletion of
                        your account at any time through the available account
                        settings or by contacting us. Deleted accounts enter a
                        pending deletion period before permanent removal, during
                        which you may request restoration by contacting us.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Details about the deletion period and personal data
                        retention are available in our{" "}
                        <MuiLink
                            component={RouterLink}
                            to="/privacy-policy"
                            underline="hover"
                            color="secondary"
                        >
                            Privacy Policy
                        </MuiLink>.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        10. Disclaimers
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        MSATracker is provided on an "as available" basis.
                        We make reasonable efforts to maintain accurate and
                        reliable information, but we do not guarantee the
                        accuracy, completeness or availability of media
                        information supplied by third parties.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We are not responsible for inaccuracies, changes or
                        interruptions originating from external providers,
                        except where applicable law provides otherwise.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Nothing in these Terms & Conditions excludes or limits
                        any consumer rights or legal protections that cannot
                        be excluded or limited under applicable law.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        11. Limitation of Liability
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        To the extent permitted by applicable law, we will not
                        be liable for indirect or consequential losses arising
                        from the use of, or inability to use, MSATracker.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Nothing in these Terms & Conditions excludes or limits
                        liability where such exclusion or limitation is
                        prohibited by law, including liability that cannot
                        legally be excluded. Nothing in this section affects your mandatory
                        statutory rights as a consumer.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        12. Privacy and Personal Data
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We process personal data in accordance with applicable
                        data protection legislation, including the General Data
                        Protection Regulation (GDPR).
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Our Privacy Policy explains what personal data we
                        collect, why and how we process it, the legal bases
                        for processing, how long we retain it, whether it is
                        shared with third parties and what rights you have.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Please read our {" "}
                        <MuiLink
                            component={RouterLink}
                            to="/privacy-policy"
                            underline="hover"
                            color="secondary"
                        >
                            Privacy Policy
                        </MuiLink>
                        {" "} for further information
                        about how we handle your personal data.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        13. Changes to These Terms
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We may update these Terms & Conditions from time to
                        time to reflect changes to the Service, our operating
                        practices or applicable legal requirements.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We will take reasonable steps to inform users of
                        significant changes, such as displaying a notice
                        on the website or through another appropriate
                        communication method.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        The updated version will include a revised
                        "Last updated" date. Where explicit agreement is
                        legally required, we will request it.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        14. Governing Law and Disputes
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        These Terms & Conditions are governed by the laws
                        of Belgium, without prejudice to mandatory consumer
                        protection rules that may apply.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Any disputes will be handled by the competent courts
                        in accordance with applicable law.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Nothing in this section deprives consumers of
                        mandatory rights concerning the courts or laws
                        that apply to them.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        15. Contact
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        If you have questions about these Terms & Conditions
                        or need to contact us regarding a legal matter,
                        you can reach us through our {" "}
                        <MuiLink
                            component={RouterLink}
                            to="/contact"
                            underline="hover"
                            color="secondary"
                        >
                            Contact page
                        </MuiLink>.
                    </Typography>

                    {/*TODO add address*/}
                    <Stack>
                        <Typography variant="body1" color="text.secondary">
                            Operator: {OPERATOR_NAME}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Country: Belgium
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Email: {" "}
                            <MuiLink
                                href={`mailto:${CONTACT_EMAIL}`}
                                color="secondary"
                                underline="hover"
                            >
                                {CONTACT_EMAIL}
                            </MuiLink>.
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}