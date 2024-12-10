import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Checkbox, CircularProgress, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import SidebarMenu from "../SidebarMenu";
import { getAllAvis, updateAvis, deleteAvis } from "../../../services/AvisService";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Avis() {
    const [avisList, setAvisList] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fonction pour charger les avis
    const loadAvis = async () => {
        setLoading(true);
        try {
            const data = await getAllAvis();
            if (data) {
                // Trie les avis selon l'idAvis pour conserver l'ordre initial
                const sortedAvis = data.sort((a, b) => a.idAvis - b.idAvis);
                setAvisList(sortedAvis);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des avis :", error);
        } finally {
            setLoading(false);
        }
    };

    // Récupérer les avis au chargement
    useEffect(() => {
        loadAvis();
    }, []);

    // Gestion de la mise à jour d'un avis
    const handleCheckboxChange = async (id, currentState) => {
        const newState = !currentState; // Inverse l'état actuel

        // Met à jour la base de données
        try {
            await updateAvis(id, newState);
            // Recharge la liste après mise à jour
            await loadAvis();
        } catch (err) {
            console.error("Erreur lors de la mise à jour de l'avis :", err);
        }
    };

    const handleDelete = async (id) => {
        const response = await deleteAvis(id);
        if (response){
            alert("Avis supprimé avec succès !");
            setAvisList((prev) =>
                prev.filter((avis) => avis.idAvis !== id)
              );
        }
        else 
            alert("Impossible de supprimer cet avis");
    };

    return (
        <Box display={"flex"}>
            <SidebarMenu />
            <Stack sx={{ mt: 5, width: "100%" }}>
                <Stack direction="row" justifyContent={"space-around"}>
                    <Typography variant="h4">Liste des Avis</Typography>
                </Stack>
                <Box mx={15} mt={8}>
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
                                        <TableCell>Affiché</TableCell>
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
                                                    <DeleteIcon />
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