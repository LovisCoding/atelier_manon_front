import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { ChevronDown } from '../../components/icons/ChevronDown';

function FAQ() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '60%', margin: 'auto', padding: '20px' }}>
      <Typography marginBottom={8} variant="h2" align="center" gutterBottom>
        FAQ
      </Typography>
      <Typography sx={{fontSize: '2rem', marginBottom: '2rem'}} variant="body1" gutterBottom>
        Retrouvez les réponses à toutes vos questions !
      </Typography>
      <Stack>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ChevronDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Comment personnaliser mon bijou ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Vous pouvez personnaliser votre bijou directement depuis notre
              configurateur en ligne en choisissant les options disponibles.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ChevronDown />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Pourquoi tous les modèles portent-ils un nom ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Chaque modèle porte un nom unique pour refléter son inspiration et
              son histoire.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ChevronDown />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Comment prendre ses mesures ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Utilisez notre guide des tailles disponible sur notre site pour
              prendre vos mesures facilement.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  );
}

export default FAQ;
