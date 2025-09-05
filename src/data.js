// src/data.js
import canvasSneakers from "./assets/canvas-sneakers.jpg";
import denimJacket from "./assets/denim-jacket.jpg";
import goldHoop from "./assets/gold-hoop-earrings.jpg";
import goldNecklace from "./assets/gold-necklace.jpg";
import pearlBracelet from "./assets/pearl-bracelet.jpg";
import smartwatch from "./assets/smartwatch.jpg";
import whiteShirt from "./assets/white-shirt.jpg";
import wirelessEarbuds from "./assets/wireless-earbuds.jpg";
import wirelessKeyboard from "./assets/wireless-keyboard.jpg";

const initialProducts = [
  {
    id: "1",
    name: "Gold Necklace",
    price: 4999,
    img: goldNecklace,
    category: "Jewellery",
    rating: 4.6,
  },
  {
    id: "2",
    name: "Pearl Bracelet",
    price: 2499,
    img: pearlBracelet,
    category: "Jewellery",
    rating: 4.4,
  },
  {
    id: "3",
    name: "Gold Hoop Earrings",
    price: 5299,
    img: goldHoop,
    category: "Jewellery",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Smartwatch",
    price: 2999,
    img: smartwatch,
    category: "Electronics",
    rating: 4.3,
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    price: 1799,
    img: wirelessEarbuds,
    category: "Electronics",
    rating: 4.2,
  },
  {
    id: "6",
    name: "Wireless Keyboard",
    price: 2199,
    img: wirelessKeyboard,
    category: "Electronics",
    rating: 4.1,
  },
  {
    id: "7",
    name: "White Shirt",
    price: 1299,
    img: whiteShirt,
    category: "Fashion",
    rating: 4.0,
  },
  {
    id: "8",
    name: "Denim Jacket",
    price: 3499,
    img: denimJacket,
    category: "Fashion",
    rating: 4.5,
  },
  {
    id: "9",
    name: "Canvas Sneakers",
    price: 2799,
    img: canvasSneakers,
    category: "Fashion",
    rating: 4.6,
  },
];

export default initialProducts;
