
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, User, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <nav className="sticky top-0 z-50 bg-cream-50 dark:bg-gray-900 shadow-sm border-b border-cream-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6 text-dairy-600 dark:text-dairy-400" />
            <span className="text-xl font-bold text-dairy-800 dark:text-white">DairyDelight</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-dairy-600 dark:hover:text-dairy-400">Home</Link>
            <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-dairy-600 dark:hover:text-dairy-400">Products</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-dairy-600 dark:hover:text-dairy-400">About</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-dairy-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>
            
            <Link to="/admin">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="mt-4 pb-4 md:hidden animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-dairy-600 dark:hover:text-dairy-400 py-2 px-3 rounded-md hover:bg-cream-100 dark:hover:bg-gray-800">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-dairy-600 dark:hover:text-dairy-400 py-2 px-3 rounded-md hover:bg-cream-100 dark:hover:bg-gray-800">
                Products
              </Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-dairy-600 dark:hover:text-dairy-400 py-2 px-3 rounded-md hover:bg-cream-100 dark:hover:bg-gray-800">
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
