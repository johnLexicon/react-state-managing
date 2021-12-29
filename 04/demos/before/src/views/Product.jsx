import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../services/useFetch';
import Spinner from '../Spinner';
import PageNotFound from './PageNotFound';

const Product = () => {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`products/${id}`);
  const navigate = useNavigate();
  const [sku, setSku] = useState('');

  if (!product) return <PageNotFound />;

  if (error) throw error;

  if (loading) return <Spinner />;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <div className="mb-2">
        <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
          <option disabled value="">
            What Size?
          </option>
          {product.skus.map((s) => (
            <option key={s.sku} value={s.sku}>
              {s.size}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => {
          if (sku) navigate('/cart', { replace: false });
        }}
        className={`btn btn-primary ${sku ? '' : 'disabled'}`}
      >
        Add to Cart
      </button>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
};

export default Product;
