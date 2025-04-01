import { useState, useEffect } from "react";
import { useProducts, categories } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard.jsx";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const ProductsPage = () => {
  const { products, getProductsByCategory } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false);

  useEffect(() => {
    let result = selectedCategory === "all" ? [...products] : getProductsByCategory(selectedCategory);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query) || product.category.toLowerCase().includes(query));
    }
    if (showOnlyDiscounted) {
      result = result.filter(product => product.discountPrice || product.discountPercentage);
    }
    switch (sortOrder) {
      case "price-asc": result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)); break;
      case "price-desc": result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)); break;
      case "name-asc": result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "name-desc": result.sort((a, b) => b.name.localeCompare(a.name)); break;
    }
    setFilteredProducts(result);
  }, [products, selectedCategory, sortOrder, searchQuery, showOnlyDiscounted, getProductsByCategory]);

  return (
    <div className="container py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="hidden md:flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-64">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-64">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default Sorting</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ToggleGroup type="single" value={showOnlyDiscounted ? "discounted" : "all"} onValueChange={(value) => setShowOnlyDiscounted(value === "discounted")}>
            <ToggleGroupItem value="all">All Products</ToggleGroupItem>
            <ToggleGroupItem value="discounted">On Sale</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="relative w-64">
          <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
