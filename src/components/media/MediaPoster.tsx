import {Box, Chip} from "@mui/material";
import {IMAGE_BASE_URL} from "../../services/tmdbServices.ts";
import type {MovieDetails, TVSeriesDetails} from "@lorenzopant/tmdb";
import {useUserMediaStatuses} from "../../hooks/UseUserMedia.ts";
import {MediaStatusMenu} from "./MediaStatusMenu.tsx";
import {NO_POSTER_URL} from "../../utils/utils.ts";
import {usePersonalPreferences} from "../../hooks/UsePersonalPreferences.ts";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";

interface MediaPosterProps {
    media: MovieDetails | TVSeriesDetails
    isMovie: boolean
}

export function MediaPoster({media, isMovie}: MediaPosterProps) {
    const poster = media.poster_path ? `${IMAGE_BASE_URL}${media.poster_path}` : NO_POSTER_URL;
    const title = isMovie ? (media as MovieDetails).title : (media as TVSeriesDetails).name;

    const tmdbMedia = [{
        id: media.id,
        media_type: isMovie ? "movie" as const : "tv" as const,
    }];
    const {data} = useUserMediaStatuses(tmdbMedia);
    const userMediaStatus = data.find(item => Number(item.media.tmdb_id) === media.id && item.media.media_type === (isMovie ? "movie" : "series"))?.status;
    const {personalPreferences} = usePersonalPreferences();


    return (
        <Box position={"relative"} width={{xs: "100%", sm: "35%", md: 300}} flexShrink={0} alignSelf={"start"}>
            <Box component={"img"} src={poster} alt={title + "poster"} width={"100%"} display={"block"} height={"auto"}
                 sx={{borderRadius: 3}}/>

            <Chip
                icon={!personalPreferences.showExtraLabels ? (isMovie ? <MovieOutlinedIcon/> :
                    <LiveTvOutlinedIcon/>) : undefined}
                label={personalPreferences.showExtraLabels ? (isMovie ? "Movie" : "Series") : undefined}
                size="small"
                sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    ...(!personalPreferences.showExtraLabels && {
                        "& .MuiChip-label": {
                            display: "none",
                        },
                        "& .MuiChip-icon": {
                            margin: 0,
                        },
                        width: 32,
                    }),
                }}
            />

            <MediaStatusMenu
                tmdbId={media.id}
                mediaType={isMovie ? "movie" : "tv"}
                status={userMediaStatus}
                sx={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                }}
                fontSize={30}
            />
        </Box>
    )
}