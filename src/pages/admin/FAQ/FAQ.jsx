import React, { useState } from 'react';
import { Box, Typography, Paper, Stack, TextField, Button } from '@mui/material';
import SidebarMenu from '../SidebarMenu';
import { useParams } from 'react-router-dom';

const FAQDetails = () => {
  const { id } = useParams();

  const faqList = [
    { id: 1, question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis' },
    { id: 2, question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis' },
    { id: 3, question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis' },
    { id: 4, question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis' },
    { id: 5, question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis' }
  ];

  // Recherche de la FAQ par ID, si non trouvée initialise avec des valeurs vides
  const faq = faqList.find((item) => item.id === parseInt(id));
  const initialFAQ = faq || { question: '', answer: '' };

  const [editedFAQ, setEditedFAQ] = useState({ ...initialFAQ });

  const handleChange = (field, value) => {
    setEditedFAQ(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic (e.g., API call to save the edited FAQ)
    console.log("Saved:", editedFAQ);
  };

  const handleDelete = () => {
    // Handle delete logic (e.g., API call to delete the FAQ)
    console.log("Deleted FAQ with id:", editedFAQ.id);
  };

  return (
    <Box display="flex">
      <SidebarMenu />
      <Box sx={{ padding: 5, flexGrow: 1 }}>
        <Paper elevation={3} sx={{ padding: 5, position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ fontWeight: 'bold', marginRight: 1 }}>Enregistrer</Button>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ fontWeight: 'bold' }}>Supprimer</Button>
          </Box>

          <Stack spacing={3}>
            <Typography variant="h6" color="textSecondary">
              Question :
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={editedFAQ.question}
              onChange={(e) => handleChange('question', e.target.value)}
            />
            <Typography variant="h6" color="textSecondary">
              Réponse :
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={editedFAQ.answer}
              onChange={(e) => handleChange('answer', e.target.value)}
            />
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default FAQDetails;