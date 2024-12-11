
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ChocolateDetails.css";
import CartSidebar from "./CartSidebar.jsx";

const ChocolateDetails = ({ products }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([
        { name: "Tatyana A", message: "Lorem ipsum dolor sit amet.", date: "23 June, 2024" },
        { name: "Alex N", message: "Great chocolate!", date: "23 June, 2024" },
    ]);
    const [activeTab, setActiveTab] = useState("description");
    const [formData, setFormData] = useState({ name: "", message: "" });

    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const product = products.find((item) => item.id === parseInt(id, 10));

    if (!product) {
        return <h2>Product not found</h2>;
    }

    const handleTabSwitch = (tab) => setActiveTab(tab);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.message) {
            setFeedbacks([
                ...feedbacks,
                { name: formData.name, message: formData.message, date: new Date().toLocaleDateString() },
            ]);
            setFormData({ name: "", message: "" });
        }
    };

    const handleAddToCart = () => {
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
        setIsCartOpen(true);
    };

    const handleUpdateQuantity = (id, delta) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const calculateTotalPrice = () =>
        cartItems
            .reduce((total, item) => total + item.quantity * parseFloat(item.price), 0)
            .toFixed(2);

    const handleCheckout = () => {
        alert(`Checkout successful! Total price: $${calculateTotalPrice()} USD`);
        setCartItems([]);
        setIsCartOpen(false);
    };

    return (
        <div className="details-container">

            <div className="all-details">
                <div className="details-content">
                    <img src={product.img} alt={product.name} className="details-image" />
                    <div className="details-info">
                        <div className="name-btn">
                            <h2 className="chok-name">{product.second}</h2>
                            <button onClick={() => navigate(-1)} className="back-btn">
                                &larr; Back
                            </button>
                        </div>
                        <div className="details-rating">
                            {"★".repeat(product.rating)}
                        </div>
                        <div className="details-tabs">
                            <button
                                className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
                                onClick={() => handleTabSwitch("description")}
                            >
                                Description
                            </button>
                            <button
                                className={`tab-btn ${activeTab === "composition" ? "active" : ""}`}
                                onClick={() => handleTabSwitch("composition")}
                            >
                                Composition
                            </button>
                        </div>
                        <hr />
                        <div className="details-tab-content">
                            {activeTab === "description" ? (
                                <p>{product.details}</p>
                            ) : (
                                <p>{product.composition}</p>
                            )}
                        </div>
                        <div className="details-price">
                            <span>Weight:</span> <span className="">{product.weight}</span>
                        </div>
                        <div className="details-pricee">
                            <span>Price:</span> <span className="pro-inf">${product.price}</span>
                        </div>
                        <button className="buy-now-btn" onClick={handleAddToCart}>
                            Buy Now
                        </button>
                    </div>
                </div>

                <div className="feedback-section">
                    <div className="width">
                        <h3>Write Feedback</h3>
                        <form onSubmit={handleSubmit} className="feedback-form">
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Enter your message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit" className="submit-feedback-btn">
                                Submit your Feedback
                            </button>
                        </form>
                    </div>

                    <div className="width">
                        <div className="feedback-list">
                            {feedbacks.map((feedback, index) => (
                                <div key={index} className="feedback-item">
                                    <p>
                                        <strong>{feedback.name}</strong> - {feedback.date}
                                    </p>
                                    <p>{feedback.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <CartSidebar
                isOpen={isCartOpen}
                cartItems={cartItems}
                onClose={() => setIsCartOpen(false)}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                totalPrice={calculateTotalPrice()}
                onCheckout={handleCheckout}
            />
        </div>
    );
};

export default ChocolateDetails;
