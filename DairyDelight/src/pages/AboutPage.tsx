
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MilkOff, Leaf, Cow, Award, ChevronRight } from "lucide-react";
import gsap from "gsap";

export default function AboutPage() {
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  
  useEffect(() => {
    // Hero section animation
    gsap.from(headingRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
    
    gsap.from(contentRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out"
    });
    
    // Story section animation
    gsap.from(storyRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top 80%",
      },
      ease: "power2.out"
    });
    
    // Values section animation
    gsap.from(valuesRef.current?.children || [], {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      scrollTrigger: {
        trigger: valuesRef.current,
        start: "top 80%",
      },
      ease: "power2.out"
    });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-cream-50 dark:bg-gray-900">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 
              ref={headingRef}
              className="text-3xl md:text-5xl font-bold mb-6 text-dairy-800 dark:text-white"
            >
              We're on a Mission to Deliver the <span className="text-dairy-600 dark:text-dairy-400">Finest Dairy</span>
            </h1>
            
            <p 
              ref={contentRef}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
            >
              At DairyDelight, we believe in the power of quality dairy products to nourish communities and support local farmers. Our journey began with a simple idea: to connect people with the freshest, most delicious dairy products while supporting sustainable farming practices.
            </p>
            
            <Link to="/products">
              <Button size="lg" className="bg-dairy-600 hover:bg-dairy-700">
                Explore Our Products <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4">
          <div ref={storyRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1529566652340-2c41a1eb6d93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Dairy farm" 
                className="rounded-2xl shadow-lg"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6 text-dairy-800 dark:text-white">Our Story</h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Founded in 2010 by a group of passionate dairy farmers, DairyDelight emerged from a desire to bring farm-fresh dairy products directly to consumers without compromising on quality or ethics.
                </p>
                
                <p>
                  We started small, selling at local farmers markets and building personal relationships with our customers. As word spread about our exceptional products, we expanded our reach while staying true to our core values.
                </p>
                
                <p>
                  Today, we work with a network of over 20 family-owned farms across the region. Each farm shares our commitment to animal welfare, sustainable practices, and producing exceptional dairy products. We're proud to support these hard-working families while bringing you the very best dairy has to offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-cream-50 dark:bg-gray-900">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-dairy-800 dark:text-white">Our Values</h2>
          
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-dairy-100 dark:bg-dairy-900/50 flex items-center justify-center mb-6">
                <Cow className="h-6 w-6 text-dairy-600 dark:text-dairy-400" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-dairy-800 dark:text-white">Animal Welfare</h3>
              
              <p className="text-gray-600 dark:text-gray-300">
                Our cows are grass-fed and free to roam in pastures. We believe happy cows produce better milk, and we're committed to ethical treatment of all animals in our supply chain.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-mint-100 dark:bg-mint-900/50 flex items-center justify-center mb-6">
                <Leaf className="h-6 w-6 text-mint-600 dark:text-mint-400" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-dairy-800 dark:text-white">Sustainability</h3>
              
              <p className="text-gray-600 dark:text-gray-300">
                We implement eco-friendly practices throughout our supply chain, from renewable energy on farms to biodegradable packaging, minimizing our environmental footprint.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-butter-100 dark:bg-butter-900/50 flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-butter-600 dark:text-butter-400" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-dairy-800 dark:text-white">Quality First</h3>
              
              <p className="text-gray-600 dark:text-gray-300">
                We never compromise on quality. Our rigorous testing and selection process ensures only the finest dairy products make it to your table, free from additives and preservatives.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Certifications Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-dairy-800 dark:text-white">Our Certifications</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <img 
                src="https://cdn.pixabay.com/photo/2017/01/31/13/14/animal-2023924_960_720.png" 
                alt="Animal Welfare Certified" 
                className="h-20 w-20 mb-4"
              />
              <p className="text-center font-medium">Animal Welfare Certified</p>
            </div>
            
            <div className="flex flex-col items-center">
              <img 
                src="https://cdn.pixabay.com/photo/2013/07/13/09/51/recycling-156444_960_720.png" 
                alt="Eco-Friendly" 
                className="h-20 w-20 mb-4"
              />
              <p className="text-center font-medium">Eco-Friendly Packaging</p>
            </div>
            
            <div className="flex flex-col items-center">
              <img 
                src="https://cdn.pixabay.com/photo/2014/04/02/10/39/recycle-304974_960_720.png" 
                alt="Sustainable Practices" 
                className="h-20 w-20 mb-4"
              />
              <p className="text-center font-medium">Sustainable Farm Practices</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative h-20 w-20 mb-4 flex items-center justify-center">
                <MilkOff className="h-16 w-16 text-dairy-600 dark:text-dairy-400" />
                <div className="absolute inset-0 border-2 border-dairy-600 dark:border-dairy-400 rounded-full"></div>
              </div>
              <p className="text-center font-medium">Antibiotic-Free</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-dairy-600 dark:bg-dairy-800">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Experience the DairyDelight Difference</h2>
            
            <p className="text-lg text-white/90 mb-8">
              Taste the difference that ethical, sustainable, and passionate dairy farming makes. Browse our selection of premium products and have them delivered fresh to your door.
            </p>
            
            <Link to="/products">
              <Button size="lg" className="bg-white text-dairy-700 hover:bg-cream-100">
                Shop Now <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
