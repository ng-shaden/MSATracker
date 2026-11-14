import {useUserMediaDetails, useUserMediaList} from "../hooks/UseUserMedia.ts";
import {Box} from "@mui/material";
import {PageHeader} from "../components/PageHeader.tsx";
import {MediaCollection} from "../components/media/MediaCollection.tsx";
import {type MouseEvent, useState} from "react";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";

export function WatchingPage() {
    const {userMedia} = useUserMediaList("currently_watching");
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
                overline={"Midway Through"}
                title={"Currently"}
                titleSuffix={"Watching."}
                subtitle={"All the movies and series you're watching."}
                trailingText={filteredMedia.length ? filteredMedia.length.toString() : ""}
                trailingIcon={OndemandVideoOutlinedIcon}
            />

            <MediaCollection
                media={mediaDetails}
                userMedia={userMedia}
                mediaTypeFilter={mediaTypeFilter}
                onFilterChange={handleChange}
                filteredMedia={filteredMedia}
                icon={OndemandVideoOutlinedIcon}
                emptyState={{
                    overline: "Nothing in progress",
                    title: "You're not watching anything",
                    text: "Add movies or series to keep track of what you're currently watching.",
                }}
            />
        </Box>
    )
}