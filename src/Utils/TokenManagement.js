const saveToken = (token) => {
  if (!token) {
    console.log("no token");
    return;
  }
  localStorage.setItem("userToken", token);
};

const getToken = () => {
  return localStorage.getItem("userToken");
};

const deleteToken = () => {
  localStorage.removeItem("userToken");
};

export { saveToken, getToken, deleteToken };
