import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./pass.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function NewPass() {
  const navigate = useNavigate();

  const [pass, setPass] = useState("");
  const [ver, setVer] = useState("");
  const [passErrVisible, setPassErrVisible] = useState(false);
  const [pVErrVisible, setPVErrVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verVisibility, setVerVisibility] = useState(false);

  const handlePassChange = (e) => {
    const currentValue = e.target.value;

    const pattern =
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    const valid = pattern.test(currentValue);

    setPass(currentValue);

    setPassErrVisible(!valid && currentValue !== "");
  };

  const getnewPass = async () => {
    const url = "http://localhost:3000/newPass";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        credentials: "include",
      });

      if (response) {
        const res = await response.json();
        const result = res.res;

        if (result === 1) {
          navigate("/");
        }
      } else {
        throw new Error("new Pass failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  getnewPass();

  const handleVerChange = (e) => {
    const currentValue = e.target.value;

    const passMatch = pass === currentValue;

    setVer(currentValue);
    setPVErrVisible(!passMatch && currentValue !== "");
  };

  const handleSubmit = () => {
    let verchk = 1;

    if (
      !/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(
        pass
      )
    ) {
      verchk = 0;
      setPassErrVisible(true);
      setPass("");
    }

    if (pass !== ver) {
      verchk = 0;
      setPVErrVisible(true);
      setVer("");
    }

    if (verchk === 1) {
      const url = "http://localhost:3000/newPass";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newpass: pass }),
        credentials: "include",
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error changing password:", error);
        });
    }
  };

  const togglePasswordVisibility = (inputType) => {
    if (inputType === 1) {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    } else {
      setVerVisibility((prevVerVisibility) => !prevVerVisibility);
    }
  };

  return (
    <div className={style.passContainer}>
      <div className="passBody">
        <label className="label">Enter new password:</label>

        <div className={`${style.inputContainer}`}>
          <input
            type={showPassword ? "text" : "password"}
            className={`${style.pass}`}
            id="pass"
            name="newpass"
            value={pass}
            onChange={handlePassChange}
          />
          <span
            className={`${style.togglePassword} ${style.togglePassword1}`}
            onClick={() => togglePasswordVisibility(1)}
          >
            <FontAwesomeIcon icon={faEyeSlash} />
          </span>
        </div>
        {passErrVisible && (
          <p className={`${style.inputErr}`} id="pass-err">
            Please use a strong password
          </p>
        )}

        <label className="label">Re-enter password:</label>
        <div className={`${style.inputContainer}`}>
          <input
            type={verVisibility ? "text" : "password"}
            className={`${style.ver}`}
            id="ver"
            name="newver"
            value={ver}
            onChange={handleVerChange}
          />
          <span
            className={`${style.togglePassword} ${style.togglePassword1}`}
            onClick={() => togglePasswordVisibility(2)}
          >
            <FontAwesomeIcon icon={faEyeSlash} />
          </span>
        </div>
        {pVErrVisible && (
          <p className={`${style.inputErr}`} id="pVer-err">
            Password does not match
          </p>
        )}

        <button
          type="submit"
          className={`${style.subBut}`}
          onClick={handleSubmit}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

export default NewPass;
