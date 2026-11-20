import {Box, Fade, Stack, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {type ElementType, forwardRef, type HTMLProps, type MouseEvent, useMemo} from "react";
import type {TMDBMedia} from "../../model/TMDBMedia.ts";
import type {UserMediaItem, UserMediaStatus} from "../../model/UserMedia.ts";
import {MediaCard} from "./MediaCard.tsx";
import {UserMediaListEmptyState} from "../UserMediaListEmptyState.tsx";
import {VirtuosoGrid} from "react-virtuoso";

interface EmptyStateContent {
    overline: string;
    title: string;
    text: string;
}

interface MediaCollectionProps {
    media: TMDBMedia[];
    userMedia: UserMediaItem[];
    mediaTypeFilter: string;
    filteredMedia: TMDBMedia[]
    onFilterChange: (event: MouseEvent<HTMLElement>, value: string | null) => void;
    icon: ElementType;
    emptyState: EmptyStateContent;
}

const GridList = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
    ({style, children, ...props}, ref) => (
        <Box ref={ref}{...props} style={style} sx={{display: "flex", flexWrap: "wrap", gap: 3}}>
            {children}
        </Box>
    )
);

// Virtuoso wraps each item in its own div, so the width must be set here (not inside the card)
// or a long noWrap title can stretch the wrapper and make that card bigger than the rest.
const GridItem = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
    ({children, ...props}, ref) => (
        <Box ref={ref}{...props} sx={{width: {xs: "100%", sm: "35%", md: 300}, minWidth: 0}}>
            {children}
        </Box>
    )
);

export function MediaCollection({
                                    media,
                                    userMedia,
                                    mediaTypeFilter,
                                    onFilterChange,
                                    filteredMedia,
                                    icon: Icon,
                                    emptyState
                                }: MediaCollectionProps) {

    const statusByKey = useMemo(() => {
        const map = new Map<string, UserMediaStatus>();
        media.forEach((m, i) => {
            const status = userMedia[i]?.userMedia.status;
            if (status) map.set(`${m.media_type}-${m.id}`, status);
        });
        return map;
    }, [media, userMedia]);

    return (
        <Stack mt={10} gap={3} sx={{flex: 1}}>
            <Box
                sx={{
                    position: "relative",
                    width: {xs: "100%", sm: 300},
                    p: 0.5,
                    gap: 0.5,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 4,
                        bottom: 4,
                        left: 4,
                        width: "calc((100% - 16px) / 3)",
                        bgcolor: "#211819",
                        border: "1px solid",
                        borderColor: "secondary.dark",
                        borderRadius: 2,
                        pointerEvents: "none",
                        transition: "transform 300ms ease",
                        transform: `translateX(${
                            mediaTypeFilter === "all"
                                ? "0"
                                : mediaTypeFilter === "movie"
                                    ? "calc(100% + 4px)"
                                    : "calc(200% + 8px)"
                        })`,
                    }}
                />

                <ToggleButtonGroup
                    value={mediaTypeFilter}
                    exclusive
                    onChange={onFilterChange}
                    aria-label="Media type filter"
                    fullWidth
                    sx={{
                        position: "relative",

                        "& .MuiToggleButtonGroup-grouped": {
                            border: 0,
                            borderRadius: 2,
                            flex: 1,
                            width: "100%",
                            color: "text.secondary",
                            fontSize: "0.8rem",
                            textTransform: "none",
                            transition: "background-color 500ms ease, color 500ms ease, border-color 1000ms ease",

                            "&.Mui-selected": {
                                bgcolor: "transparent",
                                color: "secondary.main",
                            },
                        },
                    }}
                >
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="movie">Movies</ToggleButton>
                    <ToggleButton value="series">Series</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {userMedia.length === 0 ? (
                <UserMediaListEmptyState icon={Icon} {...emptyState}/>
            ) : (
                <Fade key={mediaTypeFilter} in timeout={500}>
                    <Box>
                        <VirtuosoGrid
                            useWindowScroll
                            data={filteredMedia}
                            overscan={600}
                            components={{List: GridList, Item: GridItem}}
                            computeItemKey={(_, item) => `${item.media_type}-${item.id}`}
                            initialItemCount={Math.min(filteredMedia.length, 5)}
                            itemContent={(_, item) => (
                                <MediaCard
                                    media={item}
                                    userMediaStatus={statusByKey.get(`${item.media_type}-${item.id}`)}
                                />
                            )}
                        />
                    </Box>
                </Fade>
            )}
        </Stack>
    );
}
