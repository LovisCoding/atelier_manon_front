import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Navbar from '../src/components/Navbar/Navbar.jsx';
import Footer from '../src/components/Footer.jsx';
import Loader from '../src/components/Loader.jsx';
import ConfirmAccount from '../src/pages/ConfirmAccount.jsx';
import Blog from '../src/pages/Blog.jsx';
import ClientArticle from '../src/pages/Article.jsx';

// Lazy loading des pages publiques

const Test = React.lazy(() => import('../src/pages/Test/Test'));
const Connection = React.lazy(() => import('../src/pages/Connection.jsx'));
const Register = React.lazy(() => import('../src/pages/Register.jsx'));
const ForgotPassword = React.lazy(() => import('../src/pages/forgot-password/ForgotPassword.jsx'));
const EmailSent = React.lazy(() => import('../src/pages/forgot-password/EmailSent.jsx'));
const ResetPassword = React.lazy(() => import('../src/pages/forgot-password/ResetPassword.jsx'));
const FAQ = React.lazy(() => import('../src/pages/faq/Faq'));
const About = React.lazy(() => import('../src/pages/About'));
const Home = React.lazy(() => import('../src/pages/home/Home'));
const EventBanner = React.lazy(() => import('../src/pages/home/EventBanner'));
const Contact = React.lazy(() => import('../src/pages/Contact.jsx'));
const NotFound = React.lazy(() => import('../src/pages/NotFound'));
const Cart = React.lazy(() => import('../src/pages/Cart.jsx'));
const Command = React.lazy(() => import('../src/pages/Command.jsx'));
const Product = React.lazy(() => import('../src/pages/Jewelry/Product.jsx'));
const CGV = React.lazy(() => import('../src/pages/CGV/CGV.jsx'));
const LegalMentions = React.lazy(() => import('../src/pages/Legal/LegalMentions.jsx'));
const Jewelry = React.lazy(() => import('../src/pages/Jewelry/Jewelry.jsx'));

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
const Personalization = React.lazy(() => import("../src/pages/admin/Personalization/Personalization.jsx"));
const Accueil = React.lazy(() => import("../src/pages/admin/home/Accueil.jsx"));
const AdminAvis = React.lazy(() => import("../src/pages/admin/Avis/Avis.jsx"));

const AppRoutes = () => {
    const location = useLocation();

    const isAdminRoute = location.pathname.includes('/admin');

    const homeRoute = location.pathname == '/';
    return (
        <>
            { homeRoute && <EventBanner /> }
            {/* Render Navbar only if not on an admin route */}
            { !isAdminRoute && <Navbar /> }

            {/* Suspense fallback replaced with Loader */}
            <Suspense fallback={<Loader message="Loading content..." />}>
                <Routes>
                    {/* Public Routes with Footer */}
                    <Route path="/" element={<Home />} />
                    <Route path="/test/:id" element={<Test />} />
                    <Route path="/login" element={<Connection />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/email-sent" element={<EmailSent />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="/email/confirmAccount/:token" element={<ConfirmAccount />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cgv" element={<CGV />} />
                    <Route path="/legal-mentions" element={<LegalMentions />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/command/:id" element={<Command />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/product/:id" element={<Product />} />

                    <Route path="/blog" element={<Blog />} />
                    <Route path="/article/:id" element={<ClientArticle />} />

                    <Route path="/jewelry" element={<Jewelry />} />
                    <Route path="/jewelry/:category" element={<Jewelry />} />

                    <Route path="/profil/" element={<Profil />} />

                    {/* Admin Routes without Footer */}
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
                    <Route path="/admin/personalization" element={<Personalization />} />
                    <Route path="/admin/accueil" element={<Accueil />} />
                    <Route path="/admin/avis" element={<AdminAvis />} />

                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>

            {/* Render Footer only if not on an admin route */}
            {!isAdminRoute && <Footer />}
        </>
    );
};

export default AppRoutes;