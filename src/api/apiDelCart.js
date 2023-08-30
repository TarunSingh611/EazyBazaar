const cartDel = async (item) => {
  const url = "https://localhost:3000/cartDel";

  try {
    const data = { id: item.cartId };
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export default cartDel;
