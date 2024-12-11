import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; 
import ProductCard from "./components/ProductCard"; 
import ChocolateDetails from "./components/ChocolateDetails"; 
import ExpressCheckout from "./components/ExpressCheckout"; 
import CartSidebar from "./components/CartSidebar"; 
import "./App.css";

import img1 from "./img/first.png";
import img2 from "./img/second.png";
import img3 from "./img/third.png";

import image1 from "./img/vish.png";
import image2 from "./img/mind.png";
import image3 from "./img/klu.png";


const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const products = [
    {
      id: 1,
      name: "Glowing Cherry",
      second:"Tomiris tsvetushaya vishnya",
      description: "Dark chocolate with glowing cherry",
      price: 20,
      image: img1,
      img: image1,
      rating: 5,
      details: "Chocolate made according to the classical technology from high-quality cocoa seeds, with a cocoa product content of at least 58%, with the addition of dried cherry berries. №10061",
      weight: "90g",
      composition: "Ingredients: cocoa mass, sugar, cocoa oil, cocoa powder, cherry (dried fruit), emulsifier – soy lecithin; common salt, extract of natural vanilla is intensifier of taste and smell. May contain inconsiderable amount of crushed almond kernel, cranberries (dried fruit).",
    },
    {
      id: 2,
      name: "Steppe Almonds",
      second:"Tomiris zolotoi mindal",
      description: "Milk chocolate with steppe almonds",
      price: 20,
      image: img2,
      img: image2,
      rating: 5,
      details: "Chocolate made according to the classical technology from high-quality cocoa seeds, with a cocoa product content of at least 30%, with the addition of whole California almond nuts. №10060",
      weight: "90g",
      composition: "Ingredients: sugar, cocoa oil, cocoa mass, whey solids, kernel of almond, crushed; butterfat, whole milk dried, emulsifier - soy lecithin; fructose, extract of natural vanilla is intensifier of taste and smell. May contain inconsiderable amount of cherries, cranberries (dried fruits).",
    },
    {
      id: 3,
      name: "Wild Cranberries",
      second:"Tomiris dikaya klyukva",
      description: "Milk chocolate with wild cranberries",
      price: 20,
      image: img3,
      img: image3,
      rating: 5,
      details: "Chocolate made according to the classical technology from high-quality cocoa seeds, with a cocoa product content of at least 30%, with the addition of dried cranberries. №10059",
      weight: "90g",
      composition: "Ingredients: sugar, cocoa oil, cocoa mass, cranberry (dried fruit), whey solids, butterfat, whole milk dried, emulsifier - soy lecithin; fructose, extract of natural vanilla is intensifier of taste and smell. May contain inconsiderable amount of crushed almond kernel, cherry (dried fruit).",
    },
  ];

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, amount) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="App">
        
        <CartSidebar
          isOpen={isSidebarOpen}
          cartItems={cartItems}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
          onClose={toggleSidebar} 
        />
        
        <Routes>
          <Route
            path="/"
            element={
              <div className="products-container">
                <Header />
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onViewCart={toggleSidebar} 
                  />
                ))}
              </div>
            }
          />
          <Route
            path="/details/:id"
            element={<ChocolateDetails products={products} />}
          />
          <Route
            path="/checkout"
            element={
              <ExpressCheckout cartItems={cartItems} totalPrice={100} />
            }
            
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
