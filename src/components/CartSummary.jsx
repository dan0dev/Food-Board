import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { MdDelete as Trash2, MdClose as X } from 'react-icons/md';
import { DELIVERY_FEE, DISCOUNT_CODES, PACKAGE_FEE_PER_ITEM, foodRecords } from '../constants';

const CartSummary = ({
  cart,
  clearCart,
  deleteFromCart,
  getTotalItems,
  calculateSubtotal,
  calculatePackageFee,
  calculateTotal,
  handlePayment,
}) => {
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(''); //

  const handleApplyDiscount = () => {
    const discountValue = DISCOUNT_CODES[discountCode.toLowerCase()];
    if (discountValue) {
      setDiscountApplied(true);
      setDiscountAmount(discountValue);
      setErrorMessage('');
    } else {
      setDiscountApplied(false);
      setDiscountAmount(0);
      setErrorMessage('Discount code does not exist.');
    }
  };

  const totalAfterDiscount = calculateTotal() * (1 - discountAmount);

  return (
    <AnimatePresence>
      {getTotalItems() > 0 && (
        <motion.div
          key="cart-summary"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="mt-4 overflow-hidden"
        >
          <div className="p-4 bg-gray-800 rounded-xl shadow-inner border border-gray-600">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-blue-400">Cart Summary</h3>
              <motion.button
                className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={clearCart}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 className="h-4 w-4" />
                Clear Cart
              </motion.button>
            </div>
            <AnimatePresence>
              {Object.entries(cart).map(([foodId, quantity]) => {
                const food = foodRecords.find((f) => f.id === parseInt(foodId));
                return (
                  <motion.li
                    key={foodId}
                    className="flex justify-between items-center text-sm text-gray-300 mb-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center">
                      <motion.button
                        className="mr-2 text-red-400"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteFromCart(food.id)}
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                      <span>
                        {food.dish} x{quantity}
                      </span>
                    </div>
                    <span>${(food.price * quantity).toFixed(2)}</span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
            <div className="mt-4 pt-2 border-t border-gray-600">
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Package Fee (${PACKAGE_FEE_PER_ITEM.toFixed(2)} per item):</span>
                <span>${calculatePackageFee().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Delivery Fee:</span>
                <span>${DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Estimated Delivery Time:</span>
                <span>1-2 hours</span>
              </div>
              <div className="flex justify-between font-bold text-blue-400 mb-2">
                <span>Total:</span>
                <span>${totalAfterDiscount.toFixed(2)}</span> {/* Show total after discount */}
              </div>
              {/* Discount Code Section */}
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter discount code"
                    className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <motion.button
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={handleApplyDiscount}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apply
                  </motion.button>
                </div>
                {discountApplied && (
                  <p className="mt-2 text-sm text-green-400">Discount applied!</p>
                )}
                {errorMessage && <p className="mt-2 text-sm text-red-400">{errorMessage}</p>}
              </div>
            </div>
            {/* Pay Button */}
            <motion.button
              className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              onClick={handlePayment}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Pay now
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartSummary;
