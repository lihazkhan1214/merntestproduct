import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../type/product";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get("http://localhost:5000/api/products");
  return response.data;
};

const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export default useProducts;
