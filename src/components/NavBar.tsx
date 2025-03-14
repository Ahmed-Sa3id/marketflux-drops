
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="border-b sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          DropStore
        </Link>

        {/* Search - hidden on mobile */}
        <div className="hidden md:flex relative w-1/3">
          <form onSubmit={handleSearch} className="w-full">
            <Input 
              className="pr-10" 
              placeholder="Search products..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
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
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-4">
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
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
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Input 
                  className="w-full pl-10" 
                  placeholder="Search products..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
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
