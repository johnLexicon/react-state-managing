export default function cartReducer(cart, action) {
  switch (action.type) {
    case 'ADD': {
      const { id, sku } = action.payload;
      const itemInCart = cart.find((i) => i.sku === sku);
      if (itemInCart) {
        // Return new array with the matching item replaced
        return cart.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Return new array with the new item appended
        return [...cart, { id, sku, quantity: 1 }];
      }
    }
    case 'UPDATE_QUANTITY': {
      const { sku, quantity } = action.payload;
      return quantity === 0
        ? cart.filter((i) => i.sku !== sku)
        : cart.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    }
    case 'EMPTY':
      return [];
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
