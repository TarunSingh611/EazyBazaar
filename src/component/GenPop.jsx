import PropTypes from "prop-types";
import style from "./GenPop.module.css";

const url = "https://localhost:3000/";

const GenPop = ({ item, funPop }) => {
  return (
    <div className={style.show}>
      <div>
        <div className={style.hidContainer}>
          <img
            className={style.itemImg}
            src={`${url}images/files/${item.img}`}
            alt={item.name}
          />
          <h1>{item.name}</h1>
          <h3>{item.price}</h3>
          <h5>{item.description}</h5>
          <h4>{item.category}</h4>
          <button onClick={funPop} className={style.close} value="Close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

GenPop.propTypes = {
  item: PropTypes.object.isRequired,
  funPop: PropTypes.func.isRequired,
};

export default GenPop;
