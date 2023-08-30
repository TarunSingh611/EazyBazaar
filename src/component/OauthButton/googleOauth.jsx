import {
	GoogleLogin,
	GoogleOAuthProvider,
} from "@react-oauth/google";
import apiGoogleAuth from "../../api/apiGoogleAuth";
import { saveToken } from "../../Utils/TokenManagement";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clientId } from "../../assets/secrets";

const GoogleSignInButton = () => {
	const navigate = useNavigate();
	const responseGoogle = (response) => {
		console.log("button Clicked");
		console.log(response);

		apiGoogleAuth(response)
			.then((res) => {
				console.log(res);
				if (res.result === 1) {
					saveToken(res.token);
					navigate("/");
				} else {
					toast.error("An error occurred: Try Again ");
				}
			})
			.catch((error) => {
				toast.error("An error occurred:", error);
			});
	};

	const responseGoogleErr = (response) => {
		console.log("Error");
		console.log(response);
	};

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<GoogleLogin
				onSuccess={responseGoogle}
				onError={responseGoogleErr}
			/>
		</GoogleOAuthProvider>
	);
};

export default GoogleSignInButton;
