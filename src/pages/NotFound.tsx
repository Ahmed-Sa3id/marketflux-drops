
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold mb-6">404</h1>
          <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
