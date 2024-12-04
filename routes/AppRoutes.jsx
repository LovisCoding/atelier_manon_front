import React from 'react';
import { Route, Routes, useLocation } from 'react-router';
import App from '../src/App';
import Test from '../src/pages/Test/Test';

import Connection from '../src/pages/Connection.jsx';
import Register from '../src/pages/Register.jsx';
import ForgotPassword from '../src/pages/ForgotPassword.jsx';
import EmailSent from '../src/pages/EmailSent.jsx';

import FAQ from '../src/pages/faq/Faq';
import About from '../src/pages/About';
import Home from '../src/pages/home/Home';
import Contact from '../src/pages/Contact.jsx';

import NotFound from '../src/pages/NotFound';
import Admin from '../src/pages/admin/Admin';
import CodesPromo from '../src/pages/admin/CodesPromo/CodesPromo.jsx';
import CGV from '../src/pages/CGV/CGV.jsx';
import CodePromo from '../src/pages/admin/CodesPromo/CodePromo.jsx';
import Cart from '../src/pages/Cart.jsx';
import Command from '../src/pages/Command.jsx';
import FoireAuxQuestions from '../src/pages/admin/FAQ/FAQS.jsx';
import FAQDetails from '../src/pages/admin/FAQ/FAQ.jsx';
import Footer from '../src/components/Footer.jsx';
import Navbar from '../src/components/Navbar/Navbar.jsx';
import Articles from '../src/pages/admin/Articles/Articles.jsx';
import Article from '../src/pages/admin/Articles/Article.jsx';
import Product from '../src/pages/Product/Product.jsx';

const AppRoutes = () => {
	const location = useLocation();
	return (
		<>
			{/* Navbar and Footer for routes outside /admin */}
			{(!location.pathname.includes('/admin')) ? <Navbar /> : null}
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
        <Route path="/product/:id" element={<Product/>} />

				{/* Routes sans le Footer */}
				<Route path="/admin" element={<Admin />} />
				<Route path="/admin/faq" element={<FoireAuxQuestions />} />
				<Route path="/admin/faq/:id" element={<FAQDetails />} />
				<Route path="/admin/codesPromo" element={<CodesPromo />} />
				<Route path="/admin/codesPromo/:id" element={<CodePromo />} />
				<Route path="/admin/faq" element={<FoireAuxQuestions />} />
				<Route path="/admin/blog" element={<Articles />} />
				<Route path="/admin/blog/:id" element={<Article />} />

				{/* Page introuvable */}
				<Route path="*" element={<NotFound />} />
			</Routes>
			{/* Footer ajouté seulement pour les pages hors /admin */}
			{(!location.pathname.includes('/admin')) ? <Footer /> : null}
		</>
	);
};

export default AppRoutes;
