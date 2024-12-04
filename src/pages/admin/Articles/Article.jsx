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

export default function Article() {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSave = () => {
        alert(`Article sauvegardé:\nID: ${id}\nTitre: ${title}\nDescription: ${description}\nDate: ${date}`);
    };

    return (
        <Box display="flex">
            <SidebarMenu />
            <Stack spacing={3} mt={5} width="100%" mx={15}>
                <Typography variant="h4">Détail de l'Article</Typography>

                <TextField
                    label="Titre de l'article"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                    label="Description de l'article"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <TextField
                    label="Date de publication"
                    variant="outlined"
                    fullWidth
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <Button variant="contained" color="primary" onClick={handleSave}>
                    Enregistrer
                </Button>
            </Stack>
        </Box>
    );
}