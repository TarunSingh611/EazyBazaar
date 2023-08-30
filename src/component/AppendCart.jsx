import style from "../pages/cart/cart.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import getProd from "../api/getProdDet";
import { toast } from "react-toastify";

const url = "https://localhost:3000/";

const AppendCart = ({ item, showDetails, del, displayFormat }) => {
  const [counter, setCount] = useState([parseInt(item.quantity)]);

  const incItem = () => {
    let count = parseInt(counter) + 1;
    if (count <= item.stock) {
      updateCart(count);
    } else {
      toast.error("stockMax");
    }
  };

  const decItem = () => {
    let count = parseInt(counter) - 1;
    if (count >= 1) {
      updateCart(count);
    } else {
      toast.error("stockMin");
    }
  };

  async function updateCart(count) {
    const prod = await getProd(item.stockID);

    if (parseInt(prod.stock) < parseInt(count)) {
      return;
    } else {
      const data = { id: item.cartId, Qn: parseInt(count) };

      updateCartData(data, () => {
        setCount(count);
      });
    }
  }

  function updateCartData(userCart, callback) {
    let data = userCart;
    const url = "https://localhost:3000/";
    fetch(`${url}updateItems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          callback();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return displayFormat == "list" ? (
    <div className={`${style.listFormat}`}>
      <div className={`${style.listImage}`}>
        <img src={`${url}images/files/${item.img}`} alt={item.name} />
      </div>

      <div className={`${style.productDetails}`}>
        <div className={`${style.productName}`}>
          <h3>{item.name}</h3>

          <h3>${item.price}</h3>
          <h6 style={item.stock > 5 ? { color: "grey" } : { color: "red" }}>
            {item.stock > 0 ? `In stock left: ${item.stock}` : "Out of stock"}
          </h6>
        </div>
      </div>

      <div className={`${style.listDescription}`}>
        <p>{item.description}</p>
      </div>
      <div className={`${style.listButton}`}>
        <span className={`${style.spanBut}`}>
          <button className={`${style.sInc}`} onClick={decItem}>
            -
          </button>
          <label className={`${style.qn}`}>{counter}</label>
          <button className={`${style.sDec}`} onClick={incItem}>
            +
          </button>
          <label onClick={() => del(item)}>&#128465;</label>
        </span>
      </div>
    </div>
  ) : displayFormat == "grid" ? (
    <div className={style.productCard} id={item.stockID} cartid={item.cartId}>
      <div className={style.productImage}>
        <img src={`${url}images/files/${item.img}`} alt={item.name} />
      </div>
      <div className={style.productDetails}>
        <div className={style.productName}>
          <h3>{item.name}</h3>
          <h3>${item.price}</h3>
          <h6 style={item.stock > 5 ? { color: "grey" } : { color: "red" }}>
            {item.stock > 0 ? `In stock left: ${item.stock}` : "Out of stock"}
          </h6>
          <span className={style.spanBut}>
            <button className={style.sInc} onClick={decItem}>
              -
            </button>
            <label className={style.qn}>{counter}</label>
            <button className={style.sDec} onClick={incItem}>
              +
            </button>
            <label onClick={() => del(item)}>&#128465;</label>
          </span>
          <button
            className={style.showDetailsBtn}
            onClick={() => showDetails(item)}
          >
            Show details
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

AppendCart.propTypes = {
  item: PropTypes.shape({
    stockID: PropTypes.number.isRequired,
    cartId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    // Add more prop validations for other properties of the item
  }).isRequired,
  showDetails: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  displayFormat: PropTypes.string.isRequired,
};

export default AppendCart;
