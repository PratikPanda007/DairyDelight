import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShoppingBag,
  Trash,
  Plus,
  Minus,
  ChevronLeft,
  TicketCheck,
} from "lucide-react";
import gsap from "gsap";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    couponCode,
    couponDiscount,
    totalPrice,
    finalPrice,
  } = useCart();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState("");
  const cartRef = useRef(null);

  useEffect(() => {
    if (cartRef.current) {
      gsap.from(cartRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power1.out",
      });
    }
  }, []);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput("");
    }
  };

  const animateQuantityChange = (element) => {
    gsap.fromTo(
      element,
      { scale: 0.9 },
      { scale: 1, duration: 0.2, ease: "back.out(2)" }
    );
  };

  const handleQuantityChange = (productId, newQuantity, e) => {
    updateQuantity(productId, newQuantity);
    if (e.currentTarget) {
      animateQuantityChange(e.currentTarget);
    }
  };

  const handleRemoveItem = (productId, e) => {
    const item = e.currentTarget.closest(".cart-item");
    if (item) {
      gsap.to(item, {
        x: -50,
        opacity: 0,
        duration: 0.3,
        onComplete: () => removeFromCart(productId),
      });
    } else {
      removeFromCart(productId);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button onClick={() => navigate("/products")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4" ref={cartRef}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4 mr-1" /> Continue Shopping
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.product.id} className="cart-item overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-32 h-32 overflow-hidden">
                  <Link to={`/product/${item.product.id}`}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </Link>
                </div>

                <CardContent className="flex-1 p-4 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-medium hover:text-dairy-600 dark:hover:text-dairy-400 transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {item.product.category}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={(e) => handleRemoveItem(item.product.id, e)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={(e) =>
                          handleQuantityChange(
                            item.product.id,
                            Math.max(1, item.quantity - 1),
                            e
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={(e) =>
                          handleQuantityChange(
                            item.product.id,
                            item.quantity + 1,
                            e
                          )
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <span className="font-semibold">
                        $
                        {(
                          (item.product.discountPrice || item.product.price) *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                      {item.product.discountPrice && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
          <Button
            variant="outline"
            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-900 dark:hover:bg-red-900/20"
            onClick={() => clearCart()}
          >
            <Trash className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
                item(s) in your cart
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal
                </span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span className="flex items-center">
                    <TicketCheck className="h-4 w-4 mr-1" />
                    Coupon ({couponCode})
                  </span>
                  <span>
                    -${(totalPrice * (couponDiscount / 100)).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Shipping
                </span>
                <span>{totalPrice >= 50 ? "Free" : "$5.99"}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>
                  ${(finalPrice + (totalPrice >= 50 ? 0 : 5.99)).toFixed(2)}
                </span>
              </div>

              <form onSubmit={handleApplyCoupon} className="flex mt-4 gap-2">
                <Input
                  placeholder="Coupon Code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="outline">
                  Apply
                </Button>
              </form>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                Try these codes: DAIRY10, CHEESE20, MILK15, SUMMER25
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-dairy-600 hover:bg-dairy-700">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
