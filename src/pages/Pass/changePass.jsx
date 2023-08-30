import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./pass.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { getChangePass, postChangePass } from "../../api/apiChangePass";
import { toast } from "react-toastify";

function ChangePass() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  getChangePass()
    .then((result) => {
      if (result === 1) {
        navigate("/");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });

  const handleVerifyPassword = () => {
    postChangePass(password)
      .then((data) => {
        if (data === "1") {
          navigate("/newPass");
        } else {
          toast.error("Wrong password entered, Try Again");
        }
      })
      .catch((error) => {
        console.error("Error verifying password:", error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={style.passContainer}>
      <div className="passBody">
        <label className="label">Change Password: Enter current Password</label>

        <div className={`${style.inputContainer}`}>
          <input
            type={showPassword ? "text" : "password"}
            id="subIn"
            name="currpass"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <span
            className={`${style.togglePassword}`}
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={faEyeSlash} />
          </span>
        </div>

        <button
          type="submit"
          className={`${style.subBut}`}
          onClick={handleVerifyPassword}
        >
          Verify Password
        </button>
      </div>
    </div>
  );
}
export default ChangePass;
