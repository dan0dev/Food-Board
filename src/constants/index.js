export const foodRecords = [
  {
    id: 1,
    restaurant: {
      name: 'Pizza Palace',
    },
    dish: 'Margherita Pizza',
    type: 'Italian',
    price: 12.99,
    prepTime: '20 minutes',
    rating: 5,
    ratingCount: 220,
    image: 'https://i.imgur.com/XjQnQeB.png',
  },
  {
    id: 2,
    restaurant: {
      name: 'Sushi Station',
    },
    dish: 'California Roll',
    type: 'Japanese',
    price: 15.99,
    prepTime: '15 minutes',
    rating: 5,
    ratingCount: 180,
    image: 'https://i.imgur.com/XB6AABW.jpeg',
  },
  {
    id: 3,
    restaurant: {
      name: 'Burger Barn',
    },
    dish: 'Classic Cheeseburger',
    type: 'American',
    price: 10.99,
    prepTime: '12 minutes',
    rating: 4.5,
    ratingCount: 250,
    image: 'https://i.imgur.com/kmaPuKL.jpeg',
  },
  {
    id: 4,
    restaurant: {
      name: 'Taco Town',
    },
    dish: 'Chicken Tacos',
    type: 'Mexican',
    price: 9.99,
    prepTime: '10 minutes',
    rating: 3.2,
    ratingCount: 200,
    image: 'https://i.imgur.com/svHKqO4.jpeg',
  },
];

export const filter = {
  ['all']: () => true,
  ['Italian']: (record) => record.type === 'Italian',
  ['Japanese']: (record) => record.type === 'Japanese',
  ['American']: (record) => record.type === 'American',
  ['Mexican']: (record) => record.type === 'Mexican',
};

export const CART_STORAGE_KEY = 'food-ordering-cart';
export const DELIVERY_FEE = 2.99;
export const PACKAGE_FEE_PER_ITEM = 0.5;

export const DISCOUNT_CODES = {
  save10: 0.1, // 10% discount
  save50: 0.5, // 50% discount
  save100: 1.0, // 100% discount (free)
};
