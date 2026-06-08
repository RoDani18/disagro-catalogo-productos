import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/backend",
});

export const headerApi = {
    "Content-Type": "application/json",
}; 