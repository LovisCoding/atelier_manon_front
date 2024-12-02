import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import Footer from "../../components/Footer";

export default function Test() {
	const { id } = useParams();


	return (
		<Box>
			<Typography variant="h1"> Test {id}</Typography>
			<Footer/>
		</Box>
	)
}