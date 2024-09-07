import axios from "axios";
import { PRODUCTS_API_URL, BACKEND_API } from "../constants";

const client = axios.create({
  baseURL: BACKEND_API,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const productClient = axios.create({
  baseURL: PRODUCTS_API_URL,
});

export default client;
