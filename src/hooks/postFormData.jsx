const postFormData = async (url, file, additionalFields = {}) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    Object.entries(additionalFields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await axiosInstance.post(url, formData);
    return response.data;
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;
  }
};

export default postFormData;
