import React from 'react';
import { Box, colors, Container, Grid2, Stack, Typography } from '@mui/material';
import theme from '../theme/theme';
import ImageSlider from '../components/ImageSlider';
import { TextPresentation } from '../components/TextPresentation';

let txt2 = `Avant de lancer L'Atelier de Manon, j'ai eu mille vies ! J'ai été danseuse pro, animatrice, chorégraphe, responsable d'animation, vendeuse, modèle photo, et même banquière (oui, oui, promis !). J’ai eu la chance de voyager aux quatre coins du monde, de déménager presque 30 fois en 15 ans, et d’accumuler des histoires incroyables – parfaites pour m’inspirer dans la création de mes bijoux. Ah, et j'ai aussi deux fidèles "assistantes" à poils doux, Falafel et Socca, mes chats adorés, qui adorent s’incruster dans l’atelier.`;
let txt1 = `Salut ! Moi, c'est Manon, créatrice de bijoux et d'un univers un peu fou où chaque pièce raconte une histoire. Originaire du Sud-Est de la France, j’ai posé mes valises (et mes outils !) à Nice, où je continue à jongler entre mes créations, mes voyages, et une vie bien remplie.`

let txt3 = `Je suis heureuse de pouvoir échanger avec vous quelle que soit votre langue ou votre culture. N'hésitez pas, contactez moi par mail ou sur les réseaux sociaux pour toute question ou demande particulière. `;
let txt4 = `J'ai mis en place des options de navigation adaptées, permettant aux malvoyants d’explorer mes collections en toute autonomie. Rendez vous sur la page dédiée.`;

let txt5 = `Mon travail est guidé par l'authenticité : chaque bijou que je crée est façonné avec soin, fidèle aux traditions artisanales. L'inclusion est essentielle à mes yeux ; mon site est conçu pour être accessible à tous, afin que chacun puisse explorer mon univers en toute simplicité.
			Je m’engage aussi pour l’environnement, en choisissant des matériaux durables et des pratiques écoresponsables. La créativité est enfin le moteur de chacune de mes pièces, que je souhaite uniques, inspirées, et porteuses d’une histoire propre.`;


function About() {


	return (
		<Container>
			<Box sx={{ maxWidth: '1200px', margin: 'auto', p: {
				xs: 3
			} }}>
				<Presentation />
				<MonSavoirFaire />
				<Value />
				<Typography sx={{ marginBottom: '1rem', color: colors.grey[800] }} variant='h3' align='center'>Où me retrouver ?</Typography>
				<ImageSlider />
			</Box>
		</Container>

	);
}

export default About;

function Value() {
	return (
		<Box marginBottom={5}>
			<Grid2 container spacing={4} marginBottom={5}>
				<Grid2 item size={{
					sm: 12,
					md: 6
				}}>
					<TextPresentation image={"https://via.placeholder.com/400x400"} titleType={"h5"} title="Assistance multilingues" description={txt3} />
				</Grid2>
				<Grid2 item size={{
					sm: 12,
					md: 6
				}}>
					<TextPresentation image={"https://via.placeholder.com/400x400"} titleType={"h5"} title="Accessibilité pour tous" description={txt4} />
				</Grid2>
			</Grid2>
			<TextPresentation reverse sx={{ marginBottom: '2rem' }} ratioImage={'8/9'} title="Mes valeurs" description={txt5} />
		</Box>

	)
}

function Presentation() {
	return (
		<Box marginBottom={5}>
			<Typography align='center' variant="h1" sx={{ marginBottom: '3rem' }}>
				À propos
			</Typography>
			<TextPresentation imageHeight={'17rem'} sx={{ marginBottom: '2rem' }} title="Ma présentation" description={txt1} />
			<TextPresentation reverse description={txt2} />
		</Box>
	)
}

function MonSavoirFaire() {
	return (
		<Box marginBottom={5}>
			<Typography align='center' variant="h2" sx={{ marginBottom: '1rem', color: colors.grey[800] }}>
				Mon savoir-faire
			</Typography>
			<Grid2 marginBottom={'4rem'} container spacing={4}>
				<Card title={"Une passion depuis petite"} />
				<Card title={"Une création fait main"} />
				<Card title={"Des produits Made In Europe"} />
			</Grid2>
		</Box>

	)
}

function Card({ image, title }) {
	return (
		<Grid2 size={{
			xs: 12,
			sm: 6,
			md: 4
		}} item>
			<Box

				sx={{
					width: '100%',
					height: '300px',
					backgroundColor: '#f4f4f4',
					border: '1px dashed #ccc',
				}}
			></Box>
			<Typography variant='h6' color={theme.palette.grey[800]} align='center'>
				{title}
			</Typography>
		</Grid2>
	)
}