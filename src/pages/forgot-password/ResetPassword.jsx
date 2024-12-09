import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, Box, Typography, Container, useTheme, Alert, Snackbar } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { resetPassword, validateToken } from "../../services/ConnectionService";

import VisibilityOn from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function ForgotPassword() {

    const {token} = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSamePassword, setIsSamePassword] = useState(true);

    const theme = useTheme();

    useEffect(() => {
        if (!token) navigate('/');
        // check token
        const exec = async () => {
            const response = await validateToken(token);
            if (response.status == 400) { navigate('/'); return; }
        };
        exec();
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!password || !confirmPassword) {
            setErrorMessage("Veuillez renseigner votre mot de passe.");
            setIsErrorDisplayed(true);
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Veuillez rentrer 2 mots de passe identiques.");
            setIsErrorDisplayed(true);
            return;
        }
        const exec = async () => {
            const data = await resetPassword(token, password);
            if (!data) return;
            if (data.status === 404) {
                setErrorMessage("L'adresse renseignée n'est associée à aucun compte.");
                setIsErrorDisplayed(true);
                return;
            }
            changeRoute('/email-sent');
        }
        exec();
    };

    const changeRoute = (route) => {
        navigate(route);
    };

    const handleClose = () => setIsErrorDisplayed(false);

    const fieldStyle = {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: theme.palette.customYellow.main,
            },
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: theme.palette.customYellow.main, // Couleur quand focus
        }
    }

    const placeholderStyle = {
        "& input::placeholder": {
            color: "blue", // Couleur du placeholder
            fontWeight: "bold", // Style supplémentaire
        }
    }

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
                <Snackbar
                    open={isErrorDisplayed}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
                <Typography color="customYellow" fontWeight="700" component="h1" variant="h5" >
                    Réinitialisation de mot de passe
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, width: '100%' }}
                >
                    <FormControl margin="normal" fullWidth variant="outlined" >
                        <InputLabel color="black" htmlFor="password">Mot de passe *</InputLabel>
                        <OutlinedInput
                            required
                            id="password"
                            label="Mot de passe"
                            autoComplete="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!isSamePassword}
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
                    <FormControl margin="normal" fullWidth variant="outlined" >
                        <InputLabel color="black" htmlFor="password">Mot de passe *</InputLabel>
                        <OutlinedInput
                            required
                            id="password"
                            label="Mot de passe"
                            autoComplete="password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!isSamePassword}
                            sx={placeholderStyle}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={e => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOn /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="yellowButton"
                        sx={{ mt: 3, mb: 2 }}
                    >Réinitialiser</Button>
                    <Typography onClick={e => changeRoute('/login')} sx={{ justifySelf: 'center', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer' }} >
                        Annuler</Typography>
                </Box>
            </Box>
        </Container>

    );

}


export default ForgotPassword;