import axios from "axios";
import store from "@/store";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 12000
});

instance.interceptors.response.use(response => {
    return response
}, error => {
    return error;
});

export const ins = instance;