import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, useTheme, Snackbar, Alert, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../utils/AuthContext";
import VisibilityOn from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Connection() {

    const {login} = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setErrorMessage("Veuillez renseigner un email et un mot de passe.");
            setIsErrorDisplayed(true);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Veuillez entrer une adresse email correcte.");
            setIsErrorDisplayed(true);
            setEmail("");
            setPassword("");
            return;
        }
        const exec = async () => {
            const response = await login(email, password);
            if (!response) {
                setErrorMessage("Mot de passe ou email incorrect.");
                setIsErrorDisplayed(true);
                setEmail("");
                setPassword("");
                return;
            }
            navigate('/');
        }
        exec();
    };

    const changeRoute = (route) => {
        navigate(route);
    }

    const fieldStyle = {
        "& .MuiOutlinedInput-root": {
            color: theme.palette.text.main, // Couleur par défaut
            
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: theme.palette.customYellow.main, // Couleur quand focus
        }
    }

    const placeholderStyle = {
        "& input::placeholder": {
            color: "blue",
            fontWeight: "bold",
        }
    }

    return (

        <Container maxWidth="xs" >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Snackbar
                    open={isErrorDisplayed}
                    autoHideDuration={3000}
                    onClose={()=>setIsErrorDisplayed(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert onClose={()=>setIsErrorDisplayed(false)} severity="error" sx={{ width: "100%" }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
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
                        sx={fieldStyle}
                    />
                    <FormControl margin="normal" fullWidth variant="outlined" >
                        <InputLabel color="black" htmlFor="password">Mot de passe *</InputLabel>
                        <OutlinedInput
                            required
                            id="password"
                            label="Mot de passe"
                            autoComplete="current-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={placeholderStyle}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={e => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOn /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Typography onClick={e => changeRoute('/forgot-password')} sx={{ justifySelf: 'end', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer' }} >Mot de passe oublié ?</Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="yellowButton"
                        sx={{ mt: 3, mb: 2 }}
                    >Se connecter</Button>
                    <Box display="flex" gap={1} Self='center' >
                        <Typography sx={{ fontSize: '12px' }} >Pas encore inscrit ?</Typography>
                        <Typography sx={{ textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }} onClick={e => changeRoute('/register')} >Inscrivez-vous</Typography>
                    </Box>
                </Box>
            </Box>
        </Container>

    );
}

export default Connection;
