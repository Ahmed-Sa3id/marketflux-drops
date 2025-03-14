
import { Truck, CheckCircle, RefreshCw, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all orders over $50"
  },
  {
    icon: CheckCircle,
    title: "Quality Products",
    description: "Carefully selected from trusted suppliers"
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day money-back guarantee"
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "Your data is protected with SSL encryption"
  }
];

const BenefitsBanner = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="rounded-full bg-primary bg-opacity-10 p-3 text-primary">
                <benefit.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsBanner;
