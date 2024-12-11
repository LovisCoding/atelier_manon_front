import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Link, Grid2 } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../SidebarMenu';
import { getQuestionsAdmin } from "/src/services/FAQService";

const FoireAuxQuestions = () => {
  const navigate = useNavigate();
  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      const data = await getQuestionsAdmin();
      if (data) {
        setFaqList(data);
      }
    };
    fetchFaqs();
  }, []);

  const handleNewFaq = () => {

    const newFaq = {
      id: -1, 
      question: '', 
      answer: '' 
    };
    setFaqList([...faqList, newFaq]);
    navigate(`/admin/faq/${newFaq.id}`);
  };

  const handleRedirect = (id) => {
    navigate(`/admin/faq/${id}`);
  };

  return (
    <Box display="flex" sx={{ width: '100%' }}>
      <SidebarMenu />
      <Box sx={{ padding: 3, flexGrow: 1, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3, marginTop: "2rem" }}>
          <Typography variant="h4" sx={{ textAlign: 'center', width: '100%', }}>Foire aux questions</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
            <Button variant="contained" onClick={handleNewFaq} sx={{ fontWeight: 'bold' }}>Nouveau</Button>
          </Box>
        </Box>

        <Grid2 container spacing={2} sx={{ justifyContent: 'center', alignItems: 'flex-start', width: '100%', marginTop: 10 }}>
          <Grid2 item xs={12}>
            {faqList.map((faq) => (
              <React.Fragment key={faq.idQuestion}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2, paddingX: 2, width: '100%' }}>
                  <Link
                    onClick={() => handleRedirect(faq.idQuestion)}
                    sx={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', width: '38vw' }}
                  >
                    {faq.contenu}
                  </Link>
                  <Typography
                    variant="body1"
                    onClick={() => handleRedirect(faq.idQuestion)}
                    sx={{ cursor: 'pointer', width: '38vw' }}
                  >
                    {faq.reponse}
                  </Typography>
                </Box>
                <Box sx={{ borderBottom: '1px solid #ccc', marginBottom: 2 }} />
              </React.Fragment>
            ))}
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default FoireAuxQuestions;