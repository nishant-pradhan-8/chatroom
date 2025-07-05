import axios, { AxiosError } from "axios";

export const getProfile = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
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

export const getUsers = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users`,
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

export const updateProfile = async (email: string, username: string) => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
      { email, username },
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

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/change-password`,
      { oldPassword, newPassword },
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

export const deleteAccount = async (password: string) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/account`,
      {
        data: { password },
        withCredentials: true,
      }
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
