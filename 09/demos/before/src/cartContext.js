import { createContext, useContext } from 'react';
import React, { useReducer, useEffect } from 'react';
import cartReducer from './cartReducer';

const CartContext = createContext(null);

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem('cart')) ?? [];
} catch {
  console.error('The cart could not be parsed into JSON.');
  initialCart = [];
}

// Custom hook which returns the context values
export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error(
      'useCart Hook must be used within the CartProvider, wrap a parent element with the CartProvider'
    );
  return context;
}

function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  const initialContext = {
    cart,
    dispatch
  };

  return (
    <CartContext.Provider value={initialContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
