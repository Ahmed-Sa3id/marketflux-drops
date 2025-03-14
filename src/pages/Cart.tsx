
import { Link } from "react-router-dom";
import { ChevronRight, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  
  const estimatedShipping = items.length > 0 ? 8.99 : 0;
  const estimatedTax = subtotal * 0.08;
  const orderTotal = subtotal + estimatedShipping + estimatedTax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow py-12">
          <div className="container px-4 mx-auto">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium mb-3">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/products">
                <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between pb-3 border-b">
                  <span className="font-medium">Product</span>
                  <span className="font-medium">Subtotal</span>
                </div>

                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-4 flex items-center">
                      <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden mr-4">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 mr-4">
                        <Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary transition-colors line-clamp-1">
                          {item.product.title}
                        </Link>
                        <div className="text-gray-500 text-sm mt-1">${item.product.price.toFixed(2)}</div>
                        <div className="flex items-center mt-2">
                          <button
                            className="w-8 h-8 flex items-center justify-center border rounded"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <button
                            className="w-8 h-8 flex items-center justify-center border rounded"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            +
                          </button>
                          <button
                            className="ml-4 text-gray-400 hover:text-red-500"
                            onClick={() => removeFromCart(item.product.id)}
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t mt-4 flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Clear Cart
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Clear your cart?</DialogTitle>
                      </DialogHeader>
                      <p className="text-gray-500">
                        Are you sure you want to remove all items from your cart?
                      </p>
                      <DialogFooter className="mt-4">
                        <Button variant="outline" className="mr-2">
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={clearCart}>
                          Clear Cart
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Shipping</span>
                    <span>${estimatedShipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Order Total</span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full" size="lg" asChild>
                  <Link to="/checkout">
                    Proceed to Checkout <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
