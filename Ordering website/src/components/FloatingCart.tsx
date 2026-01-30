import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export function FloatingCart() {
  const { totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={() => navigate('/cart')}
      className="floating-cart animate-slide-up"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-white text-primary w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center">
            {totalItems}
          </span>
        </div>
        <span className="font-bold">Cart Dekhen</span>
      </div>
      <span className="font-bold text-lg">Rs. {totalPrice.toLocaleString()}</span>
    </button>
  );
}
