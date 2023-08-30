import style from "./Empty.module.css";
import { useNavigate } from "react-router-dom";

function EmptyCart() {
	const navigate = useNavigate();
	return (
		<div className={style.ActingBodyCart}>
			<div className={`${style.Container} `}>
				<div className={style.EmptyText}>
					<p>Your Cart is Empty</p>
				</div>

				<div>
					<button onClick={() => navigate("/")}>
						SHOP NOW
					</button>
				</div>
			</div>
		</div>
	);
}

function EmptyPurchases() {
	const navigate = useNavigate();
	return (
		<div className={style.ActingBodyPurchase}>
			<div className={`${style.Container} `}>
				<div className={style.EmptyText}>
					<p>Your Purchase List is Empty</p>
				</div>

				<div>
					<button
						className={style.buttonPurchase}
						onClick={() => navigate("/")}
					>
						SHOP NOW
					</button>
				</div>
			</div>
		</div>
	);
}

export { EmptyCart, EmptyPurchases };
