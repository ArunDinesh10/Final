import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPaymentDashboard.css";

const AdminPaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch payments from the backend
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("https://final-1-wo0z.onrender.com/api/payments");
        console.log("API Response:", response.data);
        const mappedPayments = response.data.map((payment) => ({
          id: payment.id,
          fullName: payment.full_name,
          paymentDate: new Date(payment.created_at).toLocaleDateString(),
          status: payment.status,
          amount: payment.amount,
        }));
        setPayments(mappedPayments);
        setIsLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching payments:", error);
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Toggle status between "Accepted" and "Rejected"
  const handleToggle = (id) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id
          ? {
              ...payment,
              status: payment.status === "Accepted" ? "Rejected" : "Accepted",
            }
          : payment
      )
    );
  };

  return (
    <div className="admin-payment-dashboard">
      <h2>Admin Payment Dashboard</h2>
      {isLoading ? (
        <p>Loading payments...</p>
      ) : (
        <table className="payment-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Payment Date</th>
              <th>Payment Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.fullName}</td>
                  <td>{payment.paymentDate}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.status}</td>
                  <td>
                    <button
                      onClick={() => handleToggle(payment.id)}
                      className={`toggle-button ${payment.status.toLowerCase()}`}
                    >
                      {payment.status === "Accepted" ? "Reject" : "Accept"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No payments available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPaymentDashboard;
