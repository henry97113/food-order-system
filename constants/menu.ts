import { MenuCategory } from "../types/menu";

const MENU: MenuCategory[] = [
  {
    category: "Burgers",
    items: [
      { id: "b1", name: "Classic Burger", price: 5.99 },
      { id: "b2", name: "Cheeseburger", price: 6.99 },
      { id: "b3", name: "Double Cheeseburger", price: 8.99 },
      { id: "b4", name: "Bacon Burger", price: 7.99 },
      { id: "b5", name: "Veggie Burger", price: 6.49 },
    ],
  },
  {
    category: "Sides",
    items: [
      { id: "s1", name: "Small Fries", price: 2.49 },
      { id: "s2", name: "Large Fries", price: 3.49 },
      { id: "s3", name: "Onion Rings", price: 3.99 },
      { id: "s4", name: "Chicken Nuggets (6pc)", price: 4.99 },
      { id: "s5", name: "Side Salad", price: 3.49 },
    ],
  },
  {
    category: "Drinks",
    items: [
      { id: "d1", name: "Small Soda", price: 1.99 },
      { id: "d2", name: "Large Soda", price: 2.49 },
      { id: "d3", name: "Chocolate Milkshake", price: 4.49 },
      { id: "d4", name: "Iced Tea", price: 1.99 },
      { id: "d5", name: "Bottled Water", price: 1.49 },
    ],
  },
];

export { MENU };
