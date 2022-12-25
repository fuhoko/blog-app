import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    common: {
      ContentType: 'application/json',
      Accept: 'application/json'
    }
  },
})

httpRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('tttt')
    if (Array.isArray(error.response.data.message))
      throw error.response.data.message[0]
    else
      throw error.response.data.message
  }
)

export default httpRequest