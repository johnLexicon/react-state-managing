import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Products from './views/Products';
import Product from './views/Product';
import Cart from './views/Cart';
import PageNotFound from './views/PageNotFound';

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/products/:category/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
