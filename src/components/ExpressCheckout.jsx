import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ExpressCheckout.css";
import PaymentForm from "./PaymentForm";
import GooglePayButton from "@google-pay/button-react";


const ExpressCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 5; 
  const total = subtotal + shippingCost;
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Order placed!");
  };
  return (
    <div className="express-checkout-container">
      <div className="checkout-form">
        <h2>Express Checkout</h2>
        
        <form onSubmit={handleFormSubmit}>
          <div className="or">OR</div>
          <GooglePayButton
          environment="TEST"
          // environment="PRODUCTION"
          paymentRequest={{
            apiVersion:2,
            apiVersionMinor:0,
            allowedPaymentMethods:[
              {
                type:"CARD",
                parameters:{
                  allowedAuthMethods:["PAN_ONLY", "CRYPTOGRAM_3DS"],
                  allowedCardNetworks:["MASTERCARD", "VISA"]
                },
                tokenizationSpecification:{
                  type:"PAYMENT_GATEWAY",
                  parameters:{
                    gateway:"example",
                    gatewayMerchantId:"exampleGateMerchantID"
                  }
                }
              }
            ],
            merchantInfo:{
              merchantId:"4400430228949795",
              merchantName:"ZHOMART KUMISBEK"
            },
            transactionInfo:{
              totalPriceStatus:"FINAL",
              totalPriceLabel:"Total",
              totalPrice:"1",
              currencyCode:"USD",
              countryCode:"US"
            },
            shippingAddressRequired:true,
            callbackIntents:["PAYMENT_AUTHORIZATION"]
          }}
          onLoadPaymentData={paymentRequest =>{
            console.log(paymentRequest)
          }}
          onPaymentAuthorized={paymentData =>{
            console.log(paymentData);
            return {transactionState : "SUCCESS"}
          }}
          existingPaymentMethodRequired="false"
          buttonColor="black"
          buttonType="Buy"
        >
        </GooglePayButton> 
          <PaymentForm/>
          <input type="email" placeholder="Email" required />
          <div className="name-fields">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>
          <input type="text" placeholder="Company (optional)" />
          <input type="text" placeholder="Address" required />
          <input type="text" placeholder="Apartment, suite, etc. (optional)" />
          <div className="city-fields">
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="State" required />
            <input type="text" placeholder="Zip Code" required />
          </div>
          <input type="tel" placeholder="Phone (optional)" />
          <button type="submit" className="continue-to-payment-btn">Continue to Payment</button>
        </form>
      </div>
      <div className="cart-summary">
        <h2>Total</h2>
        <p>{cartItems.length} products</p>
        <div className="cart-products">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-product">
              <img src={item.image} alt={item.name} className="cart-product-image" />
              <div>
                <p>{item.name}</p>
                <p>${item.price} × {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pricing">
          <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
          <p>Shipping: <span>${shippingCost.toFixed(2)}</span></p>
        </div>
        <h3 className="total-amount">Total: <span>USD ${total.toFixed(2)}</span></h3>
      </div>
    </div>
  );
};

export default ExpressCheckout;
