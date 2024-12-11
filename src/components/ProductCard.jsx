import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    return Array(rating)
      .fill("★")
      .join("");
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="pro-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">{renderStars(product.rating)}</div>
      </div>
      <p className="product-description">{product.description}</p>
      <span className="product-price">${product.price}</span>
      <div className="product-footer">
        <button className="add-to-cart">
              Add to Cart
        </button>
        <Link to={`/details/${product.id}`}>
          <button className="add-to-cart-btn">Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
