import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import updateImage from "../assets/update.png";
function ProfilePage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    getUserProfile();
  }, []);

  async function getUserProfile() {
    try {
      const response = await axiosInstance.get(`/users/profile`);
      setFormData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      toast.error("No Data To Update!");
    } else {
      const response = await axiosInstance.put(`/users/profile`, formData);
      if (response.status === 201) {
        toast.success("User Updated Successfully");
        getUserProfile();
      }
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <img
          src={updateImage}
          alt="update image"
          width={"20px"}
          className="m-3"
          onClick={() => setIsUpdating(!isUpdating)}
        />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            disabled={!isUpdating}
            className="border border-gray-300 rounded-md px-3 w-[300px] ml-2 "
          />
        </div>
        <div>
          <label htmlFor="description">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            disabled={!isUpdating}
            required
            className="border border-gray-300 rounded-md px-3 w-[300px] ml-2 "
          />
        </div>
        <div>
          <label htmlFor="price">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled={!isUpdating}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 w-[300px] ml-2 "
          />
        </div>
        <button type="submit" className="w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
export default ProfilePage;
