async function apiGetOrders(data) {
  console.log();
  // const sendData = { id: data };
  try {
    const response = await fetch("https://localhost:3000/getOrders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Request was successful (status code 200-299)
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    console.error("An error occurred while saving the order:", error);
    return { status: error.status, message: error.message };
  }
}

export { apiGetOrders };
