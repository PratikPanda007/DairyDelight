
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MilkOff } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cream-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-24 h-24 bg-dairy-100 dark:bg-dairy-900/50 rounded-full flex items-center justify-center mb-6">
          <MilkOff className="h-12 w-12 text-dairy-600 dark:text-dairy-400" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-dairy-800 dark:text-dairy-300">404</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
          Oops! This page has spoiled like milk left out too long.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-dairy-600 hover:bg-dairy-700">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
