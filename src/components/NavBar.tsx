
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          DropStore
        </Link>

        {/* Search - hidden on mobile */}
        <div className="hidden md:flex relative w-1/3">
          <Input 
            className="pr-10" 
            placeholder="Search products..."
            type="search"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {/* Navigation - desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/products" className="hover:text-primary transition-colors">
            Products
          </Link>
          <Link to="/categories" className="hover:text-primary transition-colors">
            Categories
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-4">
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50">
          <div className="px-4 py-2">
            <Input 
              className="w-full mb-4" 
              placeholder="Search products..."
              type="search"
            />
            <nav className="flex flex-col">
              <Link 
                to="/products" 
                className="py-2 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/categories" 
                className="py-2 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className="py-2 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
