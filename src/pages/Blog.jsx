import { useEffect, useState } from "react";
import { getArticles } from "../services/BlogService";
import { Card, CardContent, CardMedia, Typography, Stack, CircularProgress, Grid2 } from "@mui/material";
import { useNavigate } from "react-router";

const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then((data) => {
        if (data == null) {
          setErr("Impossible de charger les articles. Veuillez réessayer.");
        } else {
          setArticles(data);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des articles :", error);
        setErr("Une erreur est survenue. Veuillez vérifier votre connexion.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress />
        <Typography>Chargement des articles...</Typography>
      </Stack>
    );
  }

  if (err) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h4" color="error">
          {err}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={4} padding={4}>
      <Typography variant="h3" align="center">
        Bienvenue sur notre blog
      </Typography>

      <Grid2 container spacing={2}>
        {articles.map((article) => (
          <CardArticle key={article.id} article={article} />
        ))}
      </Grid2>
    </Stack>
  );
}

function CardArticle({ article }) {

	const navigate = useNavigate();

	return (
		<Grid2 item size={{
			xs: 12,
			sm: 6,
			md: 4
		}}>
			<Card onClick={() => navigate(`/article/${article.idArticle}`)} sx={{ display: "flex", alignItems: "center", padding: 2, gap: 2, cursor: "pointer" }}>
				<CardContent>
					<Typography variant="h5" fontWeight="bold">
						{article.titreArticle}
					</Typography>
					<Typography variant="body1">
						{ truncateText(article.contenu, 50) }
					</Typography>
					<Typography variant="body2">
						{article.dateArticle}
					</Typography>
				</CardContent>
			</Card>
		</Grid2>

  );
}
