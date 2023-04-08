import axios, { AxiosInstance } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const createAxiosClient = async () => {
  const jwtToken: string = await AsyncStorage.getItem("@stylify:token") || "";

  const axiosClient = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8080": "http://ec2-35-155-214-56.us-west-2.compute.amazonaws.com/api",
    headers: {
      "Authorization": `Bearer ${jwtToken}`
    }
  })

  return {
    axiosClient
  }
}





