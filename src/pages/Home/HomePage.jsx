import { useEffect, useState } from "react";
import Header from "../../component/Header";
import ProductPage from "./ProductPage";
import { getToken } from "../../Utils/TokenManagement";
import { verifyToken } from "../../api/apiVerifyToken";

const HomePage = () => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [token, setToken] = useState(getToken());

	useEffect(() => {
		console.log(token);
	}, [token]);

	useEffect(() => {
		console.log(data);
	}, [data]);

	useEffect(() => {
		verifyToken()
			.then((response) => {
				setData(response);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("An error occurred:", error);
				setError(error);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			{data && <Header user={data.user} />}
			<ProductPage />
		</>
	);
};

export default HomePage;
