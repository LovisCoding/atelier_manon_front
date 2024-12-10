import { Container, Stack, Typography } from "@mui/material";

function LegalMentions() {
  return (
    <Container maxWidth={"md"} sx={{ py: 4 }}>
      <Typography variant={"h1"} textAlign={"center"} sx={{ fontSize: "4rem" }}>
        Mentions Légales
      </Typography>

      <Stack mb={5}>
        {/* Section 1 */}
        <Typography variant="h5" mt={4}>
          1. Éditeur du site
        </Typography>
        <Typography variant="body1" mt={2}>
          Le présent site, accessible à l’adresse www.latelierdemanon.com, est
          édité par :
        </Typography>
        <Typography variant="body1" mt={1}>
          <strong>L'Atelier de Manon</strong>
        </Typography>
        <Typography variant="body1">Entreprise Individuelle</Typography>
        <Typography variant="body1">
          Adresse : [adresse complète de l'entreprise]
        </Typography>
        <Typography variant="body1">
          Téléphone : [numéro de téléphone]
        </Typography>
        <Typography variant="body1">
          Email : [adresse email de contact]
        </Typography>
        <Typography variant="body1">
          SIRET : [numéro de SIRET de l'entreprise]
        </Typography>
        <Typography variant="body1">
          Directeur de la publication : <strong>Manon Tullou</strong>
        </Typography>

        {/* Section 2 */}
        <Typography variant="h5" mt={4}>
          2. Hébergement du site
        </Typography>
        <Typography variant="body1" mt={2}>
          Le site est hébergé par :
        </Typography>
        <Typography variant="body1" mt={1}>
          [Nom de l’hébergeur]
        </Typography>
        <Typography variant="body1">
          Adresse : [adresse complète de l’hébergeur]
        </Typography>
        <Typography variant="body1">
          Téléphone : [numéro de téléphone de l’hébergeur]
        </Typography>
        <Typography variant="body1">
          Site web : [adresse du site de l’hébergeur]
        </Typography>

        {/* Section 3 */}
        <Typography variant="h5" mt={4}>
          3. Propriété intellectuelle
        </Typography>
        <Typography variant="body1" mt={2}>
          L'intégralité du contenu du site www.latelierdemanon.com, incluant, de
          façon non limitative, les graphismes, images, textes, vidéos,
          animations, sons, logos, gifs et icônes ainsi que leur mise en forme
          sont la propriété exclusive de L'Atelier de Manon, à l'exception des
          marques, logos ou contenus appartenant à d'autres sociétés partenaires
          ou auteurs. Toute reproduction, distribution, modification,
          adaptation, retransmission ou publication, même partielle, de ces
          différents éléments est strictement interdite sans l'accord préalable
          par écrit de L'Atelier de Manon.
        </Typography>

        {/* Section 4 */}
        <Typography variant="h5" mt={4}>
          4. Responsabilité
        </Typography>
        <Typography variant="body1" mt={2}>
          L'Atelier de Manon s'efforce d’assurer au mieux l'exactitude et la
          mise à jour des informations diffusées sur le site. Toutefois, des
          erreurs ou omissions peuvent se produire, et l’utilisateur est donc
          invité à vérifier l'exactitude des informations auprès de L'Atelier de
          Manon. L'Atelier de Manon ne pourra être tenue responsable d'éventuels
          dommages directs ou indirects résultant de l’accès ou de l’utilisation
          de son site.
        </Typography>

        {/* Section 5 */}
        <Typography variant="h5" mt={4}>
          5. Protection des données personnelles
        </Typography>
        <Typography variant="body1" mt={2}>
          Les informations collectées via le site www.latelierdemanon.com sont
          destinées à L'Atelier de Manon. Conformément à la loi Informatique et
          Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la
          Protection des Données (RGPD), vous disposez d’un droit d’accès, de
          rectification, d’effacement, de limitation du traitement, d’opposition
          et de portabilité de vos données personnelles en effectuant votre
          demande via l’adresse email suivante : [adresse email de contact].
        </Typography>

        {/* Section 6 */}
        <Typography variant="h5" mt={4}>
          6. Cookies
        </Typography>
        <Typography variant="body1" mt={2}>
          Le site www.latelierdemanon.com utilise des cookies pour améliorer
          l'expérience utilisateur et collecter des statistiques de visites.
          L’utilisateur est informé de cette utilisation et a la possibilité de
          refuser les cookies en modifiant les paramètres de son navigateur.
        </Typography>

        {/* Section 7 */}
        <Typography variant="h5" mt={4}>
          7. Loi applicable
        </Typography>
        <Typography variant="body1" mt={2}>
          Les présentes mentions légales sont régies par la loi française. En
          cas de litige, et à défaut de résolution amiable, les tribunaux
          français seront les seuls compétents pour juger de ce litige.
        </Typography>

        {/* Dernière mise à jour */}
        <Typography variant="body2" mt={4}>
          Dernière mise à jour : 10 décembre 2024
        </Typography>
      </Stack>
    </Container>
  );
}

export default LegalMentions;
