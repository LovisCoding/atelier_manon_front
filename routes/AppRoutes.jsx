import React from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Navbar from '../src/components/Navbar/Navbar.jsx';
import Footer from '../src/components/Footer.jsx';
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

const Profil = React.lazy(() => import("../src/pages/Profil.jsx"));

import AdminRouter from './AdminRouter.jsx';

const AppRoutes = () => {
    const location = useLocation();

    const isAdminRoute = location.pathname.includes('/admin');

    const homeRoute = location.pathname == '/';
    return (
        <>
            { homeRoute && <EventBanner /> }
            {/* Render Navbar only if not on an admin route */}
            { !isAdminRoute && <Navbar /> }

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
                        <Route path="/admin/*" element={<AdminRouter />} />

                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>

            {/* Render Footer only if not on an admin route */}
            {!isAdminRoute && <Footer />}
        </>
    );
};

export default AppRoutes;