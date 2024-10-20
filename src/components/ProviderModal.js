import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCartPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../contexts/cartContext'; // Import CartContext
import { toast } from 'react-toastify'; // Import toast for notifications
import { motion } from 'framer-motion'; // Import motion for animations

const ProviderModal = ({ selectedService, isOpen, onClose }) => {
  const { addToCart } = useContext(CartContext); // Access addToCart function from context

  if (!isOpen || !selectedService) return null; // Return nothing if modal is closed

  const handleAddToCart = (provider) => {
    const item = {
      id: provider.providerName + '-' + selectedService.id, // Generate unique id for the cart item
      name: `${selectedService.name} by ${provider.providerName}`,
      price: provider.price,
      quantity: 1,
    };
    addToCart(item); // Add item to the cart

    // Show a success notification
    toast.success(`${item.name} has been added to the cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-6 w-11/12 sm:w-1/3 shadow-lg transition-transform">
        <h3 className="text-lg font-semibold text-green-800 mb-4 text-center">
          Available Providers for {selectedService.name}
        </h3>
        {selectedService.serviceProviders.map(provider => (
          <div key={provider.providerName} className="bg-white bg-opacity-30 rounded-2xl p-4 mb-4 shadow-md backdrop-blur-lg transition hover:bg-opacity-40">
            <div className="flex items-center mb-2">
              <span className="text-2xl">{provider.icon}</span>
              <p className="font-bold text-gray-800 flex items-center ml-2">
                <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-500" />
                {provider.providerName}
              </p>
            </div>
            <p className="text-gray-600">Price: ₹{provider.price}</p>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-500" />
              Rating: {provider.rating} ⭐
            </p>
            <p className="text-gray-600">Experience: {provider.yearsOfExperience} years</p>
            <p className="text-gray-600">Specialties: {provider.specialties.join(', ')}</p>
            <button
              onClick={() => handleAddToCart(provider)} // Add to cart on button click
              className="block mt-2 p-2 bg-blue-600 text-white text-center rounded-2xl hover:bg-blue-700 transition"
            >
              <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
              Add to Cart
            </button>
          </div>
        ))}
        <button
          onClick={onClose}
          className="mt-4 p-2 w-full bg-red-600 text-white rounded-2xl hover:bg-red-700 transition flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default ProviderModal;
