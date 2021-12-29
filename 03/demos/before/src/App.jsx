import React, { useState, useEffect } from 'react';
// import { getProducts } from './services/productService';
import useFetch from './hooks/useFetch';
import './App.css';
import Footer from './Footer';
import Header from './Header';

export default function App() {
  const {
    data: products,
    error,
    loading
  } = useFetch('products?category=shoes');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentSize, setCurrentSize] = useState('');

  const filteredBySize = () => {
    if (!products) {
      return;
    }
    if (currentSize === '') {
      setFilteredProducts((prevState) => [...products]);
      return;
    }
    setFilteredProducts((prevState) =>
      products.filter((p) => p.skus.find((s) => +s.size === +currentSize))
    );
  };

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
          {loading && <h2>Loading products...</h2>}
          {!error ? (
            <section id="products">
              {filteredProducts.map(renderProduct)}
            </section>
          ) : (
            <h2>Unable to retrieve products</h2>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
