import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { getArticle } from "../services/BlogService";

export default function ClientArticle(){

	const [article, setArticle] = useState();
	const { id } = useParams();

	useEffect(() => {
		getArticle(id)
			.then((data) => {
				if (data == null) setErr(true);
				else setArticle(data);
			})
	}, [])


	if ( !article ){
		return(
			<Typography textAlign="center" variant="h1">Chargement des données</Typography>
		)
	}

	return(
		<Container sx={{
			mt: "3rem"
		}}>
			<Typography textAlign="center" variant="h1">{article.titreArticle}</Typography>
			<Typography textAlign="center" variant="body2">le {article.dateArticle}</Typography>
			<Typography mt={"3rem"} variant="body1">{article.contenu}</Typography>

		</Container>
	)

}