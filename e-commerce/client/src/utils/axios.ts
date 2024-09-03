import axios from "axios";
import { PRODUCTS_BASE_URL, BACKEND_API } from "../constants";

const client = axios.create({
  baseURL: BACKEND_API,
});

export default client;
