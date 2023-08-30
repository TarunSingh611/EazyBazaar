const postLogin = (data) => {
  const url = "https://localhost:3000/login";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getLogin = async () => {
  const url = "https://localhost:3000/login";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (response) {
      return await response.text();
    } else {
      throw new Error("Login request failed");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export { getLogin, postLogin };
