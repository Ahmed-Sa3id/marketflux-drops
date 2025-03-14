
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Find Your Perfect Products at Unbeatable Prices
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Shop thousands of high-quality items from top brands, 
              delivered straight to your door without the premium price tag.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
              alt="Premium products" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
