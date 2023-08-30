import { useState } from "react";
import style from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { postLogin } from "../../api/apiLogin";
import { saveToken } from "../../Utils/TokenManagement";
import { verifyToken } from "../../api/apiVerifyToken";
import GoogleOAuthButton from "../../component/OauthButton/googleOauth";

function LoginPage() {
  ////////////JS
  const navigate = useNavigate();
  // const [logged, setLogged] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  ///////GET login
  verifyToken()
    .then((result) => {
      if (result.result === 1) {
        navigate("/");
      }
    })
    .catch((error) => {
      toast.error("Get signup error:", error);
    });

  const handleLogin = async () => {
    const data = {
      email: email,
      pass: password,
    };
    ///////////POST login
    postLogin(data)
      .then((res) => {
        console.log(res);
        if (res.result === 0) {
          toast.error("Account does not exist");
        } else if (res.result === 1) {
          toast.error("Email and password do not match");
        } else if (res.result === 2) {
          saveToken(res.token);
          navigate("/");
        } else if (res.result === 3) {
          toast.warn("Account needs to be verified");

          setTimeout(() => {
            navigate("/");
          }, 1600);
        }
      })
      .catch((error) => {
        toast.error("An error occurred:", error);
      });
  };

  return (
    <div className={style.loginBody}>
      <div className={style.form}>
        <h1 className={style.loginText}>LOG IN</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={style.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="pass"
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          autoComplete="off"
          className={style.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className={`${style.togglePassword} ${style.togglePassword1}`}
          onClick={togglePasswordVisibility}
        >
          <FontAwesomeIcon icon={faEyeSlash} />
        </span>
        <br />

        <button
          type="button"
          className={`${style.btn} ${style.sub}`}
          onClick={handleLogin}
        >
          LogIn
        </button>
        <GoogleOAuthButton />
        <a onClick={() => navigate("/ForgotPass")} className={style.link}>
          Forgot your password?
        </a>
        <span className={style.newUser}>
          <a onClick={() => navigate("/signup")}>Create an account</a>
          <br />
          <a onClick={() => navigate("/")}>continue as Guest</a>
        </span>
      </div>
    </div>
  );
}

export default LoginPage;
