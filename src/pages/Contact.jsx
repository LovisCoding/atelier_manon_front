
import { useTheme } from "@emotion/react";
import { Box, Card, Typography, TextField, TextareaAutosize, Button } from "@mui/material";

import { useState } from "react";

function Contact() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [subject, setSubject] = useState("");

    const theme = useTheme();

    const handleContact = () => {
        console.log('contact clicked');
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mb={5} >
            <Typography
                fontWeight="bold"
                variant="h5"
                color="customYellow"
                mt={2}
                mb={2}
            >Me Contacter</Typography>
            <Card sx={{ width: '30rem' }} >
                <Box padding={3} display="flex" flexDirection="column" gap={1} justifyContent="center" >

                    <Typography
                        variant="h6"
                    >Envoyer une demande</Typography>

                    <Box>
                        <ContactLabel textContent="Votre adresse email" required />
                        <TextField
                            margin="dense"
                            fullWidth
                            color="customYellow"
                            id="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Box>

                    <Box>
                        <ContactLabel textContent="Votre nom" />
                        <TextField
                            margin="dense"
                            fullWidth
                            color="customYellow"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Box>

                    <Box>
                        <ContactLabel textContent="Objet" required />
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            color="customYellow"
                            id="subject"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                        />

                    </Box>


                    <Box>
                        <ContactLabel textContent="Description" required />
                        <TextareaAutosize
                            multiline
                            required
                            minRows={4}
                            style={{
                                width: "100%",
                                padding: "8px",
                                fontSize: "16px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                resize: " none",
                                outlineColor: theme.palette.customYellow.main,
                                fontWeight: 'normal'
                            }}
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                    </Box>

                    <Button
                        variant="yellowButton"
                        onClick={e => handleContact()}
                        sx={{width:'fit-content', alignSelf:'end'}}
                    >Envoyer</Button>

                </Box>
            </Card>
        </Box>
    )
}


const ContactLabel = ({ textContent, required }) => {
    return (
        <Typography fontWeight="bold" >
            {textContent} {required && <span style={{ color: 'red' }}>*</span>}
        </Typography>
    )
}


export default Contact;
