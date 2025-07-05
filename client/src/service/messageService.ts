import axios, { AxiosError } from "axios";
export const getMessageList = async (page: number) => {
  console.log(page);
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/messages?page=${page}`,
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

export const getMessageCount = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/messages/count`,
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
