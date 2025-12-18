const BASE_URL = "http://localhost:5000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  ADD_API: BASE_URL + "/admin/adduser",
  ALL_CERTIFICATES_API: BASE_URL + "/admin/getalluser",
  LOGIN_API: BASE_URL + "/admin/login",
  VALIDATE_URL: BASE_URL + "/user/getdetails",
}