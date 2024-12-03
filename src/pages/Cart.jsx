import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Card, CardContent, stepButtonClasses, Grid2, Stack, TableFooter, TextField, TextareaAutosize, } from "@mui/material";
import { Delete, Add, Remove, CheckBox } from "@mui/icons-material";

// titre, détails, prix, quantité, total
// description, gravure/variante
// isCadeau, commentaire sur la commande, address (préremplie par adresse du compte)

function Cart() {

    const [commentary, setCommentary] = useState('');

    const [basketProducts, setBasketProducts] = useState([
        {
            id: 1,
            titre: "Produit A",
            description: "Ceci est la description géniale du Produit A",
            gravure: "Gravure 1",
            variante: "Variante Z",
            prix: 200.5,
            quantite: 1
        }, {
            id: 2,
            titre: "Produit B",
            description: "Ceci est la description géniale du Produit B",
            gravure: "Gravure 2",
            variante: "Variante Y",
            prix: 35,
            quantite: 2
        },
        {
            id: 3,
            titre: "Produit C",
            description: "Ceci est la description géniale du Produit C",
            gravure: "Gravure 3",
            variante: "Variante X",
            prix: 15,
            quantite: 1
        }
    ]);

    // Fonction pour calculer le total
    const calculateTotal = () => {
        return basketProducts.reduce((acc, product) => acc + product.prix * product.quantite, 0);
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
        <Box>
            <Typography variant="h4" gutterBottom>
                Mon panier
            </Typography>

            <Grid2 container columns={{ xs: 2, sm: 8, md: 12 }} spacing={3} justifyContent="center" margin="0 1rem" >
                <Grid2 item size={{ xs: 2, sm: 8, md: 12 }} >

                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    { /* titre gravure, variante, prix, quantité, total */}
                                    <TableCell>Produit</TableCell>
                                    <TableCell align="right" sx={{ minWidth: '6rem' }} >Prix</TableCell>
                                    <TableCell align="center" sx={{ minWidth: '8rem' }} >Quantité</TableCell>
                                    <TableCell align="right" sx={{ minWidth: '6rem' }} >Total</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {basketProducts.map((product) =>
                                    <CartItem product={product} removeItem={removeItem} />
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow >
                                    <TableCell sx={{ fontWeight: 'bolder', fontSize: '15px' }} >Sous-total</TableCell>
                                    <TableCell colSpan={4} ></TableCell>
                                    <TableCell sx={{ textAlign: 'right', fontWeight: 'bolder', fontSize: '15px' }}  >{calculateTotal()} €</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>


                </Grid2>

                <Grid2 item size={{ xs: 2, sm: 6, md: 6 }} >

                    <Card>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} >
                            <Typography variant="body1" gutterBottom>
                                Dû total : {calculateTotal()} €
                            </Typography>
                            <TextareaAutosize
                                multiline
                                minRows={2}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    fontSize: "16px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    resize: " none"
                                }}
                                placeholder="Ajoutez un commentaire sur votre commande"
                                value={commentary}
                                onChange={e => setCommentary(e.target.value)}
                            />

                            <TextField value={'code promo'} />

                            <CheckBox />isCadeau

                            <Button
                                variant="yellowButton"
                                fullWidth
                                disabled={basketProducts.length === 0}
                            >Passer commande</Button>
                        </CardContent>
                    </Card>

                </Grid2>
            </Grid2>
        </Box>
    );
}

const CartItem = ({ product, removeItem }) => {

    // titre, détails, prix, quantité, total
    // description, gravure/variante

    return (
        <TableRow key={product.id}>
            <TableCell >
                <Box>
                    <Box>
                        
                    </Box>
                    <Box>
                        <Box >
                            <Typography>{product.titre}</Typography>
                            <Typography fontSize={12} color="grey" >{product.description}</Typography>
                        </Box>
                        <Box display="flex" >
                            <Typography fontSize={14} >{product.gravure}</Typography>
                            <Typography fontSize={14} >{product.variante}</Typography>
                        </Box>
                    </Box>
                </Box>


            </TableCell>


            <TableCell align="right" >{product.prix} €</TableCell>
            <TableCell align="center" >
                <IconButton onClick={() => updateQuantity(product.id, -1)}>
                    <Remove />
                </IconButton>
                {product.quantite}
                <IconButton onClick={() => updateQuantity(product.id, 1)}>
                    <Add />
                </IconButton>
            </TableCell>
            <TableCell align="right" >{product.prix * product.quantite} €</TableCell>
            <TableCell align="center">
                <IconButton onClick={() => removeItem(product.id)}>
                    <Delete color="error" />
                </IconButton>
            </TableCell>
        </TableRow>
    )

}


export default Cart;
