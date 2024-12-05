import { Box, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Stack, Typography, Button } from "@mui/material";
import SidebarMenu from "../SidebarMenu";
import { useNavigate } from "react-router";

export default function Orders() {
  const navigate = useNavigate();

  const handleClickRow = (to) => {
    navigate(to);
  };

  const rows = [
    {
      id: 1,
      client: "Matthias Bernouy",
      amount: 25.37,
      state: "En cours",
      date: "16 novembre 2024",
    },
    {
      id: 2,
      client: "Jean Dupont",
      amount: 54.99,
      state: "Livrée",
      date: "12 novembre 2024",
    },
    {
      id: 3,
      client: "Marie Curie",
      amount: 75.5,
      state: "Annulée",
      date: "10 novembre 2024",
    },
    {
      id: 4,
      client: "Albert Einstein",
      amount: 12.34,
      state: "En attente",
      date: "15 novembre 2024",
    },
  ];

  return (
    <Box display="flex">
      <SidebarMenu />
      <Stack spacing={5} p={5}>
        <Typography variant="h1">
          Liste des commandes
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Montant total</TableCell>
                <TableCell>État</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleClickRow(`/admin/order/${row.id}`)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.client}
                  </TableCell>
                  <TableCell>{row.amount.toFixed(2)} €</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}
