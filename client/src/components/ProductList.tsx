import type { Product } from "../type/product";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No products found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by adding a new product
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-bold text-gray-800">Product Inventory</h2>
        <span className="text-sm text-gray-500">
          {products.length} item{products.length !== 1 && "s"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

// Reusable Product Card Component
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <article className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="mt-2 text-2xl font-bold text-indigo-600">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <div className="bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm font-medium">
        In Stock
      </div>
    </div>
    <div className="mt-4 border-t border-gray-100 pt-4">
      <dl className="space-y-2">
        <div className="flex justify-between">
          <dt className="text-sm text-gray-500">Product ID</dt>
          <dd className="text-sm text-gray-700 font-mono">
            {product._id?.slice(-6)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm text-gray-500">Last Updated</dt>
          <dd className="text-sm text-gray-700">2 days ago</dd>
        </div>
      </dl>
    </div>
  </article>
);

export default ProductList;
