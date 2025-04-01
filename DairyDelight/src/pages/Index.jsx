
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Index = () => {
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Animation with GSAP
    gsap.from(headingRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
    
    gsap.from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out"
    });
    
    gsap.from(buttonRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.4,
      ease: "power2.out"
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-3xl">
        <h1 
          ref={headingRef}
          className="text-4xl md:text-6xl font-bold mb-6 text-dairy-800 dark:text-white"
        >
          Welcome to <span className="text-dairy-600 dark:text-dairy-400">DairyDelight</span>
        </h1>
        
        <p 
          ref={textRef}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10"
        >
          Discover farm-fresh dairy products delivered straight to your door.
          Quality you can taste in every bite.
        </p>
        
        <div ref={buttonRef}>
          <Link to="/products">
            <Button size="lg" className="bg-dairy-600 hover:bg-dairy-700 text-white">
              Browse Products <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
