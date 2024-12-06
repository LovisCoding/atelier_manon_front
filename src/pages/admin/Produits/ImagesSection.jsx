import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateProduct } from '../../../services/ProductService';

const ImagesSection = ({ images = [], setImages = () => { } }) => {
  const handleAddImage = (url) => {
    setImages([...images, url]);
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...images];
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setImages(reordered);
  };

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      updateProduct({tabPhotos: files});
  }
  catch (error) {
	console.error(error);
  }
  }
  return (
    <Box>
      <Typography variant="h6">Images</Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="images" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
            >
              {images.map((src, index) => (
                <Draggable key={`${src}-${index}`} draggableId={`${src}-${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ position: 'relative', display: 'inline-block' }}
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Box sx={{ marginTop: 2 }}>
          <Button component="label">
            <AddCircleOutlineIcon />
            <input
              type="file"
              hidden
              onChange={(e) => handleUpload(e)}
            />
          </Button>
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default ImagesSection;
