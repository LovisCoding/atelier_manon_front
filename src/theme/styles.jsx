import React from "react";
import { GlobalStyles } from "@mui/material";

export default function StylesMUI() {
    const styles = {
        ".caca": {
            color: "red",
            backgroundColor: "blue",
        },
    };

    return (
            <GlobalStyles styles={styles} />

    );
}
