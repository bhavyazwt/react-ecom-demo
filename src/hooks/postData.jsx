import axiosInstance from "../../utils/axiosInstance";

const postData = async (url, payload) => {
  try {
    const response = await axiosInstance.post(url, payload);
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export default postData;
