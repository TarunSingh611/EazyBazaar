// getProd function
async function getProd(id) {
  if (id) {
    const url = "https://localhost:3000/showDetail";
    const data = { id };

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((parsedResponse) => parsedResponse);
  }
  id = null;
}
export default getProd;
