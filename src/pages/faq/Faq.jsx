import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { ChevronDown } from "../../components/icons/ChevronDown";
import { getQuestions } from "../../services/FAQService";

function FAQ() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const exec = async () => {
      const data = await getQuestions();
      if (!data) return;
      setItems(data);
      console.log("data:",data)
    };
    exec();
  }, []);

    return (
        <Box sx={{ width: "60%", margin: "auto", padding: "20px" }}>
        <Typography marginBottom={8} variant="h2" align="center" gutterBottom>
            FAQ
        </Typography>
        <Typography
            sx={{ fontSize: "2rem", marginBottom: "2rem" }}
            variant="body1"
            gutterBottom
        >
            Retrouvez les réponses à toutes vos questions !
        </Typography>
        <Stack>
            {items && items.length >= 1 && items.map((item, index) =>
                <FAQItem item={item} key={index} />
            )}
        </Stack>
    </Box>
  );
}

const FAQItem = ({ item, key }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Accordion expanded={expanded} onChange={handleChange("panel")}>
        <AccordionSummary
            expandIcon={<ChevronDown />}
            aria-controls={`panel${key}a-content`}
            id={`panel${key}a-header`}
        >
            <Typography>{item.contenu}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
            {item.reponse}
            </Typography>
        </AccordionDetails>
        </Accordion>
    );
};

export default FAQ;
    