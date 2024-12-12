import { useEffect, useState } from "react";
import { getArticles } from "../services/BlogService";
import { Typography, CircularProgress, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import DOMPurify from 'dompurify';

const truncateText = (text, wordLimit) => {
  const words = text.split("<br>");
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
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
        <Typography mt={2} variant="body1" color="text.secondary">
          Chargement des articles...
        </Typography>
      </Box>
    );
  }

  if (err) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h4" color="error" align="center">
          {err}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, bgcolor: "background.default", minHeight: "100vh", maxWidth: 1200, margin: "auto" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Bienvenue sur notre blog
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 4 }}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <ArticleLine article={article} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function ArticleLine({ article }) {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`/article/${article.idArticle}`)}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        cursor: "pointer",
        transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
        backgroundColor: "background.paper",
        "&:hover": {
          backgroundColor: "action.hover",
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          {article.titreArticle}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ marginTop: 1 }}>
          <div 
            style={{
              overflow:'hidden',
              height:'10.3rem'
            }}
            dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(truncateText(article.contenu, 3)),
          }} />
        </Typography>
      </Box>
      <Typography variant="caption" color="text.primary" sx={{ textAlign: "right", marginTop: 2, fontStyle: "italic" }}>
        {new Date(article.dateArticle).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })}
      </Typography>
    </Box>
  );
}