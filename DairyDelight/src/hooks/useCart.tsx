
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  discountPercentage?: number;
  image: string;
  category: string;
  featured?: boolean;
  modelUrl?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  couponDiscount: number;
  couponCode: string | null;
  totalPrice: number;
  totalItems: number;
  finalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  
  // Initialize cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    
    const storedCoupon = localStorage.getItem("couponCode");
    const storedDiscount = localStorage.getItem("couponDiscount");
    
    if (storedCoupon) setCouponCode(storedCoupon);
    if (storedDiscount) setCouponDiscount(Number(storedDiscount));
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Save coupon info to localStorage
  useEffect(() => {
    if (couponCode) {
      localStorage.setItem("couponCode", couponCode);
      localStorage.setItem("couponDiscount", couponDiscount.toString());
    } else {
      localStorage.removeItem("couponCode");
      localStorage.removeItem("couponDiscount");
    }
  }, [couponCode, couponDiscount]);
  
  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prevItems => {
      // Check if product already in cart
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Update quantity if product exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success(`Added ${quantity} more ${product.name} to cart`);
        return updatedItems;
      } else {
        // Add new product to cart
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, { product, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.product.id === productId);
      if (item) {
        toast.success(`Removed ${item.product.name} from cart`);
      }
      return prevItems.filter(item => item.product.id !== productId);
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
    setCouponCode(null);
    setCouponDiscount(0);
    toast.success("Cart has been cleared");
  };
  
  // Mock coupon system - in a real app, this would validate against a database
  const applyCoupon = (code: string) => {
    // Mock coupon codes
    const validCoupons: Record<string, number> = {
      "DAIRY10": 10,
      "CHEESE20": 20,
      "MILK15": 15,
      "SUMMER25": 25
    };
    
    if (code in validCoupons) {
      setCouponCode(code);
      setCouponDiscount(validCoupons[code]);
      toast.success(`Coupon applied: ${code} (${validCoupons[code]}% off)`);
      return true;
    } else {
      toast.error("Invalid coupon code");
      return false;
    }
  };
  
  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice = item.product.discountPrice || item.product.price;
    return sum + (itemPrice * item.quantity);
  }, 0);
  
  const finalPrice = couponDiscount > 0 
    ? totalPrice * (1 - couponDiscount / 100) 
    : totalPrice;
  
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    couponDiscount,
    couponCode,
    totalPrice,
    totalItems,
    finalPrice
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  
  return context;
};
