import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { useAuth } from '../src/utils/AuthContext.jsx';

const NotFound = React.lazy(() => import('../src/pages/NotFound'));

const Admin = React.lazy(() => import('../src/pages/admin/Admin'));
const Orders = React.lazy(() => import('../src/pages/admin/Order/Orders.jsx'));
const OrderDetails = React.lazy(() => import('../src/pages/admin/Order/OrderDetail.jsx'));
const CodesPromo = React.lazy(() => import('../src/pages/admin/CodesPromo/CodesPromo.jsx'));
const CodePromo = React.lazy(() => import('../src/pages/admin/CodesPromo/CodePromo.jsx'));
const FoireAuxQuestions = React.lazy(() => import('../src/pages/admin/FAQ/FAQS.jsx'));
const FAQDetails = React.lazy(() => import('../src/pages/admin/FAQ/FAQ.jsx'));
const Produits = React.lazy(() => import('../src/pages/admin/Produits/Produits.jsx'));
const Produit = React.lazy(() => import('../src/pages/admin/Produits/Produit.jsx'));
const Articles = React.lazy(() => import('../src/pages/admin/Articles/Articles.jsx'));
const Article = React.lazy(() => import('../src/pages/admin/Articles/Article.jsx'));
const Newsletter = React.lazy(() => import('../src/pages/admin/Newsletter/Newsletter.jsx'));
const Personalization = React.lazy(() => import("../src/pages/admin/Personalization/Personalization.jsx"));
const Accueil = React.lazy(() => import("../src/pages/admin/home/Accueil.jsx"));
const AdminAvis = React.lazy(() => import("../src/pages/admin/Avis/Avis.jsx"));
const AdminStats = React.lazy(() => import("../src/pages/admin/Stats/Stats.jsx"));

const AdminRouter = () => {

    const navigate = useNavigate();
    const {isLogged,details} = useAuth();

    useEffect(() => {
        if (!isLogged || !details.isAdmin) navigate('/');
    }, []);

    return (
        <Routes>

            {/* Admin Routes without Footer */}
            <Route index element={<Admin />} />

            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/codesPromo" element={<CodesPromo />} />
            <Route path="/codesPromo/:id" element={<CodePromo />} />
            <Route path="/faq" element={<FoireAuxQuestions />} />
            <Route path="/faq/:id" element={<FAQDetails />} />
            <Route path="/products" element={<Produits />} />
            <Route path="/products/:id" element={<Produit />} />
            <Route path="/blog" element={<Articles />} />
            <Route path="/blog/:id" element={<Article />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/personalization" element={<Personalization />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/avis" element={<AdminAvis />} />
            <Route path="/stats" element={<AdminStats />} />

            <Route path="*" element={<NotFound />} />

        </Routes>
    );
};

export default AdminRouter;