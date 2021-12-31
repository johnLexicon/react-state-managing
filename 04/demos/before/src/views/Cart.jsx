import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchAll from './../services/useFetchAll';
import Spinner from '../Spinner';

const Cart = ({ cartItems, updateQuantity }) => {
  const navigate = useNavigate();
  const urls = cartItems.map((item) => `products/${item.id}`);
  const { data: products, loading, error } = useFetchAll(urls);

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;
    const { price, name, image, skus } = products.find(
      (p) => p.id === parseInt(id)
    );
    const { size } = skus.find((s) => s.sku === sku);

    return (
      <li key={sku} className="cart-item">
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) => updateQuantity(sku, parseInt(e.target.value))}
              value={quantity}
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </li>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;

  const numItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <section id="cart">
      <h1>Cart</h1>
      <p>Total items: {numItems}</p>
      <ul>{cartItems.map(renderItem)}</ul>
      <button
        onClick={() => {
          navigate('/checkout');
        }}
        className="btn btn-primary"
      >
        Check out
      </button>
    </section>
  );
};

export default Cart;
