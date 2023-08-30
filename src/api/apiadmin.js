import { getToken } from "../Utils/TokenManagement";

const url = "https://localhost:3000/";

const admHome = async (product) => {
  const token = getToken();
  const data = { product, token };
  try {
    return fetch(`${url}admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

const admDel = async (id) => {
  try {
    const data = { id };
    return fetch(`${url}deleteProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },

      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

const applyChanges = async (product, callback) => {
  if (!Number.isInteger(Number(product.stock))) {
    callback("Invalid stock format. Stock should be an integer.");
    return;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(product.price)) {
    callback(
      "Invalid price format. Price should be a decimal number with up to two decimal places."
    );
    return;
  }

  try {
    admHome(product).then((res) => {
      if (res.result === 1) {
        callback("Changes have been applied");
      } else {
        callback("Failed to apply changes");
      }
    });
  } catch (error) {
    console.error("An error occurred:", error);
    callback("Failed to apply changes");
  }
};

const deleteProduct = async (id, callback) => {
  try {
    admDel(id).then((resp) => {
      if (resp.result === 1) {
        callback({ res: 1, message: "Product deleted from the database" });
      } else {
        callback({ res: 0, message: "Failed to delete product" });
      }
    });
  } catch (error) {
    console.error("An error occurred:", error);
    callback({ res: 0, message: "Failed to delete product" });
  }
};

export { admHome, admDel, applyChanges, deleteProduct };
