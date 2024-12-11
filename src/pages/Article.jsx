import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { getArticle } from "../services/BlogService";
import DOMPurify from 'dompurify';

export default function ClientArticle() {

	const [article, setArticle] = useState();
	const { id } = useParams();

	useEffect(() => {
		getArticle(id)
			.then((data) => {
				if (data == null) setErr(true);
				else setArticle(data);
			})
	}, [])


	if (!article) {
		return (
			<Typography textAlign="center" variant="h1">Chargement des données</Typography>
		)
	}

	return (
		<Container sx={{
			mt: "3rem"
		}}>
			<Typography textAlign="center" variant="h1">{article.titreArticle}</Typography>
			<Typography textAlign="center" variant="body2">
				{ new Date(article.dateArticle).toLocaleDateString("fr-FR", {
					year: "numeric",
					month: "long",
					day: "numeric",
        		})}			
			</Typography>
			<Typography textAlign="center" mt={"3rem"} mb={"3rem"} variant="body1">
				<div
					style={{
						overflowWrap: "break-word",
						whiteSpace: "normal",
						width: "100%",
						wordBreak: "break-word",
						maxWidth: "100%",
						textAlign: "left",
					}}
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(article.contenu),
					}}
				/>
			</Typography>
		</Container>
	)
}