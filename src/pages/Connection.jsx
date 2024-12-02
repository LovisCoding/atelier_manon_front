import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

function Connection() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, ":", password);
    };

    const changeRoute = (route) => {
        window.location = route;
    }

    return (
        <>
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
                        Connexion
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Typography sx={{ justifySelf: 'end', fontSize: '12px', textDecoration: 'underline', cursor:'pointer' }} >Mot de passe oublié ?</Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="yellowButton"
                            sx={{ mt: 3, mb: 2 }}
                        >Se connecter</Button>
                        <Box display="flex" gap={1} Self='center' >
                            <Typography sx={{fontSize:'12px'}} >Pas encore inscrit ?</Typography>
                            <Typography sx={{ textDecoration: 'underline', fontSize:'12px', cursor:'pointer' }} onClick={e=>changeRoute('/register')} >Inscrivez-vous</Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Connection;