import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_DEV_API, REACT_APP_PROD_API } from "@env";

export const createAxiosClient = async () => {
  const jwtToken: string = (await AsyncStorage.getItem("@stylify:token")) || "";

  const axiosClient = axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? REACT_APP_DEV_API
        : REACT_APP_PROD_API,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return {
    axiosClient,
  };
};
