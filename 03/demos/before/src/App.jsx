import React, { useState, useEffect } from 'react';
import { getProducts } from './services/productService';
import './App.css';
import Footer from './Footer';
import Header from './Header';

export default function App() {
  const [products, setProducts] = useState([]);
  const [productsBySize, setProductsBySize] = useState([]);
  const [currentSize, setCurrentSize] = useState('');

  const retrieveProducts = async () => {
    try {
      const fetchedProducts = await getProducts('shoes');
      setProducts(fetchedProducts);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredBySize = () => {
    if (currentSize === '') {
      setProductsBySize((prevState) => [...products]);
      return;
    }
    setProductsBySize((prevState) =>
      products.filter((p) => p.skus.find((s) => +s.size === +currentSize))
    );
  };

  useEffect(() => {
    retrieveProducts();
  }, []);

  useEffect(() => {
    filteredBySize();
  }, [products, currentSize]);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{' '}
            <select
              id="size"
              value={currentSize}
              onChange={(e) => {
                setCurrentSize(e.target.value);
              }}
            >
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            {currentSize && <h2>SHOE Size: {currentSize}</h2>}
          </section>
          <section id="products">{productsBySize.map(renderProduct)}</section>
        </main>
      </div>
      <Footer />
    </>
  );
}
