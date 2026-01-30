import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { useCart } from '@/context/CartContext';
import { menuItems } from '@/data/menuData';
import { Plus, Minus } from 'lucide-react';

export default function CustomizeSimple() {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const item = menuItems.find(i => i.id === itemId);
  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return <div>Item not found</div>;
  }

  const emoji = item.category === 'fries' ? '🍟' : item.category === 'drinks' ? '🥤' : '🍽️';
  const price = item.price || 0;

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      quantity,
      unitPrice: price,
      totalPrice: price * quantity,
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title={`${emoji} ${item.name}`} />

      <main className="p-4">
        <div className="animate-fade-in">
          <h2 className="step-title">Kitni Quantity?</h2>
          
          <div className="bg-card rounded-2xl p-6 border border-border">
            <div className="text-center mb-6">
              <span className="text-6xl">{emoji}</span>
              <p className="text-xl font-bold text-foreground mt-4">{item.name}</p>
              <p className="text-lg text-muted-foreground">Rs. {price} each</p>
            </div>
            
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="quantity-button"
              >
                <Minus className="w-6 h-6" />
              </button>
              <span className="text-5xl font-bold text-foreground w-20 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="quantity-button"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-2xl font-bold price-tag">
                Rs. {(price * quantity).toLocaleString()}
              </p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="big-button big-button-accent mt-6"
          >
            ✓ Cart Mein Add Karein
          </button>
        </div>
      </main>
    </div>
  );
}
