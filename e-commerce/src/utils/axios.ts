import axios from "axios";
import { PRODUCTS_BASE_URL } from "../constants";

const client = axios.create({
  baseURL: PRODUCTS_BASE_URL,
});

export default client;
