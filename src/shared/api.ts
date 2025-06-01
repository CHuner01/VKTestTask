import axios from "axios";

export const BASE_URL: string = "http://localhost:3000/"

export const api = axios.create({
    baseURL: BASE_URL,
})
