
import { Link } from "react-router-dom";
import { CheckCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const OrderSuccess = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-medium">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/products">
                Continue Shopping
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">
                <Package className="mr-2 h-4 w-4" /> Track Order
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
