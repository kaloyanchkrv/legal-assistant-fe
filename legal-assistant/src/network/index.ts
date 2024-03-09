import axios from "axios";

const getOptions = () => ({
  // baseURL: "http://localhost:8080",
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  // paramsSerializer: {
  //   indexes: null,
  // },
  timeout: 60000,
  withCredentials: false
});

const apiClient = axios.create(getOptions());

export { apiClient }
