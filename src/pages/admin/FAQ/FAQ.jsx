import { useParams } from "react-router";
import SidebarMenu from "../SidebarMenu";
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { useState } from "react";

export default function FAQDetails() {
    const { id } = useParams();

    const [faq, setFaq] = useState({
        question: '',
        answer: ''
    });

    const handleChange = (field, value) => {
        setFaq((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        alert(`FAQ sauvegardée:\nID: ${id}\nQuestion: ${faq.question}\nRéponse: ${faq.answer}`);
    };

    return (
        <Box display="flex">
            <SidebarMenu />
            <Stack spacing={3} mt={5} width="100%" mx={15}>
                <Typography variant="h4">{id === "-1" ? "Nouvelle FAQ" : "Détail de la FAQ"}</Typography>

                <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    value={faq.question}
                    onChange={(e) => handleChange('question', e.target.value)}
                    inputProps={{ style: { color: 'black' } }}
                />

                <TextField
                    label="Réponse"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={faq.answer}
                    onChange={(e) => handleChange('answer', e.target.value)}
                    inputProps={{ style: { color: 'black' } }}
                />

                <Button variant="contained" color="primary" onClick={handleSave}>
                    Enregistrer
                </Button>
            </Stack>
        </Box>
    );
}