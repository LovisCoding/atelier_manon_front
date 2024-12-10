import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, TextField, Button, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getCategories, addCategorie, deleteCategorie } from '../../../services/CategorieService';

export default function Categories () {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      const exec = async () => {
        const data = await getCategories();
        if (data) setCategories(data);
      };
      exec();
    }, []);

    return (
      <Box display="flex" justifyContent="center" width="100%">
        <Stack sx={{ }}>
          <Typography variant="h4" mb={4} sx={{ textAlign: "center" }}>
            Personnalisation des categories
          </Typography>

          <DataTable
            data={categories}
            setData={setCategories}
            title="Catégorie"
            keyField="idCateg"
            valueField="libCateg"
            addFunction={addCategorie}
            deleteFunction={deleteCategorie}
          />

        </Stack>
      </Box>
    );
  }


const DataTable = ({ data, setData, title, keyField, valueField, descriptionField = null, addFunction = null, deleteFunction = null }) => {
    const [newValue, setNewValue] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleAdd = async () => {
      if (newValue.trim()) {
        const newItem = {
          [valueField]: newValue,
          ...(descriptionField && { [descriptionField]: newDescription }),
        };

        try {
          const addedItem = addFunction ? await addFunction(newItem) : newItem;

          if (addedItem) {
            setData((prevData) => [...prevData, newItem]);
            setSuccessMessage(`${title} ajouté avec succès !`);
          } else {
            setError(`Erreur lors de l'ajout de la ${title}`);
          }
          setNewValue("");
          setNewDescription("");
        } catch (error) {
          setError(`Erreur lors de l'ajout de la ${title}`);
        }
      }
    };

    const handleDelete = async (id) => {
      try {
        if (deleteFunction) {
          await deleteFunction(Number(id));
          setData((prevData) => prevData.filter((item) => item[keyField] !== id));
          setSuccessMessage(`${title} supprimé avec succès !`);
        }
      } catch (error) {
        setError(`Erreur lors de la suppression de la ${title}`);
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
              onChange={(e) => {setNewValue(e.target.value); setError(null); setSuccessMessage(null);}}
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
