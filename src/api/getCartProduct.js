import { getToken } from "../Utils/TokenManagement";

function Load() {
  const url = "https://localhost:3000/cartItems";
  const token = getToken();
  return fetch(url, {
    method: "GET",
    headers: {
      token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default Load;
