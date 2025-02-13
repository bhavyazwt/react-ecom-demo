import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateProduct() {
  const [initialData, setinitialData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    image: null,
  });
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    async function getProduct() {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setinitialData(response.data.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getProduct();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinitialData({ ...initialData, [name]: value });
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      toast.error("No Data To Update!");
    } else {
      const response = await axiosInstance.patch(`/products/${id}`, formData);
      // setinitialData(response.data.data[0]);
      if (response.status === 200)
        toast.success("Product Updated Successfully");
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Update Product Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={initialData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 w-[300px] ml-2 "
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={initialData.description}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 w-[300px] ml-2 "
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={initialData.price}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 w-[300px] ml-2 "
          />
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            name="stock"
            value={initialData.stock}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 w-[300px] ml-2 "
          />
        </div>
        <div>
          <label htmlFor="category_id">Category ID</label>
          <input
            type="number"
            name="category_id"
            value={initialData.category_id}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 w-[300px] ml-2 "
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            className="border border-gray-300 rounded-md px-3 w-[300px] ml-2 "
          />
          <div className="mt-2">
            Preview:
            <img src={initialData.image_url} alt="" />
          </div>
        </div>
        <button type="submit" className="w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
export default UpdateProduct;
