import { useState, useCallback } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Product } from "../type/product";
import useAddProduct from "../hooks/useAddProduct";

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const { mutate: addProduct } = useAddProduct();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const priceValue = parseFloat(formData.price);
      if (isNaN(priceValue)) {
        alert("Please enter a valid price");
        return;
      }

      const newProduct: Product = {
        name: formData.name.trim(),
        price: priceValue,
      };

      addProduct(newProduct, {
        onSuccess: () => {
          setFormData({ name: "", price: "" });
        },
      });
    },
    [formData, addProduct]
  );

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Product Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />

        <InputField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          min="0"
          step="0.01"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string;
  step?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  min,
  step,
  required,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      step={step}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
    />
  </div>
);

export default ProductForm;
