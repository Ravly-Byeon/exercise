import axios from "axios";
import store from "@/store";

const instance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 12000
})