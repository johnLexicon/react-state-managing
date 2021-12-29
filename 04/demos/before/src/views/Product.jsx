import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../services/useFetch';
import Spinner from '../Spinner';
import PageNotFound from './PageNotFound';

const Product = () => {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`products/${id}`);
  const navigate = useNavigate();

  if (!product) return <PageNotFound />;

  if (error) throw error;

  if (loading) return <Spinner />;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <button
        onClick={() => navigate('/cart', { replace: false })}
        className="btn btn-primary"
      >
        Add to Cart
      </button>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
};

export default Product;
