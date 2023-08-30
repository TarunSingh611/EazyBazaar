// Assuming you have obtained Google OAuth data
function apiGoogleAuth(data) {
  const googleAuthData = {
    ClientId: data.clientId,
    Cred: data.credential,
  };

  const url = "https://localhost:3000/OauthGoogle";
  // Make a POST request to your C# backend endpoint
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(googleAuthData),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}
export default apiGoogleAuth;
