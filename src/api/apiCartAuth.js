async function apiCartAuth(data) {
  const url = "https://localhost:3000/cartAuth";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseText) => {
      return responseText;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

export default apiCartAuth;
