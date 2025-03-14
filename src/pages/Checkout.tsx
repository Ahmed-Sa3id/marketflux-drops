
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
  cardName: z.string().min(2, "Name on card is required"),
  cardNumber: z.string().min(13, "Valid card number is required"),
  expDate: z.string().min(5, "Expiration date is required"),
  cvv: z.string().min(3, "CVV is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const estimatedShipping = items.length > 0 ? 8.99 : 0;
  const estimatedTax = subtotal * 0.08;
  const orderTotal = subtotal + estimatedShipping + estimatedTax;

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      });
      
      clearCart();
      navigate("/order-success");
      setIsProcessing(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow py-12">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <p className="text-gray-600 mb-6">Your cart is empty. Add some products before checking out.</p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
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
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/cart">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cart
              </Link>
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  
                    <div className="pt-4 mt-6 border-t">
                      <h2 className="text-xl font-medium mb-4">Payment Information</h2>
                      
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name on Card</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="1234 5678 9012 3456" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiration Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="lg:hidden pt-6">
                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : "Place Order"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="max-h-60 overflow-auto mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex py-2 border-b">
                      <div className="w-12 h-12 rounded overflow-hidden mr-3">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.product.title}</div>
                        <div className="text-sm text-gray-500">
                          Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${estimatedShipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:block">
                  <Button 
                    onClick={form.handleSubmit(onSubmit)} 
                    className="w-full" 
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                    {isProcessing ? null : <CreditCard className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
