import { useParams } from "react-router";
import SidebarMenu from "../SidebarMenu";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { useState } from "react";

export default function Newsletter() {
  const { id } = useParams();

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSave = () => {
    alert(`Penser à faire l'envoi de la newsletter avec le sujet : ${subject}`);
  };

  const emailList = [
    "contact@exemple.com",
    "info@exemple.com",
    "newsletter@exemple.com"
  ];

  return (
    <Box display="flex" width="100%" height="100vh">
      <SidebarMenu sx={{ height: "100vh" }}>
        <Box display="flex" width="100%" height="100%">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 2,
              padding: 2,
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: "70%",
                bgcolor: "#ffffff",
                p: 2,
                borderRadius: 2,
                height: "100%",
                overflowY: "auto",
                flexGrow: 1,
				marginTop: 2,
              }}
            >
              <Typography variant="h6" mb={2} fontWeight="bold" textAlign="center">Liste des Emails</Typography>
              <List>
                {emailList.map((email, index) => (
                  <ListItem button key={index}>
                    <ListItemText primary={email} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box
              sx={{
                width: "100%",
                maxWidth: "600px",
                margin: "0 auto",
                bgcolor: "#ffffff",
                p: 3,
                borderRadius: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                marginLeft: 20,
              }}
            >
              <Stack sx={{ width: "30rem" }}>
                <Typography variant="h4" mb={2} fontWeight="bold" textAlign="center">
                  Création de la Newsletter
                </Typography>

                <TextField
                  label="Objet du mail"
                  variant="outlined"
                  fullWidth
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />

                <TextField
                  label="Description du mail"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />

                <Button variant="contained" color="primary" onClick={handleSave} sx={{ alignSelf: "center", fontWeight: "bold" }}>
                  Envoyer
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </SidebarMenu>
    </Box>
  );
}