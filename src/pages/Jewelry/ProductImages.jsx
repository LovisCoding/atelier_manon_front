import { Box, Button, Grid2, Stack } from "@mui/material";
import { useState } from "react";

export default function ProductImages({ images }) {
  const [stateImages, setStateImages] = useState(images);

  const putToFirst = (index) => {
    const tmpImages = [...stateImages];
    [tmpImages[0], tmpImages[index]] = [tmpImages[index], tmpImages[0]];
    setStateImages(tmpImages);
  };

  const handleClick = (index) => {
    putToFirst(index);
  };

  return (
    <Stack>
      <Box>
        <Box
          component="img"
          src={stateImages[0]}
          alt="Image"
          sx={{
            objectFit: "contain",
            objectPosition: "top",
            width: "100%",
            height: "auto",
          }}
        ></Box>
      </Box>
      <Grid2 container spacing={2}>
        {stateImages.map((img, i) => {
          if (i === 0) return null;
          return (
            <Grid2
              item
              key={i}
              size={{
                xs: 2,
              }}
            >
              <Button onClick={() => handleClick(i)}>
                <Box
                  component="img"
                  src={img}
                  alt="Image"
                  sx={{
                    objectFit: "cover",
                    objectPosition: "center",
                    aspectRatio: "1/1",
                    width: "100%",
                    height: "auto",
                  }}
                ></Box>
              </Button>
            </Grid2>
          );
        })}
      </Grid2>
    </Stack>
  );
}
