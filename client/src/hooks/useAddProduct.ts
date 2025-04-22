import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../type/product";

const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: async (newProduct: Product) => {
      const response = await axios.post<Product>(
        "http://localhost:5000/api/products",
        newProduct
      );
      return response.data;
    },
    onSuccess: (newProduct: Product) => {
      queryClient.setQueryData(
        ["products"],
        (oldProducts: Product[] | undefined) => {
          return oldProducts ? [...oldProducts, newProduct] : [newProduct];
        }
      );
    },
  });
};

export default useAddProduct;
