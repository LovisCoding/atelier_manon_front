import { Container, Grid2, Snackbar, Alert } from "@mui/material";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";

import { useEffect, useState } from "react";
import { addProductToPanier, getProduct, getProductImage } from "../../services/ProductService";
import { useParams } from "react-router";

export default function Product() {

	const {id} = useParams();

	const [product, setProduct] = useState(null);
	const [images, setImages] = useState([]);

	const [errorMessage, setErrorMessage] = useState("");
	const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);

	useEffect(() => {
		const exec = async () => {
			const data = await getProduct(id);
			if (!data) return;
			setProduct({...data, idCli:2});
			let tmpImages = [];
			data.tabPhoto.forEach(image => {
				tmpImages = [...tmpImages, getProductImage(image) ];
			});
			setImages(tmpImages);
		}
		exec();
	}, []);

	const handleAddToCart = () => {
		const exec = async () => {
			const data = await addProductToPanier(product);
			if (data && data.data) setErrorMessage(data.data);
			else setErrorMessage("Une erreur est survenue lors de l'ajout au panier");
			setIsErrorDisplayed(true);
		};
		exec();
	}

	const handleClose = () => setIsErrorDisplayed(false)

	return (
		<Container sx={{
			marginTop: '4rem'
		}}>
			<Snackbar
				open={isErrorDisplayed}
				autoHideDuration={3000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert onClose={handleClose} severity={errorMessage.includes("erreur") ? "error" : "success"} sx={{ width: "100%" }}>
					{errorMessage}
				</Alert>
			</Snackbar>
			{product &&
			<Grid2 container spacing={5}>
				<Grid2 item size={{
					xs: 12,
					md: 6
				}}>
					<ProductImages images={images} />
				</Grid2>
				<Grid2 item size={{
					xs: 12,
					md: 6
				}}>
					<ProductDetails product={product} validateCallback={handleAddToCart} />
				</Grid2>
			</Grid2>}
		</Container>
	)
}
