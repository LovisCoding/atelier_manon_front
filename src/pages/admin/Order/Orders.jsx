import { Box, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Stack, Typography } from "@mui/material";
import SidebarMenu from "../SidebarMenu";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getOrdersForAdmin } from "../../../services/CommandService";
import { useAuth } from "../../../utils/AuthContext";

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleClickRow = (to) => {
    navigate(to);
  };

  useEffect(() => {
    if (auth.)
    getOrdersForAdmin()
      .then((data) => {
        if (data != null) setOrders(data);
      })
  }, [])

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
              { orders.map((row) => (
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
