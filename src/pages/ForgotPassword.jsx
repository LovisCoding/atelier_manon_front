import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, ":", password);
    };

    const changeRoute = (route) => {
        window.location = route;
    };

    return (

        <Container maxWidth="xs" >
            <Box
                sx={{
                    mt: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography color="customYellow" fontWeight="700" component="h1" variant="h5" >
                    Réinitialisation de mot de passe
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, width: '100%' }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse e-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Box display="flex" gap={1} justifySelf='end' >
                        <Typography sx={{ fontSize: '12px' }} >Pas encore inscrit ?</Typography>
                        <Typography onClick={e => changeRoute('/register')} sx={{ textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }} >
                            Inscrivez-vous</Typography>
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="yellowButton"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={e=>changeRoute('/email-sent')}
                    >Valider</Button>
                    <Typography onClick={e => changeRoute('/login')} sx={{ justifySelf: 'center', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer' }} >
                        Annuler</Typography>
                </Box>
            </Box>
        </Container>

    );

}


export default ForgotPassword;
