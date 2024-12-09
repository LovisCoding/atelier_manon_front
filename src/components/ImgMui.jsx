import { Box } from "@mui/material";

function ImgMui({ sx, alt, src }) {

    return (
        <Box
            component="img"
            sx={sx}
            alt={alt}
            src={src}
        />
    )

}

export default ImgMui;