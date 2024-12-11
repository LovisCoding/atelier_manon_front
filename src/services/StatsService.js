import axios from "axios";

export const getAverageRevenuePerOrder = async () => {
    const data = await axios.get(`/api/admin/produit/get-stats-vente-moyen-commande`);
    if (data.data) return data.data;
	return null;
};

export const getGiftCardOrdersPercentage = async () => {
    const data = await axios.get(`/api/admin/produit/get-stats-proportion-cadeau`);
    if (data.data) return data.data;
	return null;
};

export const getPercentageCustomProducts = async () => {
    const data = await axios.get(`/api/admin/produit/get-stats-proportion-gravure`);
    if (data.data) return data.data;
	return null;
};

export const getSalesProportionByCategory = async () => {
    const data = await axios.get(`/api/admin/produit/get-stats-proportion-categorie`);
    if (data.data) return data.data;
	return null;
};

export const getRevenueSalesMonthData = async () => {
    const data = await axios.get(`/api/admin/produit/get-stats-year-ca`);
    if (data.data) return data.data;
	return null;
};

export const getSaleProductProportion = async () => {
    const data = await axios.get(`/api/admin/produit/get-stats-proportion-vente`);
    if (data.data) return data.data;
	return null;
};


