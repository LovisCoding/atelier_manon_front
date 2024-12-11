import React from "react";
import { GlobalStyles } from "@mui/material";

export default function StylesMUI() {
    const styles = {
        ".overflowReactQuill .ql-editor": {
            overflow:"auto",
            maxHeight:"35rem"
        }
    };

    return (
            <GlobalStyles styles={styles} />

    );
}
