const postSignUp = (data) => {
  const url = "https://localhost:3000/signup";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    mode: "cors",
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

const getSignup = async () => {
  const url = "https://localhost:3000/signup";
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (response) {
      return await response.text();
    } else {
      throw new Error("signup request failed");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export { getSignup, postSignUp };
