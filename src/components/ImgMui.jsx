import { Box } from "@mui/material";

export default function ImgMui({sx, alt, src}) {

return (
	<Box
  component="img"
  sx={sx}
  alt={alt}
  src={src}
/>
)

}