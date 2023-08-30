import PropTypes from "prop-types";

const ShadeBar = ({ children }) => {
  const style = {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Translucent black background
    height: "80px",
    display: "flex",
    width: "calc(100% - 40px)",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
    fontWeight: "bold",
    padding: "0 20px",
    position: "fixed",
    bottom: 0,
    zIndex: 1,
  };

  return <div style={style}>{children}</div>;
};

ShadeBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShadeBar;
