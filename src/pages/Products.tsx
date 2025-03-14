
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Check, ChevronDown, ChevronUp, Search, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  // Get query parameters from URL
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort");

    if (category) {
      setSelectedCategories([category]);
    }
    if (search) {
      setSearchQuery(search);
    }
    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)]);
    }
    if (sort) {
      setSortOption(sort);
    }
  }, [searchParams]);

  // Load products
  useEffect(() => {
    // In a real app, this would be an API call
    setProducts(MOCK_PRODUCTS);
    
    // Extract unique categories
    const uniqueCategories = Array.from(
      new Set(MOCK_PRODUCTS.map((product) => product.category))
    );
    setCategories(uniqueCategories);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price range
    result = result.filter(
      (product) => 
        product.price >= priceRange[0] && 
        product.price <= priceRange[1]
    );

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (featured)
        break;
    }

    setFilteredProducts(result);

    // Update URL query parameters
    const params = new URLSearchParams();
    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0]);
    }
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    if (priceRange[0] > 0 || priceRange[1] < 200) {
      params.set("minPrice", priceRange[0].toString());
      params.set("maxPrice", priceRange[1].toString());
    }
    if (sortOption !== "featured") {
      params.set("sort", sortOption);
    }
    setSearchParams(params, { replace: true });
  }, [products, selectedCategories, priceRange, searchQuery, sortOption, setSearchParams]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setSearchQuery("");
    setSortOption("featured");
    setSearchParams({});
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">All Products</h1>
            
            {/* Mobile filter button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" /> Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md overflow-auto">
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Categories</h3>
                    </div>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Button
                            variant="ghost"
                            className="flex items-center justify-start p-2 w-full"
                            onClick={() => toggleCategory(category)}
                          >
                            <div
                              className={`w-5 h-5 mr-2 border rounded flex items-center justify-center ${
                                selectedCategories.includes(category)
                                  ? "bg-primary border-primary"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedCategories.includes(category) && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            {category}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-4">Price Range</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={priceRange}
                        min={0}
                        max={200}
                        step={5}
                        onValueChange={handlePriceChange}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort dropdown */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Search bar */}
          <div className="mb-6">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters - Desktop */}
            <div className="hidden lg:block">
              <div className="bg-white shadow rounded-lg p-6 sticky top-20">
                <div className="mb-6">
                  <div
                    className="flex items-center justify-between mb-3 cursor-pointer"
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  >
                    <h3 className="font-medium">Categories</h3>
                    {isCategoryOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                  {isCategoryOpen && (
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Button
                            variant="ghost"
                            className="flex items-center justify-start p-2 w-full"
                            onClick={() => toggleCategory(category)}
                          >
                            <div
                              className={`w-5 h-5 mr-2 border rounded flex items-center justify-center ${
                                selectedCategories.includes(category)
                                  ? "bg-primary border-primary"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedCategories.includes(category) && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            {category}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6 pt-2 border-t">
                  <div
                    className="flex items-center justify-between mb-3 cursor-pointer"
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                  >
                    <h3 className="font-medium">Price Range</h3>
                    {isPriceOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                  {isPriceOpen && (
                    <div className="px-2">
                      <Slider
                        defaultValue={priceRange}
                        min={0}
                        max={200}
                        step={5}
                        onValueChange={handlePriceChange}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-medium mb-3">No products found</h2>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-500">
                      Showing {filteredProducts.length} products
                    </p>
                    <div className="md:hidden">
                      <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
