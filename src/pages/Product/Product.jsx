import { Box, Container, Grid2, Typography } from "@mui/material";
import { IoTimeOutline } from "react-icons/io5";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";

export function Product(){
	return(
		<Container sx={{
			marginTop: '4rem'
		}}>
			<Grid2 container spacing={5}>
				<Grid2 item size={{
					xs: 12,
					md: 6
				}}>
					<ProductImages />
				</Grid2>
				<Grid2 item size={{
					xs: 12,
					md: 6
				}}>
					<ProductDetails />
				</Grid2>
			</Grid2>
		</Container>
	)
}
