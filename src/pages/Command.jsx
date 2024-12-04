
import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Grid2, TextareaAutosize } from "@mui/material";

import ImgMui from "../components/ImgMui";

function Command() {

    const { id } = useParams();
    const theme = useTheme();

    const isGift = true;
    const giftCommentary = "Tiens donova un cadeau de ton amoureux";
    const promoCodes = ["MASTU20", "JOYCA10"];
    const commentary = "Il faut livrer à la gardienne";

    const cartProducts = [{
        id: 1,
        titre: "Produit A",
        description: "Ceci est la description génialegénialegénialegénialegénialegénialegénialegéniale du Produit A",
        gravure: "Gravure 1",
        variante: "Variante Z",
        prix: 200.5,
        quantite: 1,
        urlImg: TestImg
    }, {
        id: 2,
        titre: "Produit B",
        description: "Ceci est la description géniale du Produit B",
        gravure: "Gravure 2",
        variante: "Variante Y",
        prix: 35,
        quantite: 2,
        urlImg: TestImg
    }, {
        id: 3,
        titre: "Produit C",
        description: "Ceci est la description géniale du Produit C",
        gravure: "Gravure 3",
        variante: "Variante X",
        prix: 15,
        quantite: 1,
        urlImg: TestImg
    }];

    const total = cartProducts.reduce((acc, product) => acc + product.prix * product.quantite, 0);
    const totalDue = total * 0.8;

    return (
        <Box mb={3} >
            <Typography
                fontWeight="bold"
                variant="h4"
                display="flex"
                justifyContent="center"
                padding="1rem 0"
                mt={3}
                mb={2}
            >Récapitulatif de la commande</Typography>

            <Grid2 container columns={{ xs: 2, sm: 8, md: 12 }} spacing={5} justifyContent="center" margin="0 1rem" >
                <Grid2 item size={{ xs: 2, sm: 8, md: 8 }} >

                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow  >
                                    { /* titre gravure, variante, prix, quantité, total */}
                                    <TableCell sx={{ fontSize: 16 }}>Produit</TableCell>
                                    <TableCell align="right" sx={{ minWidth: '6rem', fontSize: 16 }} >Prix</TableCell>
                                    <TableCell align="center" sx={{ fontSize: 16 }} >Quantité</TableCell>
                                    <TableCell align="right" sx={{ minWidth: '6rem', fontSize: 16 }} >Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartProducts.map((product) =>
                                    <CartItem product={product} />
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </Grid2>

                <Grid2 item size={{ xs: 2, sm: 6, md: 4 }} >

                    <Card>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} >

                            {commentary !== "" && <Box display="flex" flexDirection="column" gap={1} >
                                <Typography>Commentaire de la commande</Typography>

                                <TextareaAutosize
                                    value={commentary}
                                    readOnly
                                    placeholder="Ajoutez un mot pour le destinataire"
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        fontSize: "16px",
                                        borderRadius: "6px",
                                        borderColor: 'lightgrey',
                                        resize: " none",
                                        fontWeight: 'normal',
                                        color: theme.palette.primary.dark
                                    }}
                                />

                            </Box>}


                            {promoCodes.length > 0 &&
                                <Box display="flex" flexDirection="column" gap={1} >
                                    <Typography >Codes promo :</Typography>
                                    <Box display="flex" gap={2} >
                                        {promoCodes.map((code) =>
                                            <Box
                                                sx={{
                                                    p: ".2rem .5rem",
                                                    border: "1px solid #ccc",
                                                    borderRadius: "4px",
                                                    backgroundColor: "#f9f9f9",
                                                    width: 'fit-content'
                                                }}
                                            >
                                                <Typography>{code}</Typography>
                                            </Box>
                                        )}

                                    </Box>
                                </Box>}


                            {isGift &&
                                <Box display="flex" flexDirection="column" gap={1} >
                                    <Typography>Votre message pour le destinataire </Typography>

                                    <TextareaAutosize
                                        value={giftCommentary}
                                        readOnly
                                        placeholder="Ajoutez un mot pour le destinataire"
                                        style={{
                                            width: "100%",
                                            padding: "8px",
                                            fontSize: "16px",
                                            borderRadius: "6px",
                                            borderColor: 'lightgrey',
                                            resize: " none",
                                            fontWeight: 'normal',
                                            color: theme.palette.primary.dark
                                        }}
                                    />

                                </Box>
                            }

                            <Box display="flex" flexDirection="column" alignItems="end" mr={3} mt={2} >
                                <Typography
                                    fontSize={18}
                                >Total : <span style={{ fontWeight: 'bold' }} >{total} €</span></Typography>
                                <Typography
                                >Réductions appliquées : <span style={{ fontWeight: 'bold' }} >{Math.round((total - totalDue) * 100) / 100} €</span></Typography>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    fontSize={22}
                                >Dû total : <span style={{ fontWeight: 'bold' }} >{totalDue} €</span></Typography>

                            </Box>

                        </CardContent>
                    </Card>

                </Grid2>
            </Grid2>
        </Box >
    )


}

import TestImg from '../assets/img/bracelet1.webp';
import { useTheme } from "@emotion/react";
import { useParams } from "react-router";

const CartItem = ({ product }) => {

    return (
        <TableRow key={product.id}>
            <TableCell >
                <Box display="flex" alignItems="center" gap={2} padding="0" >
                    <ImgMui alt="" src={TestImg} sx={{ height: '70px', width: 'auto', borderRadius: '5px' }} />
                    <Box fullWidth >
                        <Box fullWidth >
                            <Typography fontSize={18} >{product.titre}</Typography>
                            <Typography
                                fontSize={14}
                                color="grey"
                                sx={{ overflowWrap: 'anywhere' }}
                            >{product.description}</Typography>
                        </Box>
                        <Box display="flex" gap={5} >
                            {product.gravure !== "" && <Typography fontSize={16} ><span style={{ fontWeight: '500' }} >Gravure :</span> {product.gravure}</Typography>}
                            {product.variante !== "" && <Typography fontSize={16} ><span style={{ fontWeight: '500' }} >Variante :</span> {product.variante}</Typography>}
                        </Box>
                    </Box>
                </Box>
            </TableCell>

            <TableCell align="right" >{product.prix} €</TableCell>
            <TableCell align="center" >{product.quantite}</TableCell>
            <TableCell align="right" >{product.prix * product.quantite} €</TableCell>
        </TableRow>
    )

}



export default Command;
