
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, title, price, originalPrice, image } = product;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-md">
      <Link to={`/product/${id}`}>
        <div className="relative pt-[100%] overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      <CardContent className="pt-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        <div className="mt-2 flex items-center">
          <span className="font-semibold">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="ml-2 text-gray-400 line-through text-sm">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button className="w-full gap-2" size="sm">
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
