export const foodRecords = [
  {
    id: 1,
    dish: 'Margherita Pizza',
    type: 'Pizzas',
    price: 12.99,
    prepTime: '20 minutes',
    rating: 5,
    ratingCount: 220,
    image: 'https://i.imgur.com/XjQnQeB.png',
    description:
      'Classic Neapolitan pizza with fresh mozzarella, tomatoes, and basil on a thin crust.',
  },
  {
    id: 2,
    dish: 'Pepperoni Pizza',
    type: 'Pizzas',
    price: 13.99,
    prepTime: '22 minutes',
    rating: 4.8,
    ratingCount: 190,
    image: 'https://i.imgur.com/svHKqO4.jpeg',
    description: 'Traditional pizza topped with spicy pepperoni slices and melted cheese.',
  },
  {
    id: 3,
    dish: 'Classic Cheeseburger',
    type: 'Hamburgers',
    price: 10.99,
    prepTime: '12 minutes',
    rating: 4.5,
    ratingCount: 250,
    image: 'https://i.imgur.com/kmaPuKL.jpeg',
    description:
      'Juicy beef patty topped with melted cheese, lettuce, tomato, and pickles on a toasted bun.',
  },
  {
    id: 4,
    dish: 'Bacon Avocado Burger',
    type: 'Hamburgers',
    price: 12.99,
    prepTime: '15 minutes',
    rating: 4.7,
    ratingCount: 180,
    image: 'https://i.imgur.com/svHKqO4.jpeg',
    description: 'Gourmet burger with crispy bacon, sliced avocado, and special sauce.',
  },
  {
    id: 5,
    dish: 'Chocolate Lava Cake',
    type: 'Desserts',
    price: 7.99,
    prepTime: '10 minutes',
    rating: 4.9,
    ratingCount: 300,
    image: 'https://i.imgur.com/svHKqO4.jpeg',
    description: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream.',
  },
  {
    id: 6,
    dish: 'Grilled Steak',
    type: 'Meat',
    price: 19.99,
    prepTime: '25 minutes',
    rating: 4.8,
    ratingCount: 220,
    image: 'https://i.imgur.com/svHKqO4.jpeg',
    description:
      'Juicy grilled ribeye steak seasoned with herbs and served with roasted vegetables.',
  },
  {
    id: 7,
    dish: 'Spaghetti Carbonara',
    type: 'Pasta',
    price: 14.99,
    prepTime: '18 minutes',
    rating: 4.6,
    ratingCount: 210,
    image: 'https://i.imgur.com/XB6AABW.jpeg',
    description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
  },
  {
    id: 8,
    dish: 'French Fries',
    type: 'Sides',
    price: 3.99,
    prepTime: '8 minutes',
    rating: 4.5,
    ratingCount: 280,
    image: 'https://i.imgur.com/svHKqO4.jpeg',
    description: 'Crispy golden fries seasoned with salt, perfect as a side dish.',
  },
];

export const filter = {
  ['all']: () => true,
  ['Pizzas']: (record) => record.type === 'Pizzas',
  ['Hamburgers']: (record) => record.type === 'Hamburgers',
  ['Desserts']: (record) => record.type === 'Desserts',
  ['Meat']: (record) => record.type === 'Meat',
  ['Pasta']: (record) => record.type === 'Pasta',
  ['Sides']: (record) => record.type === 'Sides',
};

export const CART_STORAGE_KEY = 'food-ordering-cart';
export const DELIVERY_FEE = 2.99;
export const PACKAGE_FEE_PER_ITEM = 0.5;

export const DISCOUNT_CODES = {
  save10: 0.1, // 10%
  save50: 0.5, // 50%
  save100: 1.0, // 100%
};
