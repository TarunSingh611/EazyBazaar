async function apiGetCart() {
  const url = "https://localhost:3000/cart";
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((responseText) => {
      return responseText;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

export default apiGetCart;
