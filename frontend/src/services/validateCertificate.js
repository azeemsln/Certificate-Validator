
export const validate = async (certificateNumber) => {
  try {
   const API_URL=`http://localhost:5001/api/v1/user/getdetails/${certificateNumber}`
    async function fetchUser() {
  try {
    const response = await fetch(API_URL);
    // console.log("Validate API RESPONSE............", response)

    // Parse the response data
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      const errorMessage = data.message || "Failed to validate certificate.";
      console.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
  }
    catch (error) {
    console.error("Error Validating Certificate:", error);
  }
};
const data = await fetchUser();
    return data;
  } catch (error) {
    // console.log("Error: ", error);
    throw Error(error);
  }
};
