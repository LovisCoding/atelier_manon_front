import React, { useEffect, useState } from 'react';
import { Typography, Box, Stack, Button } from '@mui/material';
import { RiSave2Fill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
import SidebarMenu from '../SidebarMenu';
import ProductDetailsForm from './ProductDetailsForm';
import ImagesSection from './ImagesSection';
import PierresSection from './PierresSection';
import SeparatorsSection from './SeparatorsSection';
import { deleteProduct, getProduct, updateProduct } from '../../../services/ProductService';
import { getAllCategories } from '../../../services/CategorieService';
import { getPierres } from '../../../services/PierreService';
import { getMateriaux } from '../../../services/Materiau';
import {getPieProd, updatePieProd} from "../../../services/PieProdService.js";
import {getMatProd, updateMatProd} from "../../../services/MatProdService.js";
import FilsSection from "./FilsSection.jsx";
import {getFilsById} from "../../../services/FilProdServices.js";

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
  const [filsSection, setFilsSection] = useState([])
  const [selectedFils, setSelectedFils] = useState([])
  const [valueLib, setValueLib] = useState('');
  const [valueDesc, setValueDesc] = useState('');
  const [valuePrix, setValuePrix] = useState(0);
  const [engraving, setEngraving] = useState(false);
  const [tempsRea, setTempsRea] = useState(0);


  const [images, setImages] = useState([]);


  // Load data
  useEffect(() => {
    getAllCategories().then(setCategories);
    getPierres().then(setPierres);
    getProduct(id).then((data) => {
      setValueLib(data.libProd);
      setValueDesc(data.descriptionProd);
      setValuePrix(data.prix);
      setEngraving(data.estGravable);
      setSelectedCategory(data.idCateg);
      setTempsRea(data.tempsRea);
      console.log(data)
    });
	getMateriaux().then(setSeparators);
    getPieProd(id).then((data => {
      const tableauObjets = data.map(item => ({ libPierre: item }));
      setSelectedPierres(tableauObjets)
    }));
    getMatProd(id).then((data)=> {
      const tableauObjets = data.map(item => ({ libMateriau: item }));
      setSelectedSeparators(tableauObjets)
    });

    getFilsById(id).then((data) => {
      const tableauObjets = data.map(item => ({ libCouleur: item }));
      setSelectedFils(tableauObjets)
    });
  }, [id]);


  // Delete product
  const handleDelete = () => {
    deleteProduct(id).then(() => navigate('/admin/products'));
  };
  const handleUpdate = () => {
    const product = {
      idProd: id,
      libProd: valueLib,
      descriptionProd: valueDesc,
      prix: valuePrix,
      estGravable: engraving,
      tempsRea,
      idCateg: selectedCategory,
    }

    try {
      // Créez un tableau de promesses
      const promises = [
        updateProduct(product).then(() => console.log(product)),
        updatePieProd(product.idProd, selectedPierres.map(item => item.libPierre)),
        updateMatProd(product.idProd, selectedSeparators.map(item => item.libMateriau))
      ];

      // Attendez que toutes les promesses soient résolues
      Promise.all(promises)
          .then(() => {
            navigate('/admin/products'); // Navigation après que toutes les promesses sont terminées
          })
          .catch(error => {
            console.log(error); // Capture les erreurs éventuelles
          });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SidebarMenu>
      <Box display="flex" justifyContent="center" width="100%">
        <Stack maxWidth="600px" spacing={3}>
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
          <ImagesSection images={images} setImages={setImages} id={id} />
          <PierresSection pierres={pierres} selectedPierres={selectedPierres} setSelectedPierres={setSelectedPierres} />
          <SeparatorsSection separateurs={separators} selectedSeparators={selectedSeparators} setSelectedSeparateurs={setSelectedSeparators} />
          <FilsSection filsSection={filsSection} setFilsSection={setFilsSection} selectedFils={selectedFils} setSelectedFils={setSelectedFils} id={id}/>
          <Stack direction="row" justifyContent="space-between">
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
  );
};

export default Produit;