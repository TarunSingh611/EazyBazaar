import { getToken } from "../Utils/TokenManagement";

const verifyToken = async () => {
  const url = "https://localhost:3000/verifyToken";
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
};

export { verifyToken };
