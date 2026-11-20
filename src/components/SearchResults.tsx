import {Box, Stack} from "@mui/material";
import {MediaCard} from "./media/MediaCard.tsx";
import {useMultiSearch} from "../hooks/UseTMDBs.ts";
import {useUserMediaStatuses} from "../hooks/UseUserMedia.ts";

interface SearchResultsProps {
    query: string;
}

export function SearchResults({query}: SearchResultsProps) {
    const {data} = useMultiSearch(query);

    const titles = data.results.filter(
        item => item.media_type === "movie" || item.media_type === "tv"
    );

    const {data: statuses = []} = useUserMediaStatuses(titles);

    const statusMap = new Map(
        statuses.map((item) => [
            `${item.media.media_type === "series" ? "tv" : item.media.media_type}-${item.media.tmdb_id}`,
            item.status,
        ])
    );

    return (
        <Stack direction="row" flexWrap="wrap" gap={3}>
            {titles.map(item => (
                // Parent owns the width, not MediaCard: react-virtuoso wraps items in a content-sized div,
                // so a width inside the card lets long titles stretch it. Same rule as GridItem.
                <Box key={`${item.media_type}-${item.id}`} sx={{width: {xs: "100%", sm: "35%", md: 300}, minWidth: 0}}>
                    <MediaCard media={item} userMediaStatus={statusMap.get(`${item.media_type}-${item.id}`)}/>
                </Box>
            ))}
        </Stack>
    );
}