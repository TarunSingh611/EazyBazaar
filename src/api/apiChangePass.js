const getChangePass = async () => {
  const url = "https://localhost:3000/changePass";
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (response) {
      const res = await response.json();
      return res.re;
    } else {
      throw new Error("change Pass failed");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const postChangePass = (password) => {
  const url = "http://localhost:3000/changePass";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currpass: password }),
    credentials: "include",
  })
    .then((response) => response.text())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error verifying password:", error);
    });
};

export { getChangePass, postChangePass };
