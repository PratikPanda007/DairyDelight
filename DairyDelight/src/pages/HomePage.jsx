import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Star } from "lucide-react";
import gsap from "gsap";

const HomePage = () => {
  const { products, getFeaturedProducts, getProductsByCategory } =
    useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  const featuredProducts = getFeaturedProducts();
  const filteredProducts =
    selectedCategory === "all"
      ? products.slice(0, 8)
      : getProductsByCategory(selectedCategory).slice(0, 8);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(heroRef.current, { opacity: 0, duration: 0.8, ease: "power2.out" })
      .from(
        headingRef.current,
        { y: 50, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .from(
        textRef.current,
        { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .from(
        buttonRef.current,
        { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
  }, []);

  return (
    <div className="min-h-screen">
      <section
        ref={heroRef}
        className="relative bg-cream-50 dark:bg-gray-900 overflow-hidden"
        style={{"height": "94vh"}}
      >
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
          <img
            src="https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Dairy background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container relative z-10 px-4 py-20 md:py-32">
          <div className="max-w-2xl space-y-6 py-16 px-4 ">
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-dairy-900 dark:text-white"
            >
              Fresh Dairy,
              <br />
              <span className="text-dairy-600 dark:text-dairy-400">
                Delivered Daily
              </span>
            </h1>
            <p
              ref={textRef}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300"
            >
              Discover our premium selection of organic dairy products from
              local farms to your table.
            </p>
            <div ref={buttonRef}>
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-dairy-600 hover:bg-dairy-700 text-white mt-6"
                  style={{"marginTop": "20vh"}}
                >
                  Browse Products <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-12 px-4 bg-white dark:bg-gray-950 py-16 px-4">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-butter-500" fill="currentColor" />
                <h2 className="text-2xl font-bold">Featured Products</h2>
              </div>
              <Link to="/products">
                <Button
                  variant="outline"
                  className="text-dairy-600 border-dairy-600 hover:bg-dairy-50 dark:text-dairy-400"
                >
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4 bg-cream-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Browse Our Products</h2>
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setSelectedCategory}
          >
            <TabsList className="mb-8 bg-white dark:bg-gray-800 p-1 overflow-x-auto flex-wrap">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="milk">Milk</TabsTrigger>
              <TabsTrigger value="cheese">Cheese</TabsTrigger>
              <TabsTrigger value="yogurt">Yogurt</TabsTrigger>
              <TabsTrigger value="butter">Butter</TabsTrigger>
              <TabsTrigger value="cream">Cream</TabsTrigger>
            </TabsList>
            <TabsContent value={selectedCategory} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
