
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Heart } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Product } from "@/components/ProductCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/hooks/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  // Mock additional images
  const additionalImages = [
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
  ];

  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = MOCK_PRODUCTS.find((p) => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow p-4 flex items-center justify-center">
          <p>Loading product details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const { title, price, originalPrice, image, category, rating } = product;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="container px-4 mx-auto">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to="/products">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
              </Link>
            </Button>
            <div className="text-sm text-gray-500 mb-2">
              <Link to="/" className="hover:underline">Home</Link> / <Link to="/products" className="hover:underline">Products</Link> / <Link to={`/category/${category.toLowerCase().replace(" & ", "-")}`} className="hover:underline">{category}</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <img
                  src={activeImage === 0 ? image : additionalImages[activeImage - 1]}
                  alt={title}
                  className="object-cover w-full h-full"
                />
                {discount > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    -{discount}%
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveImage(0)}
                  className={`aspect-square w-20 overflow-hidden rounded-md border ${activeImage === 0 ? "ring-2 ring-primary" : ""}`}
                >
                  <img src={image} alt={title} className="object-cover w-full h-full" />
                </button>
                {additionalImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx + 1)}
                    className={`aspect-square w-20 overflow-hidden rounded-md border ${activeImage === idx + 1 ? "ring-2 ring-primary" : ""}`}
                  >
                    <img src={img} alt={`${title} - view ${idx + 1}`} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{title}</h1>
              <div className="flex items-center">
                <div className="flex items-center text-yellow-500 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      fill={i < Math.floor(rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{rating} ({Math.floor(rating * 12)}) reviews</span>
              </div>

              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">${price.toFixed(2)}</span>
                {originalPrice && (
                  <span className="text-gray-500 line-through mb-1">${originalPrice.toFixed(2)}</span>
                )}
              </div>

              <p className="text-gray-600 my-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis libero in eros fringilla, in varius nulla malesuada. Cras ullamcorper orci vel nibh elementum, vitae ullamcorper est luctus.
              </p>

              <div className="pt-4 border-t">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center">
                    <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Qty" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(10)].map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="ml-3 text-sm text-gray-500">In stock</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="flex-1 gap-2" 
                    size="lg"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5" /> Add to Cart
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t">
                <h3 className="text-lg font-medium mb-2">Product Details</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>High-quality materials</li>
                  <li>Durable construction</li>
                  <li>Easy to use</li>
                  <li>30-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
