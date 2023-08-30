import { useState, useEffect } from "react";
import Header from "../../component/Header";
import PropTypes from "prop-types";
import style from "./cart.module.css";
import { useNavigate } from "react-router-dom";
import Cartitems from "./cartItem";
import { verifyToken } from "../../api/apiVerifyToken";

const CartPage = () => {
	const [data, setData] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		verifyToken()
			.then((response) => {
				if (response.result === 0) {
					navigate("/login");
				} else if (response.result === 1) {
					setData(response.user);
				} else {
					console.log("server response error");
				}
			})
			.catch((error) => {
				console.error("An error occurred:", error);
			});
		//  eslint-disable-next-line
	}, []);

	return (
		<div>
			{data && <Header user={data} />}

			<div className={`${style.cartCon}`}>
				{<Cartitems />}
				<div className={`${style.hid} ${style.pop}`}>
					{/* Content within the pop div */}
				</div>
			</div>

			<script src="/cart.js"></script>
		</div>
	);
};

CartPage.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string,
		isAdmin: PropTypes.bool,
	}),
};

export default CartPage;
