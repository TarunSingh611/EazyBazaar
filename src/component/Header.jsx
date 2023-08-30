import PropTypes from "prop-types";
import style from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { deleteToken } from "../Utils/TokenManagement";

const Header = ({ user }) => {
	const navigate = useNavigate();

	const handleLogout = (event) => {
		event.preventDefault();
		deleteToken();
		navigate("/login");
	};

	const handleLogin = (event) => {
		event.preventDefault();
		navigate("/login");
	};

	return (
		<div className={style.head}>
			<div className={`${style.nameContainer} ${style.uName}`}>
				<a onClick={() => navigate("/")}>
					<h1>{user.username}</h1>
				</a>
			</div>

			<div className={style.cartContainer}>
				<h1 style={{ marginRight: "20px" }}>
					<a onClick={() => navigate("/cart")}>&#128722;</a>
				</h1>
			</div>

			<div className={style.settingsContainer}>
				<h1 className={style.settings}>SETTINGS</h1>
				<div className={style.settingsDropdown}>
					{user.username === "Guest User" ? (
						<a onClick={handleLogin}>Log In</a>
					) : (
						<>
							<a onClick={handleLogout}>Log Out</a>
							{user.isSeller === 1 && (
								<div
									className={style.admin}
									onClick={() => navigate("/admin")}
								>
									admin Only
								</div>
							)}
							<a
								onClick={() =>
									navigate("/changePass")
								}
							>
								Change Password
							</a>
							<a onClick={() => navigate("/orders")}>
								Orders
							</a>
						</>
					)}
					<a onClick={() => navigate("/forgotPass")}>
						Forgot Password
					</a>
				</div>
			</div>
		</div>
	);
};

Header.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string,
		isSeller: PropTypes.number,
	}),
};

export default Header;
