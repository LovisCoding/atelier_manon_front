import { Container, Grid2 } from "@mui/material";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";

import { useEffect, useState } from "react";
import { addProductToPanier, getProduct, getProductImage } from "../../services/ProductService";
import { useParams } from "react-router";

export default function Product() {

	const {id} = useParams();

	const [product, setProduct] = useState(null);
	const [images, setImages] = useState([]);

	useEffect(() => {
		const exec = async () => {
			const data = await getProduct(id);
			if (!data) return;
			setProduct({...data, idCli:2});
			data.tabPhoto.forEach(image => {
				setImages([...images, getProductImage(image) ]);
			});
		}
		exec();
	}, []);

	const handleAddToCart = () => {
		const exec = async () => {
			console.log("added to cart");
			await addProductToPanier(product);
		};
		exec();
	}


	return (
		<Container sx={{
			marginTop: '4rem'
		}}>
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