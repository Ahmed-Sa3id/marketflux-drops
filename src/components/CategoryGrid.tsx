
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryItem {
  id: number;
  name: string;
  image: string;
  slug: string;
}

const categories: CategoryItem[] = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    slug: "electronics"
  },
  {
    id: 2,
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    slug: "home-kitchen"
  },
  {
    id: 3,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    slug: "fashion"
  },
  {
    id: 4,
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    slug: "beauty"
  },
  {
    id: 5,
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3797?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    slug: "sports-outdoors"
  },
  {
    id: 6,
    name: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    slug: "health-wellness"
  }
];

const CategoryGrid = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Shop by Category</h2>
        <p className="text-gray-600 text-center mb-8">Browse our products by category</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.slug}`}>
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow relative group">
                <div className="relative pt-[75%] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all"></div>
                </div>
                <CardContent className="absolute bottom-0 left-0 right-0 text-center p-4">
                  <h3 className="text-xl font-semibold text-white drop-shadow-md">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
