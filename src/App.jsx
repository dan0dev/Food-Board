import { AnimatePresence, motion } from 'framer-motion';
import { Facebook, MapPin, Phone, ShoppingCart, Utensils } from 'lucide-react';
import { useEffect, useState } from 'react';
import CartSummary from './components/CartSummary';
import FoodCard from './components/FoodCard';
import Footer from './components/Footer';
import {
  CART_STORAGE_KEY,
  DELIVERY_FEE,
  filter,
  foodRecords,
  PACKAGE_FEE_PER_ITEM,
  DISCOUNT_CODES,
} from './constants';

const App = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [isChangingTabs, setIsChangingTabs] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    const filterFunction = filter[activeTab];
    setFilteredFoods(foodRecords.filter(filterFunction));
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const handleTabClick = (tabName) => {
    setIsChangingTabs(true);
    setActiveTab(tabName);
    setTimeout(() => setIsChangingTabs(false), 300);
  };

  const addToCart = (food) => {
    setCart((prevCart) => ({
      ...prevCart,
      [food.id]: (prevCart[food.id] || 0) + 1,
    }));
  };

  const removeFromCart = (foodId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[foodId] > 0) {
        newCart[foodId]--;
        if (newCart[foodId] === 0) {
          delete newCart[foodId];
        }
      }
      return newCart;
    });
  };

  const deleteFromCart = (foodId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[foodId];
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const calculateSubtotal = () => {
    return Object.entries(cart).reduce((total, [foodId, quantity]) => {
      const food = foodRecords.find((f) => f.id === parseInt(foodId));
      return total + food.price * quantity;
    }, 0);
  };

  const calculatePackageFee = () => {
    const totalItems = getTotalItems();
    return totalItems * PACKAGE_FEE_PER_ITEM;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const packageFee = calculatePackageFee();
    return subtotal + packageFee + (getTotalItems() > 0 ? DELIVERY_FEE : 0);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-3xl p-5 shadow-xl relative border border-gray-700">
        {/* Development Tag */}
        <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 py-1 px-3 rounded-tr-3xl rounded-bl-xl font-bold text-sm shadow-lg transform rotate-12 origin-top-right z-10">
          Under Development
        </div>

        {/* Navbar */}
        <div className="rounded-2xl bg-gray-700 shadow-md border border-gray-800 p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 font-bold">
              <Utensils className="h-8 w-8 text-blue-400" />
              <h2 className="text-xl text-blue-400">Bite Me - Food Ordering</h2>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/biteme"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 cursor-pointer group"
              >
                <Facebook className="h-5 w-5" />
                <span className="group-hover:underline">Facebook</span>
              </a>
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-blue-400" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="text-gray-300 text-sm mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-400" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Bite+Me+California,+Los+Angeles"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Bite Me California, Los Angeles
              </a>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Phone className="h-5 w-5 text-blue-400" />
              <span className="text-gray-300">(123) 456-7890</span>
            </div>
          </div>
        </div>

        {/* Tabs for Food Categories */}
        <div className="flex gap-2 mb-3 mt-3 overflow-x-auto pb-2">
          {Object.keys(filter).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-3 py-2 mt-2 whitespace-nowrap font-semibold rounded-2xl transition-all duration-200
                ${
                  activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Food Items List */}
        <div className="relative">
          <motion.div
            className="overflow-y-auto h-[500px] pr-2 relative scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scroll-smooth"
            initial={false}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-4"
              >
                {filteredFoods.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    quantity={cart[food.id] || 0}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Cart Summary */}
        <CartSummary
          cart={cart}
          clearCart={clearCart}
          deleteFromCart={deleteFromCart}
          getTotalItems={getTotalItems}
          calculateSubtotal={calculateSubtotal}
          calculatePackageFee={calculatePackageFee}
          calculateTotal={calculateTotal}
          discountCodes={DISCOUNT_CODES}
        />

        {/* Footer Links */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
