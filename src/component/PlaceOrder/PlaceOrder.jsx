import Modal from "react-modal";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Table } from "reactstrap"; // Import reactstrap components
import styles from "./placeOrder.module.css"; // Import the CSS module
import PayPalButton from "../PayPal/PayPalButton";
import { toast } from "react-toastify";
// import MockPayPalButton from "../PayPal/MockPayPal";
// import { apiSaveOrder } from "../../api/apiSaveOrder";
// import { useNavigate } from "react-router-dom";
import PaymentApp from "../../component/PaymentApp";

const PlaceOrder = ({
	isOpen,
	onClose,
	cartItems,
	total,
	Address,
}) => {
	// const navigate = useNavigate();
	const [PayPal, setPayPal] = useState(false);

	useEffect(() => {
		Modal.setAppElement("#root");
	}, []);

	const EmptyCart = () => {
		toast.warning("Add Something to Cart First");
	};
	const handlePaymentSuccess = (details) => {
		toast.success("Payment successful:", details);
	};
	``;
	// const handleSuccess = (details) => {
	// 	let data = {
	// 		paymentData: details,
	// 		total,
	// 		address: Address.address,
	// 	};
	// 	saveOrderData(data);
	// };

	// function saveOrderData(data) {
	// 	apiSaveOrder(data)
	// 		.then((result) => {
	// 			if (result) {
	// 				console.log("data recieved :", result);
	// 				toast.success("Order placed successfully");
	// 				navigate("/");
	// 			} else {
	// 				toast.error("saving error:");
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			toast.error("An error occurred:", error);
	// 			console.error("An error occurred:", error);
	// 		});
	// }

	const handlePaymentError = (error) => {
		console.error("Payment error:", error);
		// Handle payment error
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel="Place Order"
			className={styles.placeOrderModal}
			overlayClassName={styles.placeOrderOverlay}
		>
			{PayPal ? (
				<div>
					<div className={styles.placeOrderPayPal}>
						<PayPalButton
							amount={total}
							onSuccess={handlePaymentSuccess}
							onError={handlePaymentError}
							Address={Address}
						/>
					</div>
					<PaymentApp
						payload={{
							addressJson: JSON.stringify(
								Address.address
							),
							amount: (total * 100).toFixed(0),
						}}
					/>

					<Button
						style={{
							width: "100%",
							backgroundColor: "red",
							borderColor: "red",
						}} // Set background color to red
						onClick={() => {
							setPayPal(false);
						}}
					>
						Close
					</Button>
				</div>
			) : (
				<div>
					<h2 className={styles.placeOrderHeading}>
						Place Your Order
					</h2>
					<div className={styles.placeOrderTableContainer}>
						<Table className={styles.placeOrderTable}>
							<thead className={styles.TableHead}>
								<tr>
									<th className={styles.TableItems}>
										Item
									</th>
									<th className={styles.TableItems}>
										Price
									</th>
									<th className={styles.TableItems}>
										Quantity
									</th>
									<th className={styles.TableItems}>
										Subtotal
									</th>
								</tr>
							</thead>
							<tbody className={styles.TableBody}>
								{cartItems.map((item, index) => (
									<tr
										key={index}
										className={
											styles.placeOrderTableItem
										}
									>
										<td>{item.name}</td>
										<td>${item.price}</td>
										<td>{item.quantity}</td>
										<td>
											$
											{(
												item.price *
												item.quantity
											).toFixed(2)}
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
					<div className={styles.placeOrderTotalContainer}>
						<p className={styles.placeOrderTotal}>
							Total: ${total.toFixed(2)}
						</p>
						<div
							className={styles.confirmButtonContainer}
						>
							<Button
								className={
									styles.placeOrderCloseButton
								}
								onClick={onClose}
							>
								Close
							</Button>
							<Button
								className={`btn-success ${styles.confirmButton}`}
								onClick={() => {
									total
										? setPayPal(true)
										: EmptyCart();
								}}
							>
								Confirm
							</Button>
						</div>
					</div>
				</div>
			)}
		</Modal>
	);
};

PlaceOrder.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	cartItems: PropTypes.array.isRequired,
	total: PropTypes.number.isRequired,
	Address: PropTypes.object,
};

export default PlaceOrder;
