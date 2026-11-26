import {Box, Button, Divider, Link as MuiLink, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router"
import {ImageBanner} from "../components/ImageBanner.tsx";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import {BUYMEACOFFEE_LINK, GITHUB_URL, LINKEDIN_URL, PAYPAL_DONATE_LINK} from "../utils/utils.ts";

export function AboutPage() {
    return (
        <>
            <ImageBanner/>
            <Divider/>
            <Stack alignItems={"center"} mb={8} mt={4} spacing={3}>
                <Box
                    component="img"
                    src="/logo.png"
                    alt="MSATracker logo"
                    sx={{
                        width: {xs: 190, sm: 240, md: 280},
                    }}
                />

                <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign={"justify"}>
                    MSATracker is a personal media tracking platform designed to make keeping track of your favourite
                    movies and TV series simple and enjoyable.
                </Typography>

                <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign={"justify"}>
                    Whether you're building a watchlist of titles you want to see, keeping track of what you're
                    currently
                    watching, or looking back at everything you've completed, MSATracker brings your media
                    collection
                    together in one place.
                </Typography>

                <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign={"justify"}>
                    Please Note that MSATracker is a media tracking platform, not a streaming service. It helps you
                    organize your watchlist and keep track of movies, TV series, and anime. No media content is hosted
                    or streamed through this application. Users are responsible for accessing content through their own
                    legitimate sources.
                </Typography>

                <Stack alignItems="center" spacing={4} py={6}>
                    <Typography variant="h5" maxWidth={{xs: 280, sm: 600, md: 800}} fontWeight={600}>
                        The Story Behind MSATracker
                    </Typography>

                    <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign={"justify"}>
                        MSATracker originated as a personal project inspired by a challenge I encountered in managing my
                        own
                        watchlist. I previously kept track of series I wanted to watch by saving screenshots, making
                        written
                        notes, and using various other methods. However, I wanted a more organized and efficient way to
                        manage my media.

                        The aim was to create a single platform for tracking movies, series, and anime. The name MSA is
                        derived from these three categories: Movies, Series, and Anime. What began as a personal
                        solution
                        eventually developed into MSATracker, an independently developed and maintained project.
                    </Typography>

                    <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign="justify">
                        Developers interested in connecting or discussing the project are
                        welcome to reach out through my{" "}
                        <MuiLink
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="secondary"
                            underline="hover"
                        >
                            LinkedIn
                        </MuiLink>
                        {" "}and{" "}
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

                <Stack alignItems="center" spacing={4}>
                    <Typography variant="h5" fontWeight={600}>
                        Credits & Attributions
                    </Typography>

                    <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}}>
                        MSATracker uses third-party resources and assets. We gratefully acknowledge their respective
                        creators and contributors.
                    </Typography>

                    <Stack spacing={3} maxWidth={{xs: 280, sm: 600, md: 800}}>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600} mb={1}>
                                Default Media Poster
                            </Typography>

                            <Typography variant="body1">
                                <MuiLink
                                    href="https://commons.wikimedia.org/wiki/File:No-Image-Placeholder.svg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="secondary"
                                    underline="hover"
                                >
                                    The default poster image
                                </MuiLink>
                                {" "} displayed when a media title does
                                not have an available poster was created by{" "}
                                <MuiLink
                                    href="https://commons.wikimedia.org/wiki/User:Ranjithsiji"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="secondary"
                                    underline="hover"
                                >
                                    Ranjithsiji
                                </MuiLink>
                                , based on{" "}
                                <MuiLink
                                    href="https://commons.wikimedia.org/wiki/File:Natural_landmark_without_photo.svg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    underline="hover"
                                >
                                    Natural landmark without photo.svg
                                </MuiLink>
                                {" "}by{" "}
                                <MuiLink
                                    href="https://commons.wikimedia.org/wiki/User:Hellerick"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="secondary"
                                    underline="hover"
                                >
                                    Hellerick
                                </MuiLink>
                                .
                            </Typography>

                            <Typography variant="body2" color="text.secondary" mt={1}>
                                Licensed under{" "}
                                <MuiLink
                                    href="https://creativecommons.org/licenses/by-sa/4.0/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="text.secondary"
                                    underline="hover"
                                >
                                    CC BY-SA 4.0
                                </MuiLink>
                                {" "} via Wikimedia Commons.
                            </Typography>
                        </Box>

                        <Divider/>

                        <Box>
                            <Typography variant="subtitle1" fontWeight={600} mb={1}>
                                Authentication Page Background
                            </Typography>

                            <Typography variant="body1" textAlign="justify">
                                <MuiLink
                                    href="https://unsplash.com/photos/curved-red-metal-panels-with-grooves-MgG-w0Dg_Ek"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="secondary"
                                    underline="hover"
                                >
                                    The photograph
                                </MuiLink>
                                {" "} displayed in the background of our authentication pages, including login, signup
                                and password reset, was taken bu {" "}
                                <MuiLink
                                    href="https://unsplash.com/@jdelacuesta"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="secondary"
                                    underline="hover"
                                >
                                    JC Dela Cuesta
                                </MuiLink>
                                .
                            </Typography>

                            <Typography variant="body2" color="text.secondary" mt={1}>
                                Licensed under the Unsplash License.
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>

            </Stack>

            <Divider/>

            <Stack
                direction={{xs: "column", md: "row"}}
                justifyContent={"center"}
                spacing={10}
                py={{xs: 10, md: 4}}
                px={{md: 10}}
                alignItems={"center"}
                bgcolor={"#0d253f"}>

                <MuiLink
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{display: "inline-flex"}}
                >
                    <Box
                        component="img"
                        src="/TMDBLogo.svg"
                        alt="The Movie Database (TMDB) logo"
                        width={{xs: 250, sm: 300}}
                    />
                </MuiLink>

                <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign={"justify"}>
                    MSATracker uses{" "}
                    <MuiLink href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer"
                             color="secondary"
                             underline="hover">TMDB (The Movie Database)</MuiLink>
                    {" "}API to provide movie
                    and TV series information, including titles, descriptions, posters, backdrops, genres, release
                    dates, and more. This website uses TMDB and the TMDB APIs but is not endorsed, certified, or
                    otherwise approved by TMDB.
                    Media information and images are provided by TMDB and remain the property of their respective
                    owners.
                </Typography>
            </Stack>

            <Divider/>

            <Stack alignItems="center" spacing={5} py={6}>
                <Typography variant="h5" fontWeight={600}>
                    Support the Project
                </Typography>

                <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign="justify">
                    If you find MSATracker useful and wish to support its
                    continued development, you can make a voluntary donation.
                    Contributions help fund future improvements and ongoing
                    maintenance of the application. Any support is greatly
                    appreciated.
                </Typography>

                <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                    <Button
                        component="a"
                        href={BUYMEACOFFEE_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        startIcon={<Box component="img" src="/buymeacoffee.svg" alt="buy me a coffee logo"
                                        sx={{width: 15}}/>}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 3,
                            borderColor: "divider",
                            "&:hover": {
                                bgcolor: "action.selected",
                            },
                        }}
                    >
                        Buy Me A Coffee
                    </Button>
                    <Button
                        component="a"
                        href={PAYPAL_DONATE_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        startIcon={<Box component="img" src="/paypalLogo.png" alt="paypal logo"
                                        sx={{width: 20}}/>}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 3,
                            borderColor: "divider",
                            "&:hover": {
                                bgcolor: "action.selected",
                            },
                        }}
                    >
                        Donate with PayPal
                    </Button>
                </Stack>
            </Stack>

            <Divider/>

            <Stack direction={{xs: "column", md: "row"}} justifyContent={"space-between"} px={20} alignItems={"center"}
                   bgcolor={"background.paper"}>
                <Box py={10}>
                    <Typography variant="h3" fontWeight={600} maxWidth={600}>
                        Ready to organize your {" "}
                        <Box component="span" color="secondary.main">
                            media?
                        </Box>
                    </Typography>
                    <Typography color="text.secondary" mt={2} alignItems={"center"}>
                        Start building your personal watchlist with
                        {" "}
                        <Box component="span" whiteSpace="nowrap">
                            msa
                            <Box component={"span"} color={"secondary.main"}>
                                tracker
                            </Box>
                        </Box>
                        .
                    </Typography>
                </Box>
                <Stack alignItems={"center"} spacing={2} pb={{xs: 10, md: 0}}>
                    <Button component={RouterLink} to="/signup" variant={"contained"} color="secondary"
                            endIcon={<ArrowRightAltOutlinedIcon/>} sx={{borderRadius: 2, whiteSpace: "nowrap",}}>
                        Create your account
                    </Button>
                    <Typography variant={"body2"} color={"textSecondary"}>
                        Have an account? {" "}
                        <MuiLink
                            component={RouterLink}
                            to={"/home"}
                            underline="none"
                            sx={{
                                color: "secondary.main",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            Log in
                        </MuiLink>
                    </Typography>
                </Stack>
            </Stack>
        </>
    )
}