import { useState } from "react";
import PropTypes from "prop-types";

const MockPayPalButton = ({ amount, onSuccess }) => {
  // Simulate a loading state while the payment is being processed
  const [isLoading, setIsLoading] = useState(false);

  // Simulate a successful payment after a timeout
  const simulatePayment = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Simulate a successful payment by calling the onSuccess callback
      onSuccess({
        id: GenId(), // Replace with a unique order ID
        status: true,
        method: "PayPal",

        payer: {
          email_address: "payer@example.com", // Replace with the payer's email
        },
        purchase_units: {
          amount: {
            currency_code: "USD",
            value: amount.toFixed(2), // Format the amount as needed
          },
        },
        amount: amount.toFixed(2),
        create_time: new Date().toISOString(), // Current timestamp
        update_time: new Date().toISOString(), // Current timestamp
      });
    }, 2000); // Adjust the timeout as needed
  };

  return (
    <div>
      {isLoading ? (
        <p>Processing payment...</p>
      ) : (
        <button
          style={{
            width: "100%",
          }}
          onClick={simulatePayment}
        >
          Pay with PayPal
        </button>
      )}
    </div>
  );
};
function GenId() {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base36
  const randomString = Math.random().toString(36).substring(2, 5); // Generate a random string
  const uniqueId = timestamp + randomString; // Concatenate timestamp and random string
  return uniqueId;
}

MockPayPalButton.propTypes = {
  amount: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default MockPayPalButton;
