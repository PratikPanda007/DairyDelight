import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import gsap from "gsap";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
            );
        }
    }, []);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const productImage = {
      "width": "100%",
      "height": "30vh",
      "objectFit": "cover",
  }

  const discountBadgeStyle = {
    backgroundColor: "#FFD700",
    color: "black",
    fontSize: "0.75rem",
    fontWeight: "600",
    padding: "4px 8px",
    borderRadius: "8px",
    position: "absolute",
    top: "8px",
    left: "8px",
};

const featuredBadgeStyle = {
  backgroundColor: "#87CEEB", // SkyBlue color
  color: "black",
  fontSize: "0.75rem",
  fontWeight: "600",
  padding: "4px 8px",
  borderRadius: "8px",
  position: "absolute",
  top: "8px",
  right: "8px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
};



    return (
        <Card ref={cardRef} className="w-[240px] bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg group">
            <Link to={`/product/${product.id}`} className="block">
                <div className="relative w-full h-48 overflow-hidden">
                    <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" style={productImage} />
                    {product.discountPercentage && (
                        <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded !important" style={discountBadgeStyle}>
                            {product.discountPercentage}% OFF
                        </div>
                    )}
                    {product.featured && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1" style={featuredBadgeStyle}>
                            <Star className="h-4 w-4" /> Featured
                        </div>
                    )}
                </div>
                <CardContent className="p-4">
                    <h3 className="text-lg font-medium truncate">{product.name}</h3>
                    <div className="mt-2 flex items-center gap-2">
                        {product.discountPrice ? (
                            <>
                                <span className="line-through text-sm text-muted-foreground">${product.price.toFixed(2)}</span>
                                <span className="text-lg font-bold text-primary">${product.discountPrice.toFixed(2)}</span>
                            </>
                        ) : (
                            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                        )}
                    </div>
                    <Button size="sm" onClick={handleAddToCart} className="mt-4 w-full bg-primary text-white">
                        <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                </CardContent>
            </Link>
        </Card>
    );
};

export default ProductCard;
