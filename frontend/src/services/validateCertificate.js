
export const validate = async (certificateNumber) => {
  try {
   const API_URL=`http://localhost:5000/api/v1/user/getdetails/${certificateNumber}`
    async function fetchUser() {
  try {
    const response = await fetch(API_URL);

    // Parse the response data
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      const errorMessage = data.message;
      console.error(errorMessage);
    }
  }
    catch (error) {
    console.error("Error Validating Certificate:", error);
  }
};
const data = await fetchUser();



    return data;
  } catch (error) {
    console.log("Error: ", error.response);
    throw Error(error.response.data.message);
  }
};
