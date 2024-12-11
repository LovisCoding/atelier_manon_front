import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Checkbox, CircularProgress, IconButton, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import SidebarMenu from "../SidebarMenu";
import { getAllAvis, updateAvis, deleteAvis } from "../../../services/AvisService";
import { MdDelete } from "react-icons/md";

export default function Avis() {
    const [avisList, setAvisList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);

    const loadAvis = async () => {
        setLoading(true);
        try {
            const data = await getAllAvis();
            if (data) {
                const sortedAvis = data.sort((a, b) => a.idAvis - b.idAvis);
                setAvisList(sortedAvis);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des avis :", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAvis();
    }, []);

    const handleCheckboxChange = async (id, currentState) => {
        const newState = !currentState;

        try {
            await updateAvis(id, newState);
            await loadAvis();
        } catch (err) {
            setErrorMessage("Erreur lors de la mise à jour de l'avis.");
            setIsErrorDisplayed(true);
            console.error("Erreur lors de la mise à jour de l'avis :", err);
        }
    };

    const handleDelete = async (id) => {
        const response = await deleteAvis(id);
        if (response) {
            setErrorMessage("Avis supprimé avec succès !");
            setIsErrorDisplayed(true);
            setAvisList((prev) =>
                prev.filter((avis) => avis.idAvis !== id)
              );
        } else {
            setErrorMessage("Impossible de supprimer cet avis.");
            setIsErrorDisplayed(true);
        }
    };

    return (
        <Box display={"flex"}>
            <SidebarMenu />
            <Stack sx={{ mt: 5, width: "100%" }}>
                <Snackbar
                    open={isErrorDisplayed}
                    autoHideDuration={3000}
                    onClose={()=>setIsErrorDisplayed(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={()=>setIsErrorDisplayed(false)} severity={errorMessage.includes("succès") ? "success" : "error"} sx={{ width: "100%" }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
                <Stack mb={5} direction="row" justifyContent={"space-around"}>
                    <Typography variant="h4">Liste des Avis</Typography>
                </Stack>
                <Box mx={5}>
                    {loading ? (
                        <Stack direction="row" justifyContent="center">
                            <CircularProgress />
                        </Stack>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Contenu de l'avis</TableCell>
                                        <TableCell>Note</TableCell>
                                        <TableCell>Afficher</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {avisList.map((avis) => (
                                        <TableRow key={avis.idAvis} hover>
                                            <TableCell>{avis.contenu}</TableCell>
                                            <TableCell>{avis.note}</TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    checked={avis.estAffiche}
                                                    color="customYellow"
                                                    onChange={() =>
                                                        handleCheckboxChange(
                                                            avis.idAvis,
                                                            avis.estAffiche
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(avis.idAvis)}
                                                >
                                                    <MdDelete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Stack>
        </Box>
    );
}