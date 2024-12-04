import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import App from '../src/App';
import Navbar from '../src/components/Navbar/Navbar.jsx';
import Footer from '../src/components/Footer.jsx';

// Utilisation de React.lazy pour le lazy loading
const Test = React.lazy(() => import('../src/pages/Test/Test'));
const Connection = React.lazy(() => import('../src/pages/Connection.jsx'));
const Register = React.lazy(() => import('../src/pages/Register.jsx'));
const ForgotPassword = React.lazy(() => import('../src/pages/ForgotPassword.jsx'));
const EmailSent = React.lazy(() => import('../src/pages/EmailSent.jsx'));
const FAQ = React.lazy(() => import('../src/pages/faq/Faq'));
const About = React.lazy(() => import('../src/pages/About'));
const Home = React.lazy(() => import('../src/pages/home/Home'));
const Contact = React.lazy(() => import('../src/pages/Contact.jsx'));
const NotFound = React.lazy(() => import('../src/pages/NotFound'));
const Admin = React.lazy(() => import('../src/pages/admin/Admin'));
const Orders = React.lazy(() => import('../src/pages/admin/Order/Orders.jsx'));
const CodesPromo = React.lazy(() => import('../src/pages/admin/CodesPromo/CodesPromo.jsx'));
const CGV = React.lazy(() => import('../src/pages/CGV/CGV.jsx'));
const CodePromo = React.lazy(() => import('../src/pages/admin/CodesPromo/CodePromo.jsx'));
const Cart = React.lazy(() => import('../src/pages/Cart.jsx'));
const Command = React.lazy(() => import('../src/pages/Command.jsx'));
const FoireAuxQuestions = React.lazy(() => import('../src/pages/admin/FAQ/FAQS.jsx'));
const FAQDetails = React.lazy(() => import('../src/pages/admin/FAQ/FAQ.jsx'));
const Produits = React.lazy(() => import('../src/pages/admin/Produits/Produits.jsx'));
const Produit = React.lazy(() => import('../src/pages/admin/Produits/Produit.jsx'));
const Articles = React.lazy(() => import('../src/pages/admin/Articles/Articles.jsx'));
const Article = React.lazy(() => import('../src/pages/admin/Articles/Article.jsx'));
const Product = React.lazy(() => import('../src/pages/Product/Product.jsx'));
const OrderDetails = React.lazy(() => import('../src/pages/admin/Order/OrderDetail.jsx'));
const Newsletter = React.lazy(() => import('../src/pages/admin/Newsletter/Newsletter.jsx'));

const AppRoutes = () => {
    const location = useLocation();
    return (
        <>
            {/* Navbar et Footer pour les routes hors /admin */}
            {(!location.pathname.includes('/admin')) ? <Navbar /> : null}
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* Routes avec le Footer */}
                    <Route path="/" element={<App />} />
                    <Route path="/test/:id" element={<Test />} />
                    <Route path="/login" element={<Connection />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/email-sent" element={<EmailSent />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cgv" element={<CGV />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/command/:id" element={<Command />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/admin/orders" element={<Orders />} />
                    <Route path="/admin/order/:id" element={<OrderDetails />} />
                    {/* Routes sans le Footer */}
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/faq" element={<FoireAuxQuestions />} />
                    <Route path="/admin/faq/:id" element={<FAQDetails />} />
                    <Route path="/admin/codesPromo" element={<CodesPromo />} />
                    <Route path="/admin/codesPromo/:id" element={<CodePromo />} />
                    <Route path="/admin/blog" element={<Articles />} />
                    <Route path="/admin/blog/:id" element={<Article />} />
                    <Route path="/admin/newsletter" element={<Newsletter />} />
                    <Route path="/admin/products" element={<Produits />} />
                    <Route path="/admin/products/:id" element={<Produit />} />
                    {/* Page introuvable */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            {/* Footer ajouté seulement pour les pages hors /admin */}
            {(!location.pathname.includes('/admin')) ? <Footer /> : null}
        </>
    );
};

export default AppRoutes;
