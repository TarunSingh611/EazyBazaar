import { getToken } from "../Utils/TokenManagement";

async function apiGetPurchases() {
  let token = getToken();
  try {
    const response = await fetch("https://localhost:3000/getPurchases", {
      method: "GET",
      headers: {
        token,
      },
    });

    if (response.ok) {
      // Request was successful (status code 200-299)
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    console.error("An error occurred while fetching purchases:", error);
    return { status: error.status, message: error.message };
  }
}

export { apiGetPurchases };
