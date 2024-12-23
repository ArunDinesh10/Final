import React, { useState } from "react";
import axios from "axios";
import "./PaymentGateway.css";

const PaymentGateway = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    cvv: "",
    paymentAmount: 99,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://final-1-wo0z.onrender.com/api/payment",
        paymentDetails
      );
      alert(response.data.message || "Payment successful!");
      localStorage.setItem("paymentDone", "true");
    } catch (error) {
      if (error.response) {
        console.error("Backend Response:", error.response.data);
        alert(`Error: ${error.response.data.message || "Invalid request."}`);
      } else {
        console.error("Network Error:", error.message);
        alert("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="payment-gateway-container">
      <h2>Payment Gateway</h2>
      <form className="payment-form" onSubmit={handlePayment}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={paymentDetails.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={paymentDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phone"
            value={paymentDetails.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardName">Name on Credit Card</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={paymentDetails.cardName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Credit Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input
            type="password"
            id="cvv"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentAmount">Payment Amount</label>
          <input
            type="text"
            id="paymentAmount"
            name="paymentAmount"
            value={paymentDetails.paymentAmount}
            disabled
          />
        </div>
        <button type="submit" className="pay-button">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentGateway;
