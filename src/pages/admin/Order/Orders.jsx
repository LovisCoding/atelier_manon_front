import { Box, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Stack, Typography } from "@mui/material";
import SidebarMenu from "../SidebarMenu";
import { useEffect, useState } from "react";
import { getOrdersForAdmin } from "../../../services/CommandService";
import { formatDate } from "../../../utils/Date";
import { useNavigate } from "react-router";

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  const handleClickRow = (to) => {
    navigate(to);
  };

  useEffect(() => {
    getOrdersForAdmin()
      .then((data) => {
        if (data != null) setOrders(data);
        else setError(true);
      })
  }, [])

  if (error !== null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography>Chargement des données...</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box display="flex">
        <SidebarMenu />
        <Stack spacing={5} p={5} flexGrow={1}>
          <Typography variant="h4" textAlign="center">
            Liste des commandes
          </Typography>
          <TableContainer component={Paper}> 
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Adresse</TableCell>
                  <TableCell>Montant total</TableCell>
                  <TableCell>État</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => handleClickRow(`/admin/order/${row.idCommande}`)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <TableCell>#{row.idCommande}</TableCell>
                    <TableCell>{row.adresse.replace(/[{}"]/g, '').replaceAll(',', ' ')}</TableCell>
                    <TableCell>{row.prixTotalReduc} €</TableCell>
                    <TableCell>{row.etat}</TableCell>
                    <TableCell> { formatDate(row.dateCommande) }</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </Box>
  );
}