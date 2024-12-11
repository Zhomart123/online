import { useNavigate } from 'react-router-dom';
import '../styles/CartSidebar.css';

const CartSidebar = ({ isOpen, cartItems, onClose, onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();
  
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems, totalPrice } });
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2>Your Cart</h2>
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="cart-item-price">${item.price.toFixed(2)}</span>
              </div>
              <div className="cart-item-controls">
                <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => onRemoveItem(item.id)}>
                🗑️
              </button>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout - ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
