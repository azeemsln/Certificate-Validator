import { endpoints } from './apis'

const {
  VALIDATE_URL,
} = endpoints


export const validate = async (certificateNumber) => {
  try {
    async function fetchUser() {
  try {
    const certificateNo = encodeURIComponent(certificateNumber);
    console.log(certificateNo);
    
    const response = await fetch(`${VALIDATE_URL}/${certificateNo}`);
  console.log(response);
  

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      const errorMessage = data.message || "Failed to validate certificate.";
      // console.error(errorMessage);
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
