import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Products from './views/Products';
import Product from './views/Product';
import Cart from './views/Cart';
import PageNotFound from './views/PageNotFound';

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  // cartItem = {id, sku}
  function addToCart(cartItem) {
    setCartItems((prevState) => {
      const existingItem = prevState.find(
        (item) => +item.sku === +cartItem.sku
      );
      if (!existingItem)
        return [
          ...prevState,
          { id: cartItem.id, sku: cartItem.sku, quantity: 1 }
        ];
      return prevState.map((item) => {
        if (+item.sku === +cartItem.sku) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  }

  function updateQuantity(sku, quantity) {
    setCartItems((prevState) => {
      return quantity === 0
        ? prevState.filter((item) => +item.sku !== +sku)
        : prevState.map((item) =>
            +item.sku === +sku ? { ...item, quantity } : item
          );
    });
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/products/:category" element={<Products />} />
            <Route
              path="/products/:category/:id"
              element={<Product addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart cartItems={cartItems} updateQuantity={updateQuantity} />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
