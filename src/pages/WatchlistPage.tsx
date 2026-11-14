import {PageHeader} from "../components/PageHeader.tsx";
import {Box} from "@mui/material";
import {useUserMediaList, useUserMediaDetails} from "../hooks/UseUserMedia.ts";
import {MediaCollection} from "../components/media/MediaCollection.tsx";
import {useState} from "react";
import {type MouseEvent} from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

export function WatchlistPage() {
    const {userMedia} = useUserMediaList("watchlist");
    const {mediaDetails} = useUserMediaDetails(userMedia);
    const [mediaTypeFilter, setMediaTypeFilter] = useState("all");

    const filteredMedia = mediaTypeFilter === "all" ? mediaDetails
        : mediaDetails.filter((item) => mediaTypeFilter === "movie" ? item.media_type === "movie" : item.media_type === "tv");

    const handleChange = (
        _event: MouseEvent<HTMLElement>,
        newFilter: string | null
    ) => {
        if (newFilter !== null) {
            setMediaTypeFilter(newFilter);
        }
    };

    return (
        <Box my={{xs: 10}} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 8}}
             minHeight={"calc(100vh - 240px)"}
             display={"flex"}
             flexDirection={"column"}
        >
            <PageHeader
                overline={"Saved for later"}
                title={"Your"}
                titleSuffix={"Watchlist."}
                subtitle={"Pick what to watch next."}
                trailingText={filteredMedia.length ? filteredMedia.length.toString() : ""}
                trailingIcon={BookmarkBorderOutlinedIcon}
            />

            <MediaCollection
                media={mediaDetails}
                userMedia={userMedia} mediaTypeFilter={mediaTypeFilter}
                onFilterChange={handleChange}
                filteredMedia={filteredMedia}
                icon={BookmarkBorderOutlinedIcon}
                emptyState={{
                    overline: "Nothing saved yet",
                    title: "Your watchlist is empty",
                    text: "Save movies or series you want to come back to later.",
                }}
            />
        </Box>
    )
}