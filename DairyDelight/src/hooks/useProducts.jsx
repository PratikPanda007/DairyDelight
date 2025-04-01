import { createContext, useContext, useState, useEffect } from "react";

// Initial mock product data
const initialProducts = [
  {
    id: "1",
    name: "Organic Whole Milk",
    description: "Fresh organic whole milk, rich in nutrients.",
    price: 3.99,
    price: 4.99,
    discountPrice: 3.99,
    discountPercentage: 20,
    image: "https://images.unsplash.com/photo-1550630997-aea8d3d982ed?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "dairy",
    featured: true,
  },
  {
    id: "2",
    name: "Greek Yogurt",
    description: "Creamy Greek yogurt, perfect for breakfast.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1593198232414-72431a1cc506?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "dairy",
    featured: false,
  },
  {
    id: "3",
    name: "Unsalted Butter",
    description: "Smooth and rich unsalted butter for baking and cooking.",
    price: 5.49,
    discountPrice: 4.49,
    discountPercentage: 18,
    image: "/UnsaltedButter.jpg",
    category: "butter",
    featured: true,
  },
  {
    id: "4",
    name: "Cheddar Cheese",
    description: "Sharp and flavorful cheddar cheese.",
    price: 4.29,
    image: "https://images.unsplash.com/photo-1607127368565-0fc09ac36028?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "cheese",
    featured: true,
  },
  {
    id: "5",
    name: "Almond Milk",
    description: "Plant-based almond milk, perfect for lactose intolerance.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1626196340104-2d6769a08761?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "dairy-alternative",
    featured: false,
  },
  {
    id: "6",
    name: "Mozzarella Cheese",
    description: "Soft and creamy mozzarella cheese.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1683314573422-649a3c6ad784?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "cheese",
    featured: false,
  },
  {
    id: "7",
    name: "Sour Cream",
    description: "Rich and tangy sour cream for dips and toppings.",
    price: 1.29,
    image: "https://images.unsplash.com/photo-1686998423980-ab223d183055?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "dairy",
    featured: false,
  },
  {
    id: "8",
    name: "Salted Butter",
    description: "Creamy salted butter for spreading and cooking.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1727715447752-9ef7ca9a778a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "butter",
    featured: false,
  },
];

// Define category options
export const categories = [
  { value: "milk", label: "Milk" },
  { value: "cheese", label: "Cheese" },
  { value: "yogurt", label: "Yogurt" },
  { value: "butter", label: "Butter" },
  { value: "cream", label: "Cream" },
];

const ProductsContext = createContext(undefined);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  // Mock API call (simulate fetching from a database)
  useEffect(() => {
    // This can be replaced with an API call
    fetchProducts();
  }, []);

  // Mock fetch function
  const fetchProducts = async () => {
    try {
      // Simulated API call
      setProducts(initialProducts);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Add a new product
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };

    setProducts((prev) => [...prev, newProduct]);
  };

  // Update an existing product
  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // Delete a product
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  // Get a product by ID
  const getProductById = (id) => {
    return products.find((product) => product.id === id);
  };

  // Filter products by category
  const getProductsByCategory = (category) => {
    return category === "all"
      ? products
      : products.filter((product) => product.category === category);
  };

  // Get featured products
  const getFeaturedProducts = () => {
    return products.filter((product) => product.featured);
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }

  return context;
};
