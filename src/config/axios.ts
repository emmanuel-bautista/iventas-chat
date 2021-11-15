import axiosClient from "axios";

const axios = axiosClient.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  // headers: {
  //   "x-access-token": localStorage.getItem("jwt") ?? "",
  // },
});

export const setToken = (token: string) => {
  axios.defaults.headers.common["x-access-token"] = token;
};

export default axios;
