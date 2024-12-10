import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, TextField, Button, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import SidebarMenu from "../SidebarMenu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getAllMateriau, getAllFils, getAllPierres, getAllTailles, getAllPendentifs, deleteMatProd, deleteFilProd, deletePierreProd, deleteTailleProd, deletePendentifProd } from "/src/services/PersonalizationService";
import { useAuth } from "../../../utils/AuthContext";
import { addMatProd, addFilProd, addPierreProd, addPendentifProd, addTailleProd } from "../../../services/PersonalizationService";

const DataTable = ({ data, setData, title, keyField, valueField, descriptionField = null, addFunction = null, deleteFunction = null }) => {
  const [newValue, setNewValue] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { isLogged, details } = useAuth();
  if (!isLogged || !details.isAdmin) window.location = '/';

  const handleAdd = async () => {
    if (newValue.trim()) {
      const newItem = {
        [valueField]: newValue,
        ...(descriptionField && { [descriptionField]: newDescription }),
      };

      try {
        const addedItem = addFunction ? await addFunction(newItem) : newItem;

        if (addedItem) {
          setData((prevData) => [...prevData, { ...addedItem, [keyField]: addedItem[keyField] || new Date().getTime() }]);
          setSuccessMessage(`${title} ajouté avec succès !`);
        } else {
          setError(`Erreur lors de l'ajout du ${title}`);
        }
        setNewValue("");
        setNewDescription("");
      } catch (error) {
        setError(`Erreur lors de l'ajout du ${title}`);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      if (deleteFunction) {
        await deleteFunction(id);
        setData((prevData) => prevData.filter((item) => item[keyField] !== id));
        setSuccessMessage(`${title} supprimé avec succès !`);
      }
    } catch (error) {
      setError(`Erreur lors de la suppression du ${title}`);
    }
  };

  return (
    <Accordion sx={{ width: "100%" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${title}-content`} id={`${title}-header`}>
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ maxHeight: "400px", overflow: "auto" }}>
          {error && <Alert severity="error">{error}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <TextField
            label={`Ajouter un ${title.toLowerCase()}`}
            variant="outlined"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
          />
          {descriptionField && (
            <TextField
              label="Ajouter une description"
              variant="outlined"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            fullWidth
            sx={{ marginTop: -10 }}
          >
            Ajouter
          </Button>
          <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Table sx={{ width: "100%" }}>
              <TableBody>
                {data.map((item) => (
                  <TableRow hover style={{ cursor: "pointer", borderRadius: "5px", width: "100%" }} key={item[keyField]}>
                    <TableCell sx={{ fontWeight: "bold", padding: "16px", width: "100%" }}>
                      {item[valueField]}
                      {descriptionField && (
                        <Typography variant="body2" color="textSecondary">
                          {item[descriptionField]}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ width: "10%", textAlign: "center" }}>
                      <IconButton onClick={() => handleDelete(item[keyField])} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default function Personalization() {
  const [materials, setMaterials] = useState([]);
  const [fils, setFils] = useState([]);
  const [pierres, setPierres] = useState([]);
  const [tailles, setTailles] = useState([]);
  const [pendentifs, setPendentifs] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const dataMateriaux = await getAllMateriau();
      if (dataMateriaux) {
        setMaterials(dataMateriaux);
      }

      const dataFils = await getAllFils();
      if (dataFils) {
        setFils(dataFils);
      }

      const dataTailles = await getAllTailles();
      if (dataTailles) {
        setTailles(dataTailles);
      }

      const dataPierres = await getAllPierres();
      if (dataPierres) {
        setPierres(dataPierres);
      }

      const dataPendentifs = await getAllPendentifs();
      if (dataPendentifs) {
        setPendentifs(dataPendentifs);
      }
    };

    fetchData();
  }, []);

  return (
    <Box display="flex" justifyContent="center" width="100%" minHeight="100vh">
      <SidebarMenu />
      <Stack sx={{ mt: 5, width: "70%" }}>
        <Typography variant="h4" mb={4} sx={{ textAlign: "center" }}>
          Personnalisation des matériaux, des fils et des pierres
        </Typography>

        <DataTable
          data={materials}
          setData={setMaterials}
          title="Matériau"
          keyField="libMateriau"
          valueField="libMateriau"
          addFunction={addMatProd}
          deleteFunction={deleteMatProd}
        />

        <DataTable
          data={fils}
          setData={setFils}
          title="Fil"
          keyField="libCouleur"
          valueField="libCouleur"
          addFunction={addFilProd}
          deleteFunction={deleteFilProd}
        />

        <DataTable
          data={pierres}
          setData={setPierres}
          title="Pierre"
          keyField="libPierre"
          valueField="libPierre"
          descriptionField="descriptionPierre"
          addFunction={addPierreProd}
          deleteFunction={deletePierreProd}
        />

        <DataTable
          data={tailles}
          setData={setTailles}
          title="Taille"
          keyField="libTaille"
          valueField="libTaille"
          addFunction={addTailleProd}
          deleteFunction={deleteTailleProd}
        />

        <DataTable
          data={pendentifs}
          setData={setPendentifs}
          title="Pendentif"
          keyField="libPendentif"
          valueField="libPendentif"
          addFunction={addPendentifProd}
          deleteFunction={deletePendentifProd}
        />
      </Stack>
    </Box>
  );
}