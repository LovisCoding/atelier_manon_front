import React, { useEffect, useState } from 'react';
import {Typography, Box, Stack, Button, Snackbar, CircularProgress} from '@mui/material';
import { RiSave2Fill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
import SidebarMenu from '../SidebarMenu';
import ProductDetailsForm from './ProductDetailsForm';
import ImagesSection from './ImagesSection';
import PierresSection from './PierresSection';
import SeparatorsSection from './SeparatorsSection';
import {
  addImage, deleteImage,
  deleteProduct,
  getProduct,
  getProductImage,
  reorderImages,
  updateProduct
} from '../../../services/ProductService';
import { getCategories } from '../../../services/CategorieService';
import { getPierres } from '../../../services/PierreService';
import { getMateriaux } from '../../../services/Materiau';
import { getPieProd, updatePieProd } from "../../../services/PieProdService.js";
import { getMatProd, updateMatProd } from "../../../services/MatProdService.js";
import FilsSection from "./FilsSection.jsx";
import { getFilsById, updateFilsProd } from "../../../services/FilProdServices.js";
import { getAllFils } from "../../../services/PersonalizationService.js";


const Produit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // States
  const [categories, setCategories] = useState([]);
  const [pierres, setPierres] = useState([]);
  const [separators, setSeparators] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPierres, setSelectedPierres] = useState([]);
  const [selectedSeparators, setSelectedSeparators] = useState([]);
  const [filsSection, setFilsSection] = useState([]);
  const [selectedFils, setSelectedFils] = useState([]);
  const [valueLib, setValueLib] = useState('');
  const [valueDesc, setValueDesc] = useState('');
  const [valuePrix, setValuePrix] = useState(0);
  const [engraving, setEngraving] = useState(false);
  const [tempsRea, setTempsRea] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [snOpenValue, setSnOpenValue] = useState(false);
  const [imagesAUpload,  setImagesAUpload] = useState([]);
  const [imageADelete, setImageADelete] = useState([]);


  console.log(imagesAUpload);

  // Load data
  useEffect(() => {
    setLoading(true); // Start loading

    // Fetch all data
    Promise.all([
      getCategories(),
      getPierres(),
        id !== "-1" ? getProduct(id) : '',
      getMateriaux(),
      getPieProd(id),
      getMatProd(id),
      getAllFils(),
      getFilsById(id)
    ])
        .then(([categoriesData, pierresData, productData, separatorsData, pieProdData, matProdData, filsData, filsByIdData]) => {
          // Set state with fetched data
          setCategories(categoriesData);
          setPierres(pierresData);
          setSeparators(separatorsData);

          if (id !== "-1") {
            setValueLib(productData.libProd);
            setValueDesc(productData.descriptionProd);
            setValuePrix(productData.prix);
            setEngraving(productData.estGravable);
            setSelectedCategory(productData.idCateg);
            setTempsRea(productData.tempsRea);
            const tmpImages = []
            console.log(getProductImage(productData.tabPhoto[0], 100,100))
            productData?.tabPhoto.forEach(image => {
             tmpImages.push({file:getProductImage(image, 100,100), libImage: image})

            });
            setImages(tmpImages);

          }

          const pieProdObjects = pieProdData.map(item => ({ libPierre: item }));
          setSelectedPierres(pieProdObjects);

          const matProdObjects = matProdData.map(item => ({ libMateriau: item }));
          setSelectedSeparators(matProdObjects);

          setFilsSection(filsData);

          const filsObjects = filsByIdData.map(item => ({ libCouleur: item }));
          setSelectedFils(filsObjects);
        })
        .catch(error => {
          console.error('Error loading data:', error);
        })
        .finally(() => {
          setLoading(false); // Stop loading after data is fetched
        });
  }, [id]);

  // Delete product
  const handleDelete = () => {
    deleteProduct(id).then(() => navigate('/admin/products'));
  };

  // Update product
  // Update product
  const handleUpdate = async () => {
    setLoading(true)
    const product = {
      idProd: Number(id),
      libProd: valueLib,
      descriptionProd: valueDesc,
      prix: valuePrix,
      estGravable: engraving,
      tempsRea,
      idCateg: selectedCategory,

    };

    const tmpMessage = [];
    if (product.libProd === '') tmpMessage.push('Libellé');
    if (product.descriptionProd === '') tmpMessage.push('Description');
    if (product.prix  <1 || product.prix >1000) tmpMessage.push('Prix entre 1 et 1000e');
    if (product.idCateg === '') tmpMessage.push('Catégorie');
    if (product.tempsRea < 1 || product.tempsRea > 100) tmpMessage.push('Temps réalisation entre 0 et 100 jours')

    if (tmpMessage.length > 0) {
      const s = tmpMessage.length > 1 ? 's' : '';
      setMessage(`Veuillez remplir le${s} champ${s} suivant${s} : ${tmpMessage.join(', ')}`);
      setSnOpenValue(true);
      setLoading(false);
      return;
    }

    try {
      // Update the product
      const productData = await updateProduct(product);
      if (productData?.status === 400) {
        setMessage(productData.response.data);
        setSnOpenValue(true);
        setLoading(false);
        return;
      }
      if (id === "-1") {
        product.idProd = productData;
      }


        for (const image of imagesAUpload) {
            let res = await addImage(product.idProd, image.file, image.libImage);
            if (res && res?.status !== 201 ) {
              setMessage(res.response.data);
              setSnOpenValue(true);

              const link = '/admin/products/'+product.idProd
              setTimeout(function(){
                navigate(id === "-1" ? link : 0);
              }, 3000);

              return
            }

        }

      console.log(imageADelete);
      imageADelete?.filter(el => !el.file.includes('base64')).forEach( (image) => {
        deleteImage(id, image.libImage)
      })


      console.log(images)
      // Update associated data concurrently
      await Promise.all([
        updatePieProd(product.idProd, selectedPierres.map(item => item.libPierre)),
        updateMatProd(product.idProd, selectedSeparators.map(item => item.libMateriau)),
        updateFilsProd(product.idProd, selectedFils.map(item => item.libCouleur)),
        reorderImages(product.idProd, images.map((el) => el.libImage)),
      ]);

      console.log('All associated data updated successfully');
      navigate('/admin/products');
    } catch (error) {
      setLoading(false)
      console.error('Error updating product or associated data:', error);
    }
  };


  return (
      <>
        {loading ? (
            <Box display="flex" justifyContent="center" mt={5} ><CircularProgress size={60} thickness={5} color="" /></Box> // Display loader while loading data
        ) : (
            <SidebarMenu>
              <Box display="flex" justifyContent="center" width="100%" mb={5}>
                <Stack maxWidth="600px" spacing={2}>
                  <Typography variant="h4">Détail du produit</Typography>
                  <ProductDetailsForm
                      valueLib={valueLib}
                      setValueLib={setValueLib}
                      valueDesc={valueDesc}
                      setValueDesc={setValueDesc}
                      valuePrix={valuePrix}
                      setValuePrix={setValuePrix}
                      engraving={engraving}
                      setEngraving={setEngraving}
                      categories={categories}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      tempsRea={tempsRea}
                      setTempsRea={setTempsRea}
                  />
                  <ImagesSection images={images} setImages={setImages} id={id} setImagesAUpload={setImagesAUpload} imagesAUpload={imagesAUpload} imageADelete={imageADelete} setImageADelete={setImageADelete} />
                  <PierresSection pierres={pierres} selectedPierres={selectedPierres} setSelectedPierres={setSelectedPierres} setPierres={setPierres}/>
                  <SeparatorsSection separateurs={separators} selectedSeparators={selectedSeparators} setSelectedSeparateurs={setSelectedSeparators} />
                  <FilsSection fils={filsSection} selectedFils={selectedFils} setSelectedFils={setSelectedFils} id={id} />
                  <Stack direction="column" spacing={3}>
                    <Button variant="contained" color="info" startIcon={<RiSave2Fill />} onClick={handleUpdate}>
                      Enregistrer
                    </Button>
                    <Button variant="contained" color="error" startIcon={<MdDelete />} onClick={handleDelete}>
                      Supprimer
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </SidebarMenu>

        )}
        <Snackbar open={snOpenValue} autoHideDuration={6000} onClose={() => {setSnOpenValue(false)}} message={message} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}/>

      </>
  );
};

export default Produit;
