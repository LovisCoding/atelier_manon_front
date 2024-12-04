import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Box, Typography, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../SidebarMenu';

const FoireAuxQuestions = () => {
  const navigate = useNavigate();
  const [faqList, setFaqList] = useState([
    { id: 1, question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis', isSelected: false },
    { id: 2, question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis', isSelected: false },
    { id: 3, question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis', isSelected: false },
    { id: 4, question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis', isSelected: false },
    { id: 5, question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis', isSelected: false }
  ]);

  const handleNewFaq = () => {
    const newFaq = {
      id: faqList.length + 1, 
      question: '', 
      answer: '', 
      isSelected: false 
    };

    setFaqList([...faqList, newFaq]);

    navigate(`/admin/faq/${newFaq.id}`);
  };

  const handleDelete = () => {
    setFaqList(faqList.filter(faq => !faq.isSelected));
  };

  const handleSelect = (index) => {
    const updatedFaqList = [...faqList];
    updatedFaqList[index].isSelected = !updatedFaqList[index].isSelected;
    setFaqList(updatedFaqList);
  };

  const handleRedirect = (id) => {
    navigate(`/admin/faq/${id}`);
  };

  return (
    <Box display="flex">
      <SidebarMenu />
      <Box sx={{ padding: 3, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', width: '100%' }}>Foire aux questions</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
            <Button variant="contained" onClick={handleNewFaq} sx={{ fontWeight: 'bold' }}>Nouveau</Button>
          </Box>
        </Box>

        <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center" marginBottom="5rem">Questions et Réponses</Typography>
            {faqList.map((faq, index) => (
              <React.Fragment key={faq.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2, paddingX: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={faq.isSelected || false}
                        onChange={() => handleSelect(index)}
                      />
                    }
                    label={
                      <Link
                        onClick={() => handleRedirect(faq.id)}
                        sx={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                      >
                        {faq.question}
                      </Link>
                    }
                  />
                  <Typography
                    variant="body1"
                    onClick={() => handleRedirect(faq.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {faq.answer}
                  </Typography>
                </Box>
                <Box sx={{ borderBottom: '1px solid #ccc', marginBottom: 2 }} />
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FoireAuxQuestions;