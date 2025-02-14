import { useEffect, useState } from "react";
import postData from "../hooks/postData";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

function AddNewProduct() {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    const response = await axiosInstance.get("/categories");
    setCategories(response.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postData("/products", formData);
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category_id: "",
      image: null,
    });
    console.log(response);
    if (response.status === 201) toast.success("Product Added Successfully");
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add Product Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
            value={formData.description}
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
            value={formData.price}
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
            value={formData.stock}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 w-[300px] ml-2 "
          />
        </div>
        <div>
          <label htmlFor="category_id">Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 w-[300px] ml-2 "
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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
        </div>
        <button type="submit" className="w-full">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNewProduct;
