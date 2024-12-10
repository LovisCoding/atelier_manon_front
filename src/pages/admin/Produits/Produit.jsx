import React, { useState } from 'react';
import { Typography, Box, IconButton, TextField, Switch, MenuItem, Select, Chip, Button, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SidebarMenu from '../SidebarMenu';
import { MdDelete } from "react-icons/md";
import { RiSave2Fill } from "react-icons/ri";

const Produit = () => {
	const [tags, setTags] = useState(['tag1', 'tag2', 'tag3']);
	const [separators, setSeparators] = useState(['separator1', 'separator2']);
	const [engraving, setEngraving] = useState(false);
	const [images, setImages] = useState([
		'https://placehold.co/100?text=1',
		'https://placehold.co/100?text=2',
		'https://placehold.co/100?text=3',
		'https://placehold.co/100?text=4',
	]);


	// Ajouter une image (simulée avec un placeholder)
	const handleAddImage = () => {
		setImages([...images, `https://placehold.co/100?text=${images.length + 1}`]);
	};

	// Supprimer une image
	const handleDeleteImage = (index) => {
		const newImages = [...images];
		newImages.splice(index, 1);
		setImages(newImages);
	};

	// Réorganiser les images
	const handleDragEnd = (result) => {
		if (!result.destination) return;
		const reorderedImages = [...images];
		const [removed] = reorderedImages.splice(result.source.index, 1);
		reorderedImages.splice(result.destination.index, 0, removed);
		setImages(reorderedImages);
	};

	// Ajouter un tag
	const handleAddTag = () => {
		setTags([...tags, `tag${tags.length + 1}`]);
	};

	// Supprimer un tag
	const handleDeleteTag = (tagToDelete) => {
		setTags(tags.filter((tag) => tag !== tagToDelete));
	};

	// Ajouter un séparateur
	const handleAddSeparator = () => {
		setSeparators([...separators, `separator${separators.length + 1}`]);
	};

	// Supprimer un séparateur
	const handleDeleteSeparator = (separatorToDelete) => {
		setSeparators(separators.filter((separator) => separator !== separatorToDelete));
	};

	return (
		<SidebarMenu>
			<Box  display={'flex'} width={'100%'} justifyContent={'center'}>
				<Stack maxWidth={'450px'} >
					{/* Product Name */}
					<Stack  >
						<Typography variant="h4" gutterBottom>
							Détail du produit
						</Typography>
						<Stack direction={'row'} spacing={4}>
						<Button variant="contained" color="info" startIcon={<RiSave2Fill />}>
								Enregistrer
							</Button>
							<Button variant="contained" color="error" startIcon={<MdDelete />}>
								Supprimer
							</Button>
						
						</Stack>
					</Stack>
					<TextField fullWidth label="Nom du produit" variant="outlined" sx={{ my: 2 }} />
					<TextField
						multiline
						fullWidth
						label="Description du produit"
						variant="outlined"
						sx={{ marginBottom: 2 }}
						rows={3}
					/>

					{/* Images Section */}
					<Typography variant="h6" gutterBottom>
						Images
					</Typography>
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable droppableId="images" direction="horizontal">
							{(provided) => (
								<Box
									ref={provided.innerRef}
									{...provided.droppableProps}
									sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
								>
									{images.map((src, index) => (
										<Draggable key={src} draggableId={src} index={index}>
											{(provided) => (
												<Box
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													sx={{ position: 'relative', display: 'inline-block' }}
												>
													<img
														src={src}
														alt={`product-${index}`}
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
												</Box>
											)}
										</Draggable>
									))}
									{provided.placeholder}
									<IconButton onClick={handleAddImage}>
										<AddCircleOutlineIcon />
									</IconButton>
								</Box>
							)}
						</Droppable>
					</DragDropContext>

					{/* Stones Section */}
					<Typography variant="h6" sx={{ marginTop: 4 }}>
						Pierres disponibles
					</Typography>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
						{tags.map((tag, index) => (
							<Chip
								key={index}
								label={tag}
								onDelete={() => handleDeleteTag(tag)}
								sx={{ marginBottom: 1 }}
							/>
						))}
						<IconButton onClick={handleAddTag}>
							<AddCircleOutlineIcon />
						</IconButton>
					</Box>

					{/* Separators Section */}
					<Typography variant="h6" sx={{ marginTop: 2 }}>
						Séparateurs disponibles
					</Typography>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
						{separators.map((separator, index) => (
							<Chip
								key={index}
								label={separator}
								onDelete={() => handleDeleteSeparator(separator)}
								sx={{ marginBottom: 1 }}
							/>
						))}
						<IconButton onClick={handleAddSeparator}>
							<AddCircleOutlineIcon />
						</IconButton>
					</Box>

					{/* Engraving Toggle */}
					<Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
						<Typography variant="h6" sx={{ marginRight: 2 }}>
							Gravure disponible
						</Typography>
						<Switch
							checked={engraving}
							onChange={() => setEngraving(!engraving)}
							inputProps={{ 'aria-label': 'Engraving Switch' }}
						/>
					</Box>

					{/* Product Category Dropdown */}
					<Typography variant="h6">Catégorie de produit</Typography>
					<Select fullWidth variant="outlined" defaultValue="" sx={{ marginBottom: 2 }}>
						<MenuItem value="">Sélectionner</MenuItem>
						<MenuItem value="category1">Category 1</MenuItem>
						<MenuItem value="category2">Category 2</MenuItem>
						<MenuItem value="category3">Category 3</MenuItem>
					</Select>
				</Stack>
			</Box>

		</SidebarMenu>
	);
};

export default Produit;