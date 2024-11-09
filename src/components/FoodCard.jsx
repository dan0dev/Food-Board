import { motion } from "framer-motion";
import { Clock, Minus, Plus, Star } from "lucide-react";

const FoodCard = ({ food, addToCart, removeFromCart, quantity }) => {
  const starRating = (rating) => {
    return (
      <div className="relative group">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 transition-colors ${
                index < Math.floor(rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-500 fill-transparent"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs text-white rounded whitespace-nowrap">
          {rating} out of 5 stars
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="group relative flex flex-col gap-3 w-full p-4 rounded-2xl bg-gray-800/95 shadow-lg border border-gray-700 hover:border-gray-600 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      role="article"
      aria-label={`${food.dish} food card`}
    >
      <div className="flex gap-4 w-full">
        <motion.div
          className="relative h-24 w-24 rounded-2xl overflow-hidden flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={food.image}
            alt={food.dish}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
          {food.type && (
            <span className="absolute top-2 left-2 bg-blue-500/90 text-white text-xs px-2 py-1 rounded-full">
              {food.type}
            </span>
          )}
        </motion.div>

        <div className="flex flex-col w-full min-w-0 space-y-2">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <h3 className="font-bold text-gray-100 text-lg leading-snug group-hover:text-blue-400 transition-colors">
                {food.dish}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2 mt-1">{food.description}</p>

              <div className="flex items-center gap-3 mt-2">
                <div
                  className="flex items-center gap-1"
                  role="img"
                  aria-label={`Rated ${food.rating} out of 5 stars`}
                >
                  {starRating(food.rating)}
                  <span className="text-sm text-gray-400 ml-1">
                    ({food.ratingCount.toLocaleString()})
                  </span>
                </div>

                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm">{food.prepTime}</span>
                </div>
              </div>
            </div>

            <div className="text-right flex flex-col items-end gap-2">
              <div className="font-bold text-2xl text-gray-100">${food.price.toFixed(2)}</div>

              <div className="flex items-center gap-2 bg-gray-700/50 p-1 rounded-full">
                <motion.button
                  className={`p-1.5 rounded-full transition-colors ${
                    quantity === 0
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-400"
                  }`}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromCart(food.id)}
                  disabled={quantity === 0}
                  aria-label="Remove one from cart"
                >
                  <Minus className="h-4 w-4" />
                </motion.button>

                <span
                  className="font-bold min-w-[24px] text-center text-gray-100"
                  aria-label={`${quantity} in cart`}
                >
                  {quantity}
                </span>

                <motion.button
                  className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-400 transition-colors"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToCart(food)}
                  aria-label="Add one to cart"
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

FoodCard.defaultProps = {
  quantity: 0,
};

const foodShape = {
  id: Number,
  dish: String,
  type: String,
  price: Number,
  prepTime: String,
  rating: Number,
  ratingCount: Number,
  image: String,
  description: String,
};

FoodCard.propTypes = {
  food: Object.keys(foodShape).reduce((acc, key) => {
    acc[key] = foodShape[key].isRequired;
    return acc;
  }, {}),
  addToCart: Function.isRequired,
  removeFromCart: Function.isRequired,
  quantity: Number,
};

export default FoodCard;
