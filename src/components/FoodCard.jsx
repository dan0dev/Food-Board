import { motion } from 'framer-motion';
import { Minus, Plus, Star } from 'lucide-react';
import PropTypes from 'prop-types';

const FoodCard = ({ food, addToCart, removeFromCart, quantity }) => {
  const starRating = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-500 fill-yellow-300'
            : 'text-gray-600 fill-gray-800'
        }`}
      />
    ));
  };

  FoodCard.propTypes = {
    food: PropTypes.shape({
      description: PropTypes.string, // Add validation for description
      type: PropTypes.string.isRequired,
      restaurant: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      prepTime: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      ratingCount: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      dish: PropTypes.string.isRequired,
    }).isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    quantity: PropTypes.number.isRequired,
  };

  return (
    <motion.div
      className="flex flex-col gap-3 w-full p-4 rounded-2xl bg-gray-700 shadow-md border border-gray-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-4 w-full">
        <img
          src={food.image}
          alt={food.dish}
          className="h-24 w-24 rounded-2xl object-cover bg-gray-600 flex-shrink-0"
        />
        <div className="flex flex-col w-full min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <h3 className="font-bold text-gray-200 text-lg mb-1">{food.dish}</h3>
              <p className="text-sm text-gray-400 mb-2">
                {food.description ||
                  `A delicious ${food.type} dish from ${food.restaurant.name}.
                Prepared with care in ${food.prepTime}.`}
              </p>
              <div className="flex items-center gap-1 mb-2">
                {starRating(food.rating)}
                <span className="text-sm text-gray-400 ml-1">({food.ratingCount})</span>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="font-bold text-gray-200 mb-3">${food.price.toFixed(2)}</div>
              <div className="flex items-center gap-2">
                <motion.button
                  className="bg-blue-500 text-white p-1 rounded-full"
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.8)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromCart(food.id)}
                  disabled={quantity === 0}
                >
                  <Minus className="h-4 w-4" />
                </motion.button>
                <span className="font-bold min-w-[20px] text-center text-gray-200">{quantity}</span>
                <motion.button
                  className="bg-blue-500 text-white p-1 rounded-full"
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.8)' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToCart(food)}
                >
                  <Plus className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
