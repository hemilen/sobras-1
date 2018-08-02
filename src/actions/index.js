import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:3030",
  headers: {
    "Content-Type": "application/json"
  }
})

export const sobras = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json"
  }
})
