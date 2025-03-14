
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Product routes - to be implemented */}
          <Route path="/products" element={<Index />} />
          <Route path="/product/:id" element={<Index />} />
          <Route path="/category/:slug" element={<Index />} />
          <Route path="/categories" element={<Index />} />
          <Route path="/cart" element={<Index />} />
          {/* Additional routes */}
          <Route path="/about" element={<Index />} />
          <Route path="/shipping" element={<Index />} />
          <Route path="/returns" element={<Index />} />
          <Route path="/privacy" element={<Index />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
