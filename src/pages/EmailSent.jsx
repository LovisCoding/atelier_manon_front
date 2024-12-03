import React, { useState } from "react";
import { Button, Box, Typography, Container } from "@mui/material";

function EmailSent() {

    const changeRoute = (route) => {
        window.location = route;
    }

    return (
        <Container maxWidth="xs" >
            <Box
                sx={{
                    mt: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography color="customYellow" fontWeight="700" component="h1" variant="h5" >
                    Email envoyé
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 2 }}
                    display="flex"
                    flexDirection="column"
                    gap=".5rem"
                >
                    <Typography fontSize={15} >Nous venons de vous envoyer un email contenant un lien de confirmation.</Typography>
                    <Typography fontSize={15} >Veuillez cliquer sur ce lien et suivre les étapes suivantes.</Typography>
                    <Button
                        fullWidth={false}
                        variant="yellowButton"
                        sx={{ mt: 1 }}
                        onClick={e=>changeRoute('/login')}
                    >Retourner à la page de connexion</Button>
                </Box>
            </Box>
        </Container>
    )

}

export default EmailSent;
