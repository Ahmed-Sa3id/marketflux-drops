
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import BenefitsBanner from "@/components/BenefitsBanner";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <BenefitsBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
