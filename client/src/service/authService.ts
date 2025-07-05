import axios, { AxiosError } from "axios";
import { type Credentials } from "../types/type";
export const register = async (credentials: Credentials) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
      credentials,
      { withCredentials: true }
    );
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return e.response?.data;
    } else {
      return "Unknown Error occurred. Please Try again";
    }
  }
};
export const login = async (credentials: Credentials) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
      credentials,
      { withCredentials: true }
    );
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return e.response?.data;
    } else {
      return "Unknown Error occurred. Please Try again";
    }
  }
};

export const logout = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return e.response?.data;
    } else {
      return "Unknown Error occurred. Please Try again";
    }
  }
};
