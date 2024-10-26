// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000";

export const signUp = (data) => axios.post(`${API_URL}/user/signup`, data);
export const signIn = (data) => axios.post(`${API_URL}/user/signin`, data);
export const signOut = (data) => axios.post(`${API_URL}/user/signout`, data);
export const getUsers = () => axios.get(`${API_URL}/user/get`);
export const updateUser = (data) => axios.put(`${API_URL}/user/update`, data);
export const deleteUser = (data) => axios.delete(`${API_URL}/user/delete`, { data });
