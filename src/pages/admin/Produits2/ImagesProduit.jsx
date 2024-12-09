import { Button, IconButton, Stack, Typography } from "@mui/material";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

export default function ImagesProduit({ imgs }) {
  const btnUploadRef = useRef(null);

  const handleClick = () => {
    if (btnUploadRef.current) {
      btnUploadRef.current.click();
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={4} alignItems="center">
        <Typography variant="h4">Images</Typography>
        <Uploady destination={{ url: "/imgUpload/" }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FaPlus />}
            onClick={handleClick}
          >
            Add Images
          </Button>
		  <Stack sx={{visibility: 'hidden'}}>
		  <UploadButton ref={btnUploadRef} />
		  </Stack>
          
        </Uploady>
      </Stack>
      {/* Render Images */}
      <Stack direction="row" spacing={2}>
        {imgs &&
          imgs.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Uploaded preview ${index}`}
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
          ))}
      </Stack>
    </Stack>
  );
}