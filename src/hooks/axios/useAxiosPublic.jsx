import axios from "axios";

import BASE_URL from "../../api/api";

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
