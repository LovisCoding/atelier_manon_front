import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import SidebarMenu from "../SidebarMenu";
import { getAllMateriau, getAllFils, getAllPierres } from "/src/services/PersonalizationService";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const DataTable = ({ data, setData, title, keyField, valueField, descriptionField = null }) => {
  const [newValue, setNewValue] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAdd = () => {
    if (newValue.trim()) {
      const newItem = {
        [keyField]: new Date().getTime(),
        [valueField]: newValue,
        ...(descriptionField && { [descriptionField]: newDescription }),
      };
      setData((prevData) => [...prevData, newItem]);
      setNewValue("");
      setNewDescription("");
    }
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item[keyField] !== id));
  };

  return (
    <Accordion sx={{ width: "100%" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${title}-content`} id={`${title}-header`}>
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ maxHeight: "400px", overflow: "auto" }}>
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
                        <Typography variant="body2">
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

      const dataPierres = await getAllPierres();
      if (dataPierres) {
        setPierres(dataPierres);
      }
    };

    fetchData();
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" minHeight="100vh">
      <SidebarMenu />
      <Stack sx={{ mt: 5, width: "70%" }}>
        <Typography variant="h4" mb={4} sx={{ textAlign: "center" }}>
          Personnalisation des matériaux, des fils et des pierres
        </Typography>

        <DataTable
          data={materials}
          setData={setMaterials}
          title="Matériau"
          keyField="id"
          valueField="libMateriau"
        />

        <DataTable
          data={fils}
          setData={setFils}
          title="Fil"
          keyField="id"
          valueField="libCouleur"
        />

        <DataTable
          data={pierres}
          setData={setPierres}
          title="Pierre"
          keyField="id"
          valueField="libPierre"
          descriptionField="descriptionPierre"
        />
      </Stack>
    </Box>
  );
}