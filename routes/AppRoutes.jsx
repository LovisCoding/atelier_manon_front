import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Navbar from '../src/components/Navbar/Navbar.jsx';
import Footer from '../src/components/Footer.jsx';
import ConfirmAccount from '../src/pages/ConfirmAccount.jsx';

// Lazy loading des pages
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
const Cart = React.lazy(() => import('../src/pages/Cart.jsx'));
const Command = React.lazy(() => import('../src/pages/Command.jsx'));
const Product = React.lazy(() => import('../src/pages/Product/Product.jsx'));
const CGV = React.lazy(() => import('../src/pages/CGV/CGV.jsx'));
const Jewelry = React.lazy(() => import('../src/pages/Jewelry/Jewelry.jsx'));
const Necklaces = React.lazy(() => import('../src/pages/Jewelry/Necklaces.jsx'));
const Bangles = React.lazy(() => import('../src/pages/Jewelry/Bangles.jsx'));

// Lazy loading pour la partie administration
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
const Profil = React.lazy(() => import("../src/pages/Profil.jsx"));

const AppRoutes = () => {
    const location = useLocation();

    const isAdminRoute = location.pathname.includes('/admin');

    return (
        <>
            {!isAdminRoute && <Navbar />}
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* Routes publiques avec footer */}
                    <Route path="/" element={<Home />} />
                    <Route path="/test/:id" element={<Test />} />
                    <Route path="/login" element={<Connection />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/email-sent" element={<EmailSent />} />
                    <Route path="email/confirmAccount/:token" element={<ConfirmAccount />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cgv" element={<CGV />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/command/:id" element={<Command />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/jewelry" element={<Jewelry />} />
                    <Route path="/jewelry/necklaces" element={<Necklaces />} />
                    <Route path="/jewelry/bangles" element={<Bangles />} />
                    <Route path="/profil/" element={<Profil />} />

                    {/* Routes administratives sans footer */}
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/orders" element={<Orders />} />
                    <Route path="/admin/order/:id" element={<OrderDetails />} />
                    <Route path="/admin/codesPromo" element={<CodesPromo />} />
                    <Route path="/admin/codesPromo/:id" element={<CodePromo />} />
                    <Route path="/admin/faq" element={<FoireAuxQuestions />} />
                    <Route path="/admin/faq/:id" element={<FAQDetails />} />
                    <Route path="/admin/products" element={<Produits />} />
                    <Route path="/admin/products/:id" element={<Produit />} />
                    <Route path="/admin/blog" element={<Articles />} />
                    <Route path="/admin/blog/:id" element={<Article />} />
                    <Route path="/admin/newsletter" element={<Newsletter />} />

                    {/* Route de fallback */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            {!isAdminRoute && <Footer />}
        </>
    );
};

export default AppRoutes;