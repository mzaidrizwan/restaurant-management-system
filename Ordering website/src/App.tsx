import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Home from "./pages/Home";
import CategoryItems from "./pages/CategoryItems";
import Deals from "./pages/Deals";
import CustomizePizza from "./pages/CustomizePizza";
import CustomizeSimple from "./pages/CustomizeSimple";
import CustomizeDrink from "./pages/CustomizeDrink";
import CustomizeDeal from "./pages/CustomizeDeal";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryItems />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/customize/pizza/:itemId" element={<CustomizePizza />} />
            <Route path="/customize/simple/:itemId" element={<CustomizeSimple />} />
            <Route path="/customize/drink/:itemId" element={<CustomizeDrink />} />
            <Route path="/customize/deal/:dealId" element={<CustomizeDeal />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
