import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/cartContext'; // Ensure correct import

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const GST_RATE = 0.18; // 18% GST
  const DISCOUNT_AMOUNT = 0.10; // 10% discount for valid code

  // Handle quantity change
  const handleQuantityChange = (itemId, event) => {
    const quantity = parseInt(event.target.value);
    if (quantity > 0) {
      updateQuantity(itemId, quantity);
    }
  };

  // Handle remove item
  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  // Handle discount code application
  const applyDiscountCode = () => {
    if (discountCode === 'SAVE10') {
      setDiscount(DISCOUNT_AMOUNT);
    } else {
      setDiscount(0); // Invalid code resets discount
    }
  };

  // Calculate subtotal, discount, GST, and total price
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const gstAmount = subtotalAfterDiscount * GST_RATE;
  const totalPrice = subtotalAfterDiscount + gstAmount;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-800">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is currently empty.</p>
      ) : (
        <div className="bg-white p-4 md:p-6 shadow-md rounded-lg">
          {/* Cart Items Section */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" /> {/* Product Image */}
                  <div className="flex flex-col space-y-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-500">Price: ₹{item.price}</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center mt-4 md:mt-0">
                  <label htmlFor={`quantity-${item.id}`} className="mr-2">Qty:</label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e)}
                    className="w-16 p-1 border rounded text-center"
                  />
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="mt-2 md:mt-0 md:ml-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Discount Code Section */}
          <div className="mt-4 md:mt-6">
            <div className="flex flex-col md:flex-row items-center">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
                className="w-full md:w-1/2 p-2 border border-gray-300 rounded-l-lg"
              />
              <button
                onClick={applyDiscountCode}
                className="mt-2 md:mt-0 md:ml-2 bg-green-600 text-white p-2 rounded-r-lg hover:bg-green-700 transition"
              >
                Apply
              </button>
            </div>
            {discount > 0 && (
              <p className="mt-2 text-green-500">Discount applied! You saved 10%.</p>
            )}
          </div>

          {/* Pricing Breakdown Section */}
          <div className="mt-4 md:mt-8 border-t pt-4 space-y-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-lg font-medium text-green-600">
                <span>Discount (10%)</span>
                <span>- ₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-medium">
              <span>Subtotal after Discount</span>
              <span>₹{subtotalAfterDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <span>GST (18%)</span>
              <span>₹{gstAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-semibold mt-4">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Proceed to Checkout Button */}
          <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
