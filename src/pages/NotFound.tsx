
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-soft-blue/20 to-transparent opacity-50"></div>
          <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-soft-blue blur-3xl opacity-20"></div>
          <div className="absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-soft-blue blur-3xl opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block py-1 px-3 bg-soft-blue text-medium-blue rounded-full text-xs font-medium tracking-wide mb-6">
              Error 404
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Page Not Found</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="rounded-full px-8 py-6 bg-medium-blue hover:bg-medium-blue/90" asChild>
                <a href="/">Return Home</a>
              </Button>
              <Button variant="outline" className="rounded-full px-8 py-6 hover:bg-medium-blue hover:text-white" asChild>
                <a href="/contact">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </motion.div>
  );
};

export default NotFound;
