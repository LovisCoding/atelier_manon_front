import React, { useEffect, useState } from "react";
import { TextField, InputLabel, InputAdornment, IconButton, Button, Box, Typography, Container, OutlinedInput } from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


// email, mdp, nomCli, prenomCli, adresse

function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");

    const [isSamePassword, setIsSamePassword] = useState(password !== confirmPassword);

    // user address
    const [addressNumber, setAddressNumber] = useState(""); // string : can be "1 bis"
    const [addressStreet, setAddressStreet] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressPostalCode, setAddressPostalCode] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const changeRoute = (route) => {
        window.location = route;
    }


    useEffect(() => {
        setIsSamePassword(password !== confirmPassword);
    }, [confirmPassword])

    return (
        <>
            <Container maxWidth="sm" >
                <Box
                    sx={{
                        mt: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography color="customYellow" fontWeight="700" component="h1" variant="h5" >
                        Inscription
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
                            autoComplete="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            error={!isSamePassword}
                            endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                        >
                                            <VisibilityOff/>
                                        </IconButton>
                                    </InputAdornment>
                            }
                        />
                        <OutlinedInput
                            fullWidth
                            id="password"
                            label="Mot de passe"
                            placeholder="Mot de passe"
                            autoComplete="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        <VisibilityOff/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirmation du mot de passe"
                            type="password"
                            id="confirmPassword"
                            autoComplete="confirmPassword"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            error={!isSamePassword}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="firstname"
                            label="Prénom"
                            type="text"
                            id="firstname"
                            autoComplete="firstname"
                            value={firstname}
                            onChange={e => setFirstname(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="lastname"
                            label="Nom"
                            type="text"
                            id="lastname"
                            autoComplete="lastname"
                            value={lastname}
                            onChange={e => setLastname(e.target.value)}
                        />
                        <Box display="flex" gap="1rem" >
                            <TextField
                                aria-colspan={2}
                                sx={{ flex: '0 0 5rem' }}
                                margin="normal"
                                name="addressNumber"
                                label="N°"
                                type="text"
                                id="addressNumber"
                                autoComplete="addressNumber"
                                value={addressNumber}
                                onChange={e => setAddressNumber(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="address"
                                label="Rue / Voie / Lieu-Dit"
                                type="text"
                                id="addressStreet"
                                autoComplete="addressStreet"
                                value={addressStreet}
                                onChange={e => setAddressStreet(e.target.value)}
                            />

                        </Box>
                        <Box display="flex" gap="1rem" >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="addressCity"
                                label="Ville"
                                type="text"
                                id="addressCity"
                                autoComplete="addressCity"
                                value={addressCity}
                                onChange={e => setAddressCity(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                sx={{ flex: '0 0 8rem' }}
                                name="addressPostalCode"
                                label="Code Postal"
                                type="number"
                                id="addressPostalCode"
                                autoComplete="addressPostalCode"
                                value={addressPostalCode}
                                onChange={e => setAddressPostalCode(e.target.value)}
                            />
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="yellowButton"
                            sx={{ mt: 2, mb: 2 }}
                        >S'inscrire</Button>
                        <Box display="flex" gap={1} justifySelf='center' >
                            <Typography sx={{ fontSize: '12px' }} >Vous avez déjà un compte ?</Typography>
                            <Typography sx={{ textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }} onClick={e => changeRoute('/connection')} >Se connecter</Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default Register;