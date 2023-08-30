import { getToken } from "../Utils/TokenManagement";
async function apiSaveOrder(data) {
  console.log("data Sent :", data);
  let token = getToken();
  try {
    const response = await fetch("https://localhost:3000/saveOrder", {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Request was successful (status code 200-299)
      const responseData = await response.json();
      return responseData;
      // return {
      //   message: responseData.message,
      // };
    } else {
      // Request was not successful
      const errorData = await response.json();
      console.error("Failed to save order:", errorData.message);
      return { status: errorData.status, message: errorData.message };
    }
  } catch (error) {
    console.error("An error occurred while saving the order:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export { apiSaveOrder };
