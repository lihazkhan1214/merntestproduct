import React from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import useProducts from "./hooks/useProducts";

const App: React.FC = () => {
  const { data: products = [], isLoading, isError, error } = useProducts();

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>
      <ProductForm />
      <ProductList products={products} />
    </div>
  );
};

export default App;
