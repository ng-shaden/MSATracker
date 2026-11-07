import {forwardRef, type ReactElement, type Ref} from "react";
import type {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

export const SlideUp = forwardRef(function SlideUp(
    props: TransitionProps & { children: ReactElement },
    ref: Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
