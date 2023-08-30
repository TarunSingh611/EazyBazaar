// PayPalButton.js
import PropTypes from "prop-types";
import {
	PayPalScriptProvider,
	PayPalButtons,
} from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
	return (
		<PayPalScriptProvider
			options={{
				"client-id":
					"AShkPVJucRQUK-0Gwdj1Hai1vI5JbWwJvCe9JpPs_xSBwyYnfRCTt3Tia1vS-bgXq3MOwCWl3db20wAq",
			}}
		>
			<PayPalButtons
				createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									value: amount,
								},
							},
						],
					});
				}}
				onApprove={(data, actions) => {
					return actions.order.capture().then((details) => {
						onSuccess(details);
					});
				}}
				onError={(error) => {
					onError(error);
				}}
			/>
		</PayPalScriptProvider>
	);
};

PayPalButton.propTypes = {
	amount: PropTypes.number.isRequired,
	onSuccess: PropTypes.func.isRequired,
	onError: PropTypes.func.isRequired,
};

export default PayPalButton;
