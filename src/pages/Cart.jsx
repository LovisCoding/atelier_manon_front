import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Card, CardContent, Grid2, TableFooter, TextField, TextareaAutosize, Checkbox, } from "@mui/material";
import { Delete, Add, Remove, Close } from "@mui/icons-material";
import ImgMui from "../components/ImgMui";


import { useTheme } from "@mui/material/styles";

import TestImg from '../assets/img/bracelet1.webp';

// titre, détails, prix, quantité, total
// description, gravure/variante
// isCadeau, commentaire sur la commande, address (préremplie par adresse du compte)

function Cart() {

    const [commentary, setCommentary] = useState('');
    const [isGift, setIsGift] = useState(false);
    const [giftCommentary, setGiftCommentary] = useState('');
    const [promoCodes, setPromoCodes] = useState([]);

    const theme = useTheme();

    const [cartProducts, setCartProducts] = useState([
        {
            id: 1,
            titre: "Produit A",
            description: "Ceci est la description génialegénialegénialegénialegénialegénialegénialegénialegéniale du Produit A",
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
        },
        {
            id: 3,
            titre: "Produit C",
            description: "Ceci est la description géniale du Produit C",
            gravure: "Gravure 3",
            variante: "Variante X",
            prix: 15,
            quantite: 1,
            urlImg: TestImg
        }
    ]);

    const calculateTotal = () => {
        return cartProducts.reduce((acc, product) => acc + product.prix * product.quantite, 0);
    }

    const updateQuantity = (id, increment) => {
        setCartProducts((prev) =>
            prev.map((product) =>
                product.id === id
                    ? { ...product, quantite: Math.max(1, product.quantite + increment) }
                    : product
            )
        );
    };

    const removeItem = (id) => {
        setCartProducts((prev) => prev.filter((product) => product.id !== id));
    };

    const handleConfirmCommand = () => {
        console.log("command confirmed:");
        console.log("products:",cartProducts);
        console.log("isCadeau:",isGift);
        console.log("cadeauCommentary:",giftCommentary);
        console.log("total:",calculateTotal());
        console.log("promoCodes:",promoCodes);
        console.log("comentary:",commentary);
        
    }

    return (
        <Box>
            <Typography
                fontWeight="bold"
                variant="h4"
                display="flex"
                justifyContent="center"
                padding="1rem 0"
            >Mon panier</Typography>

            <Grid2 container columns={{ xs: 2, sm: 8, md: 12 }} spacing={5} justifyContent="center" margin="0 1rem" >
                <Grid2 item size={{ xs: 2, sm: 8, md: 12 }} >

                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow  >
                                    { /* titre gravure, variante, prix, quantité, total */}
                                    <TableCell sx={{ fontSize: 16 }}>Produit</TableCell>
                                    <TableCell align="right" sx={{ minWidth: '6rem', fontSize: 16 }} >Prix</TableCell>
                                    <TableCell align="center" sx={{ minWidth: '8rem', fontSize: 16 }} >Quantité</TableCell>
                                    <TableCell align="right" sx={{ minWidth: '6rem', fontSize: 16 }} >Total</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartProducts.map((product) =>
                                    <CartItem product={product} removeItem={removeItem} updateQuantity={updateQuantity} />
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow >
                                    <TableCell sx={{ fontWeight: 'bolder' }} > <Typography fontSize={18} fontWeight="bolder" color="customYellow" >Sous-total</Typography></TableCell>
                                    <TableCell colSpan={2} ></TableCell>
                                    <TableCell sx={{ fontWeight: 'bolder' }} > <Typography fontSize={18} fontWeight="bolder" color="customYellow" textAlign="end" >{calculateTotal()} €</Typography></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>


                </Grid2>

                <Grid2 item size={{ xs: 2, sm: 8, md: 6 }} >

                    <Card>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} >
                            <TextareaAutosize
                                multiline
                                minRows={2}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    fontSize: "16px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    resize: " none",
                                    outlineColor: theme.palette.customYellow.main,
                                    fontWeight: 'normal'
                                }}
                                placeholder="Ajoutez un commentaire sur votre commande"
                                value={commentary}
                                onChange={e => setCommentary(e.target.value)}

                            />


                            <PromoCodeSection promoCodes={promoCodes} setPromoCodes={setPromoCodes} />

                            <Box display="flex" alignItems="center" >
                                <Box
                                    width="27rem"
                                    ml={0}
                                    display="flex"
                                    gap={1}
                                    alignItems="center"
                                    onClick={e => setIsGift(!isGift)}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <Checkbox color="customYellow" checked={isGift} />
                                    <Typography>Votre commande est un cadeau</Typography>
                                </Box>

                                <TextareaAutosize
                                    hidden={!isGift}
                                    multiline
                                    minRows={1}
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        fontSize: "16px",
                                        borderRadius: "6px",
                                        border: "1px solid #ccc",
                                        resize: " none",
                                        outlineColor: theme.palette.customYellow.main,
                                        fontWeight: 'normal'
                                    }}
                                    placeholder="Ajoutez un mot pour le destinataire"
                                    value={giftCommentary}
                                    onChange={e => setGiftCommentary(e.target.value)}

                                />

                            </Box>

                            <Typography
                                alignSelf="end"
                                variant="body1"
                                gutterBottom
                                mr={3}
                                fontSize={18}
                            >Dû total : <span style={{ fontWeight: 'bold' }} >{calculateTotal()} €</span></Typography>

                            <Button
                                variant="yellowButton"
                                disabled={cartProducts.length === 0}
                                onClick={e => handleConfirmCommand()}
                            >Passer commande</Button>
                        </CardContent>
                    </Card>

                </Grid2>
            </Grid2>
        </Box>
    );
}



const CartItem = ({ product, removeItem, updateQuantity }) => {

    return (
        <TableRow key={product.id}>
            <TableCell width="auto" >
                <Box display="flex" width="auto" alignItems="center" gap={2} padding="0" >
                    <ImgMui alt="" src={product.urlImg} sx={{ height: '70px', width: 'auto', borderRadius: '5px' }} />
                    <Box fullWidth>
                        <Box fullWidth >
                            <Typography fontSize={18} >{product.titre}</Typography>
                            <Typography fontSize={14} color="grey" >{product.description}</Typography>
                        </Box>
                        <Box display="flex" gap={5} >
                            { product.gravure !== "" && <Typography fontSize={16} ><span style={{ fontWeight: '500' }} >Gravure :</span> {product.gravure}</Typography>}
                            { product.variante !== "" && <Typography fontSize={16} ><span style={{ fontWeight: '500' }} >Variante :</span> {product.variante}</Typography>}
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



const PromoCodeSection = ({ promoCodes, setPromoCodes }) => {
    const [inputValue, setInputValue] = useState("");

    const handleAddPromoCode = (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            if (!promoCodes.includes(inputValue.trim())) {
                setPromoCodes([...promoCodes, inputValue.trim()]);
            }
            setInputValue("");
        }
    };

    const handleRemovePromoCode = (code) => {
        setPromoCodes(promoCodes.filter((item) => item !== code));
    };

    return (
        <Box display="flex" flexDirection="column" width="100%" gap={2} >
            <TextField
                placeholder="Entrez un code promo"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleAddPromoCode}
                color="customYellow"
                fullWidth
            />

            {promoCodes.length > 0 && (
                <Box
                    display="flex"
                    gap=".5rem"
                    padding=".2rem .5rem"
                    // border="1px solid lightgrey"
                    borderRadius="5px"
                    minWidth="15rem"
                    flexWrap="wrap"
                >
                    {promoCodes.map((code, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                p: ".2rem .5rem",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                backgroundColor: "#f9f9f9",
                                height: 'fit-content',
                                bgcolor:'none',
                                gap:".3rem"
                            }}
                        >
                            <Typography>{code}</Typography>
                            <Box
                                size="small"
                                color="error"
                                onClick={() => handleRemovePromoCode(code)}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                sx={{cursor:'pointer'}}
                            ><Close color="error" /></Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}


export default Cart;
