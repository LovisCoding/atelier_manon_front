import { Container, Stack, Typography } from "@mui/material";

import { styled } from '@mui/system';
import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';

import { getEvenement } from "../../services/HomeService";

function LegalMentions() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const exec = async () => {
      const response = await getEvenement('mentionsLegales');
      setMessage(response);
    }
    exec();
    setLoading(false);
  }, [])


  const StyledDiv = styled('div')(({ theme }) => ({
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      ...theme.typography.h5, // Utilise les styles de Typography variant="h5"
      marginBottom: theme.spacing(1),
    },
    '& p, & span': {
      ...theme.typography.body1, // Utilise les styles de Typography variant="body1"
      marginBottom: theme.spacing(1),
    },
    '& a': {
      ...theme.typography.body1, // Utilise les styles de Typography pour les liens
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
    '& ul, & ol': {
      ...theme.typography.body1,
      paddingLeft: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
    '& li': {
      marginBottom: theme.spacing(1),
    },
  }));

  return (
    <Container maxWidth={"md"} sx={{ py: 4 }}>
      <Typography variant={"h1"} textAlign={"center"} sx={{ fontSize: "4rem" }}>
        Mentions Légales
      </Typography>
        <StyledDiv
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(message),
          }}
        />
    </Container>
  );
}

export default LegalMentions;
