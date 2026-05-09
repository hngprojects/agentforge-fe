import axios, { AxiosInstance } from 'axios'

axios.defaults.withCredentials = true

const Calls = (baseURL?: string): AxiosInstance => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
}

const CallsWithBearer = (
  baseURL: string,
  authorization: string
): AxiosInstance => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${authorization}`,
    },
  })
}

export { Calls, CallsWithBearer }
