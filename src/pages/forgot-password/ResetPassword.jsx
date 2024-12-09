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

    const [isFinished, setIsFinished] = useState(false);

    const theme = useTheme();

    useEffect(() => {
        // check token validity
        if (!token) navigate('/');
        const exec = async () => {
            const response = await validateToken(token);
            if (response.status == 400) { navigate('/'); return; }
        };
        exec();
    }, [])

    useEffect(() => {
        if (password === confirmPassword) setIsSamePassword(true);
    }, [password, confirmPassword])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!password || !confirmPassword) {
            setErrorMessage("Veuillez renseigner votre mot de passe.");
            setIsErrorDisplayed(true);
            setIsSamePassword(false);
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Veuillez rentrer 2 mots de passe identiques.");
            setIsErrorDisplayed(true);
            setIsSamePassword(false);
            return;
        }
        if (password.length < 8) {
            setErrorMessage("Votre mot de passe doit faire 8 caractères minimum.");
            setIsErrorDisplayed(true);
            setIsSamePassword(false);
            return;
        }
        const exec = async () => {
            const data = await resetPassword(token, password, confirmPassword);
            if (!data) return;
            if (data.status === 400) {
                setErrorMessage(data.response.data);
                setIsErrorDisplayed(true);
                return;
            }
            console.log(data);
            setIsFinished(true);
        }
        exec();
    };

    const handleClose = () => setIsErrorDisplayed(false);

    const placeholderStyle = {
        "& input::placeholder": {
            color: "blue", // Couleur du placeholder
            fontWeight: "bold", // Style supplémentaire
        }
    }

    return (
        <>

        { !isFinished &&
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
                    <Typography onClick={e => navigate('/login')} sx={{ justifySelf: 'center', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer' }} >
                        Annuler</Typography>
                </Box>
            </Box>
        </Container> }

        { isFinished &&
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
                    Mot de passe réinitialisé !
                </Typography>
                <Box
                    noValidate
                    sx={{ mt: 2 }}
                    display="flex"
                    flexDirection="column"
                    gap=".5rem"
                >
                    <Typography fontSize={15} >Votre mot de passe a bien été réinitialisé.</Typography>
                    <Typography fontSize={15} >Veuillez cliquer sur ce lien pour vous connecter à nouveau.</Typography>
                    <Button
                        fullWidth={false}
                        variant="yellowButton"
                        sx={{ mt: 1 }}
                        onClick={e=>navigate('/login')}
                    >Retourner à la page de connexion</Button>
                </Box>

        </Box>
        </Container> }

        </>

    );
}

export default ForgotPassword;