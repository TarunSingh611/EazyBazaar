// Function to add a new address
import { getToken } from "../Utils/TokenManagement.js";
async function apiAddAddress(data) {
  const url = "https://localhost:3000/addAddress";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const responseText = await response.json();
    return responseText;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
}

// Function to get user addresses
async function apiGetAddress() {
  const url = `https://localhost:3000/getAddresses`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: getToken(),
      },
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const responseText = await response.json();
    return responseText;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
}

// Function to delete a user address
async function apiDeleteAddress(addressID) {
  const url = `https://localhost:3000/deleteAddress/${addressID}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const responseText = await response.json();
    return responseText;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
}

// Function to update a user address
async function apiUpdateAddress(addressID, data) {
  const url = `https://localhost:3000/updateAddress/${addressID}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const responseText = await response.json();
    return responseText;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
}

export { apiAddAddress, apiGetAddress, apiDeleteAddress, apiUpdateAddress };
