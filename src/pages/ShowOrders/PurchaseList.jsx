import React, { useEffect, useState } from "react";
import { apiGetPurchases } from "../../api/apiGetPurchase";
import styles from "./PurchaseList.module.css";
import { apiGetOrders } from "../../api/apiGetOrders";
import { toast } from "react-toastify";
import { EmptyPurchases } from "../../component/Empty/EmptyComponent";

const PurchaseList = () => {
	const [purchases, setPurchases] = useState([]);
	const [orderDetails, setOrderDetails] = useState(null); // State variable for order details
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		apiGetPurchases()
			.then((res) => {
				setPurchases(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	function showOrderDetails(purchaseID) {
		apiGetOrders(purchaseID)
			.then((res) => {
				console.log(res);
				setOrderDetails(res); // Set order details in state
				setIsModalOpen(true); // Open the modal
			})
			.catch((err) => {
				console.log(err);
				toast.error("An error occurred:", err);
			});
	}

	function closeModal() {
		setOrderDetails(null); // Clear order details
		setIsModalOpen(false); // Close the modal
	}

	return purchases.length > 0 ? (
		<div>
			<h2>Purchase List</h2>
			<ul className={styles.purchaseList}>
				{purchases.map((purchase) => (
					<li
						key={purchase.purchaseID}
						className={styles.purchaseCard}
						onClick={() => {
							showOrderDetails(purchase.purchaseID);
						}}
					>
						<div className={styles.purchaseInfo}>
							<p>Purchase ID: {purchase.purchaseID}</p>
							<p>
								Purchase Date: {purchase.purchaseDate}
							</p>
							<p>
								Total Amount: {purchase.totalAmount}
							</p>
							<p>
								Transaction ID:{" "}
								{purchase.transactionId}
							</p>
							<p>
								Payment Method:{" "}
								{purchase.paymentMethod}
							</p>
							<p>
								Payment Status:{" "}
								{purchase.paymentStatus
									? "Paid"
									: "Unpaid"}
							</p>
						</div>
					</li>
				))}
			</ul>

			{/* Display order details as a modal */}
			{isModalOpen && (
				<div className={styles.modal}>
					<div className={styles.modalContent}>
						<button
							className={styles.closeButton}
							onClick={closeModal}
						>
							&times;
						</button>
						<h3>Order Details</h3>
						<div className={styles.cardList}>
							{orderDetails.map((order, index) => (
								<div
									key={index}
									className={styles.card}
								>
									<div
										className={styles.productInfo}
									>
										{order.product &&
										typeof order.product ===
											"string" ? (
											<React.Fragment>
												{(() => {
													try {
														const productObj =
															JSON.parse(
																order.product
															);
														return (
															<React.Fragment>
																<p>
																	Name:{" "}
																	{
																		productObj.Name
																	}
																</p>
																<p>
																	Category:{" "}
																	{
																		productObj.Category
																	}
																</p>
																<img
																	className={
																		styles.productImage
																	}
																	src={`https://localhost:3000/Images/files/${productObj.Image}`}
																	alt={
																		productObj.Name
																	}
																/>
															</React.Fragment>
														);
													} catch (error) {
														return (
															<p>
																Invalid
																product
																data
															</p>
														);
													}
												})()}
											</React.Fragment>
										) : (
											<p>
												Product data not
												available
											</p>
										)}
									</div>

									<p>
										Original Price:{" "}
										{order.originalPrice}
									</p>
									<p>Quantity: {order.quantity}</p>
									<p>Discount: {order.discount}</p>
									<p>
										Final Price:{" "}
										{order.finalPrice}
									</p>
									<React.Fragment>
										{(() => {
											try {
												const productObj =
													JSON.parse(
														order.product
													);
												return (
													<React.Fragment>
														<p>
															Description:{" "}
															{
																productObj.Description
															}
														</p>
													</React.Fragment>
												);
											} catch (error) {
												return (
													<p>
														Invalid
														product data
													</p>
												);
											}
										})()}
									</React.Fragment>

									<h6>Order ID: {order.orderId}</h6>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	) : (
		<EmptyPurchases />
	);
};

export default PurchaseList;
