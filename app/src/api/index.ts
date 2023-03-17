import axios, { AxiosInstance } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const createAxiosClient = async () => {
  const jwtToken: string = await AsyncStorage.getItem("@stylify:token") || "";

  const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Authorization": `Bearer ${jwtToken}`
    }
  })

  return {
    axiosClient
  }
}





