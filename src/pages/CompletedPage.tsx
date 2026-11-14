import {useUserMediaList, useUserMediaDetails} from "../hooks/UseUserMedia.ts";
import {Box} from "@mui/material";
import {PageHeader} from "../components/PageHeader.tsx";
import {MediaCollection} from "../components/media/MediaCollection.tsx";
import {type MouseEvent, useState} from "react";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

export function CompletedPage() {
    const {userMedia} = useUserMediaList("completed");
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
                overline="Already Watched"
                title="Your"
                titleSuffix="Collection."
                subtitle="Look how far you've come."
                trailingText={filteredMedia.length ? filteredMedia.length.toString() : ""}
                trailingIcon={CheckOutlinedIcon}
            />

            <MediaCollection
                media={mediaDetails}
                userMedia={userMedia}
                mediaTypeFilter={mediaTypeFilter}
                onFilterChange={handleChange}
                filteredMedia={filteredMedia}
                icon={CheckOutlinedIcon}
                emptyState={{
                    overline: "Nothing completed yet",
                    title: "You haven't watched anything so far.",
                    text: "Mark movies or series as completed to keep track of everything you've watched.",
                }}
            />
        </Box>
    );
}
