
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">DropStore</h3>
            <p className="text-sm text-gray-600">
              Your one-stop shop for premium products at affordable prices.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm text-gray-600 hover:text-primary">All Products</Link></li>
              <li><Link to="/categories" className="text-sm text-gray-600 hover:text-primary">Categories</Link></li>
              <li><Link to="/new-arrivals" className="text-sm text-gray-600 hover:text-primary">New Arrivals</Link></li>
              <li><Link to="/sale" className="text-sm text-gray-600 hover:text-primary">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-primary">About Us</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-600 hover:text-primary">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-sm text-gray-600 hover:text-primary">Returns & Refunds</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">Email: info@dropstore.com</li>
              <li className="text-sm text-gray-600">Phone: +1 (555) 123-4567</li>
              <li className="text-sm text-gray-600">Hours: Mon-Fri, 9am-5pm</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} DropStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
