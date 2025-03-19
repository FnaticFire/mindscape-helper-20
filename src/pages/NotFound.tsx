
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-blue-50 p-4">
      <img 
        src="/lovable-uploads/ccac2e90-d337-46f0-a75a-31c3d8d246af.png" 
        alt="MindHaven Logo" 
        className="h-24 w-auto mb-8"
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <Button onClick={() => navigate('/')} variant="default">
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
