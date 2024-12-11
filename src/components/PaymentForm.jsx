// PaymentForm.jsx
import React, { useState } from "react";
import "../styles/PaymentForm.css"; // Ensure styles are created

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (cardNumber && expiryDate && cvv) {
      alert("Payment information submitted successfully!");
    } else {
      alert("Please fill out all payment fields.");
    }
  };

  return (
    <div className="payment-form">
      <h3>Payment Information</h3>
      <form onSubmit={handlePaymentSubmit}>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength={16}
          required
        />
        <div className="expiry-cvv">
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            maxLength={5}
            required
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength={3}
            required
          />
        </div>
        <button type="submit" className="submit-payment-btn">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
