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
import { deleteProduct, getProduct } from '../../../services/ProductService';
import { getAllCategories } from '../../../services/CategorieService';
import { getPierres } from '../../../services/PierreService';
import { getMateriaux } from '../../../services/Materiau';

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
  const [valueLib, setValueLib] = useState('');
  const [valueDesc, setValueDesc] = useState('');
  const [valuePrix, setValuePrix] = useState(0);
  const [engraving, setEngraving] = useState(false);

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
    });
	getMateriaux().then(setSeparators);
  }, [id]);

  // Delete product
  const handleDelete = () => {
    deleteProduct(id).then(() => navigate('/admin/products'));
  };

  return (
    <SidebarMenu>
      <Box display="flex" justifyContent="center">
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
          />
          <ImagesSection images={images} setImages={setImages} />
          <PierresSection pierres={pierres} selectedPierres={selectedPierres} setSelectedPierres={setSelectedPierres} />
          <SeparatorsSection separateurs={separators} selectedSepareteurs={selectedSeparators} setSelectedSeparateurs={setSelectedSeparators} />
          <Stack direction="row" justifyContent="space-between">
            <Button variant="contained" color="info" startIcon={<RiSave2Fill />}>
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
