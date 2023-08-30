import { useEffect, useState } from "react";
import style from "./cart.module.css";
import load from "../../api/getCartProduct";
import AppendCart from "../../component/AppendCart";
import getProd from "../../api/getProdDet";
import cartDel from "../../api/apiDelCart";
import GenPop from "../../component/GenPop";
import { toast } from "react-toastify";
import OrderSummaryModal from "../../component/PlaceOrder/placeOrder";
import ShadeBar from "../../component/ShadeBar";
import SearchBox from "../../component/SearchBox";
import { FiGrid, FiList } from "react-icons/fi";
import { EmptyCart } from "../../component/Empty/EmptyComponent";
import AddressList from "../../component/AddressButton/AddressButton";

const Cartitems = () => {
	const [products, setProducts] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [pop, setPop] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [displayFormat, setDisplayFormat] = useState("list"); // Default to grid view
	const [showAddressList, setShowAddressList] = useState(false);
	const [Address, setAddress] = useState(null);

	const HandleSetAddress = (address) => {
		setAddress(address);
	};
	const handleShowAddressList = () => {
		setShowAddressList(true);
	};
	const showDetails = async (item) => {
		try {
			const prod = await getProd(item.stockID);
			setPop(prod);
		} catch (error) {
			// Handle any errors that occurred during the request
			console.error(error);
		}
	};

	function Del(item) {
		cartDel(item).then((result) => {
			if (result === true) {
				const updatedProducts = products.filter(
					(product) => product.stockID !== item.stockID
				);
				setProducts(updatedProducts);
				toast.success("Item deleted:", item);
			}
		});
	}

	useEffect(() => {
		load()
			.then((result) => {
				setProducts([...result]);
			})
			.catch((error) => {
				console.error("An error occurred:", error);
			});
	}, []);

	function funPop() {
		setPop(false);
	}

	const handlePlaceOrder = () => {
		// Open the modal and pass cart items and total price as props
		setIsModalOpen(true);
	};

	useEffect(() => {
		// Calculate the total price by multiplying the price of each item by its quantity
		const totalPrice = products.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
		setTotalPrice(totalPrice);
	}, [products]);

	// Function to toggle between grid and list view
	const toggleDisplayFormat = () => {
		setDisplayFormat((prevFormat) =>
			prevFormat === "grid" ? "list" : "grid"
		);
	};

	return (
		<div className={style.cartBody}>
			{products.length > 0 ? (
				<div className={style.productList}>
					{products.map((item) => (
						<AppendCart
							item={item}
							key={item.stockID}
							showDetails={showDetails}
							del={Del}
							displayFormat={displayFormat} // Pass the display format as a prop
						/>
					))}
				</div>
			) : (
				<EmptyCart />
			)}
			<ShadeBar>
				{/* Left side */}
				<div>
					{/* Buttons */}
					<button
						style={{ fontSize: "20px" }}
						onClick={toggleDisplayFormat}
					>
						{displayFormat === "grid" ? (
							<FiList />
						) : (
							<FiGrid />
						)}
					</button>
				</div>

				{/* Center (Search bar) */}
				<div style={{ flex: 3 }}>
					<SearchBox />
				</div>

				{/* Right side */}
				<div>
					{/* Total price */}
					<div>Total Price: ${totalPrice.toFixed(2)}</div>
				</div>
				<button
					onClick={
						Address
							? handlePlaceOrder
							: handleShowAddressList
					}
				>
					Place Order
				</button>
				{/* <button onClick={handlePlaceOrder}>Place Order</button> */}
				{showAddressList && (
					<AddressList
						onClose={() => setShowAddressList(false)}
						setAddress={HandleSetAddress}
						setIsModalOpen={setIsModalOpen}
					/>
				)}
				<button onClick={handleShowAddressList}>
					Show Address List
				</button>
			</ShadeBar>
			{pop ? <GenPop item={pop} funPop={funPop} /> : null}
			{/* Add the "Place Order" button */}
			{/* Add the modal component */}
			<OrderSummaryModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				cartItems={products}
				Address={Address}
				total={totalPrice}
			/>
		</div>
	);
};

export default Cartitems;
