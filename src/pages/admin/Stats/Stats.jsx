import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, CircularProgress, Grid2 } from "@mui/material";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import SidebarMenu from "../SidebarMenu";
import { getAverageRevenuePerOrder, getGiftCardOrdersPercentage, getPercentageCustomProducts, getSalesProportionByCategory, getRevenueSalesMonthData, getSaleProductProportion } from "../../../services/StatsService";

// Enregistrement des composants Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function Stats() {
	const [averageRevenue, setAverageRevenue] = useState(null);
	const [giftCardPercentage, setGiftCardPercentage] = useState(null);
	const [percentageCustomProducts, setPercentageCustomProducts] = useState(null);
	const [categoryProportion, setCategoryProportion] = useState(null);
	const [revenueSalesMonth, setRevenueSalesMonth] = useState(null);
	const [saleProductProportion, setSaleProductProportion] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadStats = async () => {
			const data = await getAverageRevenuePerOrder();

			if (data) setAverageRevenue(data);
			else setAverageRevenue(0);
		}
		loadStats();
	}, []);

	useEffect(() => {
		const loadStats = async () => {
			const data = await getGiftCardOrdersPercentage();
			if (data) setGiftCardPercentage(data);
			else setGiftCardPercentage(0);
		}
		loadStats();
	}, []);

	useEffect(() => {
		const loadStats = async () => {
			const data = await getPercentageCustomProducts();
			if (data) setPercentageCustomProducts(data);
			else setPercentageCustomProducts(0)
		}
		loadStats();
	}, []);

	useEffect(() => {
		const loadStats = async () => {
			const data = await getSalesProportionByCategory();
			if (data) setCategoryProportion(data);
			else setCategoryProportion(0)
		}
		loadStats();
	}, []);


	useEffect(() => {
		const loadStats = async () => {
			const data = await getRevenueSalesMonthData();
			if (data) setRevenueSalesMonth(data);
			else setRevenueSalesMonth(0)
		}
		loadStats();
	}, []);

	useEffect(() => {
		const loadStats = async () => {
			const data = await getSaleProductProportion();
			if (data) setSaleProductProportion(data);
			else setSaleProductProportion(0)
			setLoading(false)
		}
		loadStats();
	}, []);

	if (loading) {
		return (
			<Stack direction="row" justifyContent="center" sx={{ mt: 10 }}>
				<CircularProgress />
			</Stack>
		);
	}


	// Préparation des données pour les graphiques
	const categoryProportionData = {
		labels: categoryProportion ? Object.keys(categoryProportion) : [],
		datasets: [
			{
				label: "Proportion des ventes par catégorie",
				data: categoryProportion ? Object.values(categoryProportion) : [],
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
				hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
			}
		]
	};

	const giftCardData = {
		labels: ["Avec carte cadeau", "Sans carte cadeau"],
		datasets: [
			{
				data: [giftCardPercentage, 100 - giftCardPercentage],
				backgroundColor: ["#FF6384", "#36A2EB"],
				hoverBackgroundColor: ["#FF6384", "#36A2EB"]
			}
		]
	};

	const customProductData = {
		labels: ["Produits avec gravure", "Produits standards"],
		datasets: [
			{
				data: [percentageCustomProducts, 100 - percentageCustomProducts],
				backgroundColor: ["#FFCE56", "#4BC0C0"],
				hoverBackgroundColor: ["#FFCE56", "#4BC0C0"]
			}
		]
	};

	const averageRevenueData = {
		labels: ["Revenu moyen"],
		datasets: [
			{
				label: "Revenu moyen par commande (€)",
				data: [averageRevenue],
				backgroundColor: ["#9966FF"],
				hoverBackgroundColor: ["#7A56E3"]
			}
		]
	};


	const revenueSalesMonthData = {
		labels: revenueSalesMonth ? Object.keys(revenueSalesMonth ) : [],
		datasets: [
			{
				label: "Revenu Mensuel (€)",
				data: revenueSalesMonth ? Object.values(revenueSalesMonth) : [],
				backgroundColor: "#36A2EB",
				hoverBackgroundColor: "#1E90FF",
				borderColor: "#1E90FF",
				borderWidth: 1
			}
		]
	};

	const revenueSalesMonthDataOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: false // Cache la légende car une seule barre
			},
			tooltip: {
				callbacks: {
					label: function (tooltipItem) {
						return `Revenu : ${tooltipItem.raw} €`;
					}
				}
			}
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Mois",
					color: "#555",
					font: {
						size: 14,
						weight: "bold"
					}
				}
			},
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: "Revenu (€)",
					color: "#555",
					font: {
						size: 14,
						weight: "bold"
					}
				}
			}
		}
	};


	const getColorForProduct = (product) => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const months = Object.keys(saleProductProportion); // Ex: ["2024-12", "2024-11"]
	const products = [...new Set(Object.values(saleProductProportion).flatMap(month => Object.keys(month)))]; // Ex: ["Kelyan", "Yvan", "Sandrine"]

	const saleProductProportionData = {
		labels: months,
		datasets: products.map((product) => {
			return {
				label: product,
				data: months.map((month) => {
					const totalSales = Object.values(saleProductProportion[month]).reduce((acc, val) => acc + val, 0);
					const productSales = saleProductProportion[month][product] || 0;
					return totalSales ? (productSales / totalSales) * 100 : 0;
				}),
				backgroundColor: getColorForProduct(product), // Fonction pour colorer chaque produit différemment
			};
		})
	};



	const saleProductProportionDataOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "top"
			},
			tooltip: {
				callbacks: {
					label: function (tooltipItem) {
						return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)}%`;
					}
				}
			}
		},
		scales: {
			x: {
				stacked: true,
				title: {
					display: true,
					text: "Mois",
					color: "#555",
					font: {
						size: 14,
						weight: "bold"
					}
				}
			},
			y: {
				stacked: true,
				beginAtZero: true,
				max: 100,
				title: {
					display: true,
					text: "Pourcentage",
					color: "#555",
					font: {
						size: 14,
						weight: "bold"
					}
				}
			}
		}
	};


	return (
		<Box display="flex" flexWrap="wrap" justifyContent="center">
			<SidebarMenu />
			<Stack sx={{ mt: 5 }} spacing={5} >
				<Typography variant="h4" align="center">Statistiques</Typography>
				<Grid2 container spacing={5} justifyContent="center" >
					<Grid2 item maxWidth={400}>
						<Typography variant="h6" align="center">Proportion par Catégorie</Typography>
						<Pie data={categoryProportionData} />
					</Grid2>
					<Grid2 item maxWidth={400}>
						<Typography variant="h6" align="center">Commandes avec Cartes Cadeaux</Typography>
						<Doughnut data={giftCardData} />
					</Grid2>
				</Grid2>
				<Grid2 container spacing={5} justifyContent="center" >
					<Grid2 item maxWidth={400}>
						<Typography variant="h6" align="center">Produits Personnalisés</Typography>
						<Doughnut data={customProductData} />
					</Grid2>
					<Grid2 item maxWidth={400}>
						<Typography variant="h6" align="center">Revenu Moyen par Commande</Typography>
						<Bar data={averageRevenueData} options={{ indexAxis: "y" }} />
					</Grid2>
				</Grid2>
				<Grid2 container spacing={5} justifyContent="center" >
					<Grid2 item maxWidth={400}>
						<Typography variant="h6" align="center" gutterBottom>Revenu Mensuel</Typography>
						<Bar data={revenueSalesMonthData} options={revenueSalesMonthDataOptions} />
					</Grid2>
					<Grid2 item maxWidth={400}>
						<Typography variant="h6" align="center" gutterBottom>Répartition des Ventes par Produit en Pourcentage</Typography>
						<Bar data={saleProductProportionData} options={saleProductProportionDataOptions} />
					</Grid2>
				</Grid2>
			</Stack>
		</Box>
	);
}
