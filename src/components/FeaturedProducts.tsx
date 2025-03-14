
import { useState, useEffect } from "react";
import ProductCard, { Product } from "./ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, you would fetch products from an API
    // For now, we're using mock data
    setProducts(MOCK_PRODUCTS.slice(0, 8));
  }, []);

  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Featured Products</h2>
        <p className="text-gray-600 text-center mb-8">Discover our handpicked selection of top products</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
