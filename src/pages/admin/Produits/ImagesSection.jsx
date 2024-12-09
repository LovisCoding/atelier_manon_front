import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { addImage } from '../../../services/ProductService';

const ImagesSection = ({ images = [], setImages = () => {}, id }) => {
  const handleAddImage = (url) => {
    setImages([...images, url]);
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const base64Files = await Promise.all(
        Array.from(files).map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
          });
        })
    );

    try {
      // Example: Update the state and server with Base64 images
      setImages([...images, ...base64Files]);
      base64Files.forEach((url) => {
        addImage(id, url, 0);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <Box>
        <Typography variant="h6">Images</Typography>
        <Box
            sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: 2 }}
        >
          {images.map((src, index) => (
              <div
                  key={`image-${index}`}
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                  }}
              >
                <img
                    src={src}
                    alt={`image-${index}`}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 4,
                    }}
                />
                <IconButton
                    onClick={() => handleDeleteImage(index)}
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      background: 'white',
                      boxShadow: 1,
                    }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
          ))}
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Button component="label">
            <AddCircleOutlineIcon />
            <input type="file" hidden accept={'image/*'} onChange={(e) => handleUpload(e)} />
          </Button>
        </Box>
      </Box>
  );
};

export default ImagesSection;
