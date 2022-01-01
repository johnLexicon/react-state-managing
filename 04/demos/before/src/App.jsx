import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Products from './views/Products';
import Product from './views/Product';
import Cart from './views/Cart';
import PageNotFound from './views/PageNotFound';
import Checkout from './views/Checkout';

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem('cart')) ?? [];
    } catch (err) {
      console.log(err);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

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

  function emptyCart() {
    setCartItems([]);
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
            <Route
              path="/checkout"
              element={<Checkout cart={cartItems} emptyCart={emptyCart} />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
