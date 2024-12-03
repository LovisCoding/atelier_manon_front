import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Box, Typography, Grid, TextField } from '@mui/material';

const FoireAuxQuestions = () => {
  const [faqList, setFaqList] = useState([
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis', isEditing: false },
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis', isEditing: false },
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis', isEditing: false },
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis', isEditing: false },
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis', isEditing: false }
  ]);

  const handleNewFaq = () => {
    setFaqList([
      ...faqList,
      { question: 'Nouvelle question ?', answer: 'Nouvelle réponse', isEditing: false }
    ]);
  };

  const handleDelete = () => {
    setFaqList(faqList.filter(faq => !faq.isSelected));
  };

  const handleSelect = (index) => {
    const updatedFaqList = [...faqList];
    updatedFaqList[index].isSelected = !updatedFaqList[index].isSelected;
    setFaqList(updatedFaqList);
  };

  const handleEdit = (index) => {
    const updatedFaqList = [...faqList];

    updatedFaqList.forEach((faq, i) => {
      if (i !== index) {
        faq.isEditing = false;
      }
    });

    updatedFaqList[index].isEditing = !updatedFaqList[index].isEditing;
    setFaqList(updatedFaqList);
  };

  const handleChange = (index, field, value) => {
    const updatedFaqList = [...faqList];
    updatedFaqList[index][field] = value;
    setFaqList(updatedFaqList);
  };

  const handleBlur = (index) => {
    const updatedFaqList = [...faqList];
    updatedFaqList[index].isEditing = false;
    setFaqList(updatedFaqList);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', width: '100%' }}>Foire aux questions</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
          <Button variant="contained" onClick={handleNewFaq} sx={{ marginRight: 2, fontWeight: 'bold' }}>Nouveau</Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ fontWeight: 'bold' }}>Supprimer</Button>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Grid item xs={5}>
          <Typography variant="h6" align="center">Questions</Typography>
          {faqList.map((faq, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={faq.isSelected || false}
                    onChange={() => handleSelect(index)}
                  />
                }
                label={
                  faq.isEditing ? (
                    <TextField
                      variant="outlined"
                      value={faq.question}
                      onChange={(e) => handleChange(index, 'question', e.target.value)}
                      onBlur={() => handleBlur(index)}
                      fullWidth
                      multiline
                      rows={4}
                      sx={{ minHeight: 100, width: 300 }}
                    />
                  ) : (
                    <Typography variant="body1" onClick={() => handleEdit(index)} sx={{ cursor: 'pointer' }}>
                      {faq.question}
                    </Typography>
                  )
                }
              />
            </Box>
          ))}
        </Grid>

        <Grid item xs={5}>
          <Typography variant="h6" align="center">Réponses</Typography>
          {faqList.map((faq, index) => (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
              {faq.isEditing ? (
                <TextField
                  variant="outlined"
                  value={faq.answer}
                  onChange={(e) => handleChange(index, 'answer', e.target.value)}
                  onBlur={() => handleBlur(index)}
                  multiline
                  rows={4}
                  sx={{ minHeight: 100, width: 300 }}
                />
              ) : (
                <Typography variant="body1" onClick={() => handleEdit(index)} sx={{ cursor: 'pointer' }}>
                  {faq.answer}
                </Typography>
              )}
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FoireAuxQuestions;
