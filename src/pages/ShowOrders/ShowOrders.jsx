import { useState, useEffect } from "react";
import Header from "../../component/Header";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { verifyToken } from "../../api/apiVerifyToken";

import PurchaseList from "./PurchaseList";

const OrderPage = () => {
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

      <PurchaseList />
    </div>
  );
};

OrderPage.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    isAdmin: PropTypes.bool,
  }),
};

export default OrderPage;
