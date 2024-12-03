import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Card, CardContent, stepButtonClasses, } from "@mui/material";
import { Delete, Add, Remove } from "@mui/icons-material";

// gravure, variante, quantité, code promo
// produit (prix, photo1, description)
// isCadeau, commentaire sur la commande, address (préremplie par adresse du compte)

function Basket() {

    const [basketProducts, setBasketProducts] = useState([
        {
            id: 1,
            titre:"Produit A",
            gravure:"Gravure 1",
            variante:"Variante Z",
            prix: 20,
            quantite: 1
        }, {
            id: 2,
            titre:"Produit B",
            gravure:"Gravure 2",
            variante:"Variante Y",
            prix: 35,
            quantite: 2
        },
        { 
            id: 3,
            titre:"Produit C",
            gravure:"Gravure 3",
            variante:"Variante X",
            prix: 15,
            quantite: 1
        }
    ]);

    // Fonction pour calculer le total
    const calculateTotal = () => {
        basketProducts.reduce((acc, product) => acc + product.prix * product.quantite, 0);
    }

    // Fonction pour modifier la quantité
    const updateQuantity = (id, increment) => {
        basketProducts((prev) =>
            prev.map((product) =>
                product.id === id
                    ? { ...product, quantite: Math.max(1, product.quantite + increment) }
                    : product
            )
        );
    };

    // Fonction pour supprimer un produit
    const removeItem = (id) => {
        setBasketProducts((prev) => prev.filter((product) => product.id !== id));
    };

    return (
        <Grid2 sx={{ padding: 2 }}>
            <Box  >
                
            <Typography variant="h4" gutterBottom>
                Mon panier
            </Typography>
            <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Produit</TableCell>
                            <TableCell align="right">Prix</TableCell>
                            <TableCell align="center">Quantité</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basketProducts.map((product) =>
                            <BasketItem product={product} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Résumé
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Total : {calculateTotal()}€
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={basketProducts.length === 0}
                    >
                        Passer commande
                    </Button>
                </CardContent>
            </Card>
            
            </Box>

            <Box>

            </Box>
        </Grid2>
    );
}

const BasketItem = ({ product }) => {

    return (
        <TableRow key={product.id}>
            <TableCell>{product.titre}</TableCell>
            <TableCell align="right">{product.prix}€</TableCell>
            <TableCell align="center">
                <IconButton onClick={() => updateQuantity(product.id, -1)}>
                    <Remove />
                </IconButton>
                {product.quantite}
                <IconButton onClick={() => updateQuantity(product.id, 1)}>
                    <Add />
                </IconButton>
            </TableCell>
            <TableCell align="right">{product.prix * product.quantite}€</TableCell>
            <TableCell align="center">
                <IconButton onClick={() => removeItem(product.id)}>
                    <Delete color="error" />
                </IconButton>
            </TableCell>
        </TableRow>
    )

}


export default Basket;
