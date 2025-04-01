import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { ProductModel } from "@/components/ProductModel";
import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import gsap from "gsap";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const productImageRef = useRef(null);
  const productInfoRef = useRef(null);

  const product = getProductById(id || "");

  useEffect(() => {
    if (!product) return;

    const tl = gsap.timeline();
    tl.from(productImageRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    }).from(
      productInfoRef.current,
      {
        x: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );
  }, [product]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      gsap.to("#add-to-cart-btn", {
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });
    }
  };

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </div>
    );
  }

  const originalPrice = product.price;
  const currentPrice = product.discountPrice || product.price;
  const discountPercentage = product.discountPercentage || 0;

  return (
    <div className="container py-8 px-4">
      <Button
        variant="outline"
        size="sm"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div ref={productImageRef} className="space-y-6">
          <Card className="overflow-hidden border-0 shadow-md">
            <CardContent className="p-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto aspect-square object-cover"
              />
            </CardContent>
          </Card>

          {product.modelUrl && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">3D Preview</h3>
              <ProductModel modelUrl={product.modelUrl} />
            </div>
          )}
        </div>

        <div ref={productInfoRef}>
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <span className="text-sm capitalize px-3 py-1 rounded-full">
                  {product.category}
                </span>
                {product.featured && (
                  <div className="ml-3 flex items-center text-sm px-3 py-1 rounded-full">
                    <Star className="h-3 w-3 mr-1" /> Featured
                  </div>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
              <div className="mt-4 flex items-baseline">
                {discountPercentage > 0 && (
                  <span className="text-lg line-through mr-3">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-2xl md:text-3xl font-semibold">
                  ${currentPrice.toFixed(2)}
                </span>
                {discountPercentage > 0 && (
                  <span className="ml-3 text-sm font-semibold text-white bg-butter-500 dark:bg-butter-600 px-2 py-1 rounded">
                    Save {discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center border rounded-md overflow-hidden mr-4">
                <Button
                  onClick={handleDecrement}
                  disabled={quantity === 1}
                  className="h-10 w-10 rounded-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  onClick={handleIncrement}
                  className="h-10 w-10 rounded-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button id="add-to-cart-btn" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300">
                <Truck className="h-5 w-5 text-dairy-600 dark:text-dairy-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Free shipping on orders over $50
                  </p>
                  <p className="mt-1">Usually ships within 1-2 business days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Tabs defaultValue="details">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">
                  Product Details
                </TabsTrigger>
                <TabsTrigger value="ingredients" className="flex-1">
                  Ingredients
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="flex-1">
                  Nutrition Facts
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Product Type
                        </span>
                        <span>{product.category}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Storage
                        </span>
                        <span>Refrigerated</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Shelf Life
                        </span>
                        <span>7-10 days</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Organic
                        </span>
                        <span>Yes</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      {product.category === "milk" &&
                        "Grade A Milk, Vitamin D3."}
                      {product.category === "cheese" &&
                        "Cultured Milk, Salt, Enzymes."}
                      {product.category === "yogurt" &&
                        "Cultured Pasteurized Milk, Live Active Cultures."}
                      {product.category === "butter" && "Sweet Cream, Salt."}
                      {product.category === "cream" && "Grade A Cream."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="nutrition" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="border p-4 rounded-md">
                      <h3 className="font-bold text-lg mb-2">
                        Nutrition Facts
                      </h3>
                      <div className="border-b border-gray-300 dark:border-gray-700 pb-2 mb-2">
                        <p className="text-sm">
                          Serving Size: 1 serving (100g)
                        </p>
                      </div>
                      <ul className="space-y-1">
                        <li className="flex justify-between">
                          <span>Calories</span>
                          <span>
                            {product.category === "milk" && "150"}
                            {product.category === "cheese" && "402"}
                            {product.category === "yogurt" && "120"}
                            {product.category === "butter" && "717"}
                            {product.category === "cream" && "340"}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Total Fat</span>
                          <span>
                            {product.category === "milk" && "8g"}
                            {product.category === "cheese" && "33g"}
                            {product.category === "yogurt" && "5g"}
                            {product.category === "butter" && "81g"}
                            {product.category === "cream" && "36g"}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Protein</span>
                          <span>
                            {product.category === "milk" && "8g"}
                            {product.category === "cheese" && "25g"}
                            {product.category === "yogurt" && "10g"}
                            {product.category === "butter" && "0.9g"}
                            {product.category === "cream" && "2g"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
