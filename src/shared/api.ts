import axios from "axios";

export const BASE_URL: string = "http://localhost:3000/users5"

export const api = axios.create({
    baseURL: BASE_URL,
})


// json-server --watch db.json --port 3000