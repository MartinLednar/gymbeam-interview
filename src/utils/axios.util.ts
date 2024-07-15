import axios from "axios";

//TODO move project secret to env vars
export const axiosClient = axios.create({
  baseURL: "https://6694cde44bd61d8314c8b4a3.mockapi.io/api/",
});
