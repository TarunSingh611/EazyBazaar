import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import location from "../../assets/location";
import { getToken } from "../../Utils/TokenManagement";
import {
	CardElement,
	Elements,
	useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
	"pk_test_51NjzGOSHTcR0le9K8pgRwkOi9LHN90Ju0UhvkFG8arCvaJyac171OZ9Q3HeHTMBvfmM16Ypu82iTRAyc2PnNPAO000Rd5SntGd"
);

const fetchSecret = async (payload, successCB, failCB) => {
	const response = await fetch(location + "/create-payment", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			token: getToken(),
		},
		body: JSON.stringify(payload),
	});

	if (response.status == 200) {
		const data = await response.json();
		console.log("data : ", data);
		successCB(data.clientSecret);
	} else {
		failCB(await response.text());
	}
};

// eslint-disable-next-line react/prop-types
function PaymentForm({ payload }) {
	const elements = useElements();
	const [clientSecret, setClientSecret] = useState();
	useEffect(() => {
		fetchSecret(payload, setClientSecret, (text) => {
			toast.error(text);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handlePayment = async (event) => {
		event.preventDefault();
		const stripe = await stripePromise;
		const result = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
			},
		});

		if (result.error) toast.error(result.error);
		else toast.success("Payment Completed");
	};

	return (
		<div>
			<form onSubmit={handlePayment}>
				<CardElement />
				<button type="submit">Pay</button>
			</form>
		</div>
	);
}

// eslint-disable-next-line react/prop-types
function PaymentApp({ payload }) {
	useEffect(() => {
		console.log(payload);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Elements stripe={stripePromise}>
			<PaymentForm payload={payload} />
		</Elements>
	);
}

export default PaymentApp;
