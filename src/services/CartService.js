
import axios from "axios";

export const getCartProducts = async (idUser) => {
    const data = await axios
        .get('/api/client/panier/get-panier-client', {params: {idCli:idUser}});
    if (!data.data) return null;
    data.data.forEach(prod => {
        prod.idProd = parseInt(prod.idProd);
        prod.idCli = parseInt(prod.idCli);
        prod.qa = parseInt(prod.qa);
        prod.produit.prix = parseFloat(prod.produit.prix);
    });
    return data.data;
}

export const addProductPanier = async (product) => {
    try {
        const data = await axios
            .post('/api/client/panier/add-product-panier' , {
                idProd : product.idProd,
                idCli : product.idCli,
                gravure : product.gravure,
                variante : product.variante
            }, { headers: { 'Content-Type':'application/json' } });
        console.log("Response :",data.data)
    } catch (err) {
        console.error("Une erreur est survenue : "+err);
        return null;
    }
}

export const reduceProductPanier = async (product) => {
    try {
        const data = await axios
            .post('/api/client/panier/reduce-product-panier' , {
                idProd : product.idProd,
                idCli : product.idCli,
                gravure : product.gravure,
                variante : product.variante
            }, { headers: { 'Content-Type':'application/json' } });
        console.log("Response :",data.data)
    } catch (err) {
        console.error("Une erreur est survenue : "+err);
        return null;
    }
}

export const deleteProductPanier = async (product) => {
    try {
      const response = await axios
            .delete('/api/client/panier/delete-product-panier', {
                headers: { 'Content-Type': 'application/json' },
                data: {
                    idProd: product.idProd,
                    idCli: product.idCli,
                    gravure: product.gravure,
                    variante: product.variante
                }
            });
      console.log("Response :", response.data);
    } catch (err) {
      console.error("Une erreur est survenue : ", err);
    }
  };

export const addCommande = async (idCli, commentary, isGift, giftCommentary) => {
    try {
        const data = await axios
            .post('/api/client/commande/add-commande' , {
                idCli : idCli,
                comm : commentary ,
                estCadeau : isGift,
                carte : giftCommentary
            }, { headers: { 'Content-Type':'application/json' } });
        return data.data;
    } catch (err) {
        console.error("Une erreur est survenue : "+err);
        return null;
    }
}


[
    {
      "idProd": 1,
      "idCli": 2,
      "gravure": "Love",
      "variante": "Taille M",
      "qa": 1,
      "produit": {
        "idProd": "1",
        "libProd": "Kelyan",
        "descriptionProd": "",
        "prix": 15,
        "estGravable": true,
        "tabPhoto": [
          "CollierKelyan1.webp"
        ],
        "tempsRea": "2",
        "idCateg": "1"
      }
    },
    {
      "idProd": 3,
      "idCli": 2,
      "gravure": "gravure",
      "variante": "variante2",
      "qa": 2,
      "produit": {
        "idProd": "3",
        "libProd": "Sandrine",
        "descriptionProd": "Tous les éléments sont personnalisables : couleur des pierres, du métal, et la taille",
        "prix": 8,
        "estGravable": true,
        "tabPhoto": [
          "BraceletSandrine1.webp"
        ],
        "tempsRea": "3",
        "idCateg": "2"
      }
    },
    {
      "idProd": 2,
      "idCli": 2,
      "gravure": "",
      "variante": "",
      "qa": 80,
      "produit": {
        "idProd": "2",
        "libProd": "Yvan",
        "descriptionProd": "Tous les éléments sont personnalisables : couleur des pierres, du métal, la taille, et le pendentif",
        "prix": 23,
        "estGravable": true,
        "tabPhoto": [
          "CollierYvan1.webp"
        ],
        "tempsRea": "4",
        "idCateg": "1"
      }
    },
    {
      "idProd": 2,
      "idCli": 2,
      "gravure": "gravure",
      "variante": "variante2",
      "qa": 47,
      "produit": {
        "idProd": "2",
        "libProd": "Yvan",
        "descriptionProd": "Tous les éléments sont personnalisables : couleur des pierres, du métal, la taille, et le pendentif",
        "prix": 23,
        "estGravable": true,
        "tabPhoto": [
          "CollierYvan1.webp"
        ],
        "tempsRea": "4",
        "idCateg": "1"
      }
    }
]


