import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const { items, totalPrice, removeItem, updateQuantity, totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="🛒 Cart" />
        <div className="flex flex-col items-center justify-center p-8 mt-12">
          <span className="text-8xl mb-4">🛒</span>
          <h2 className="text-2xl font-bold text-foreground mb-2">Cart Khali Hai</h2>
          <p className="text-muted-foreground text-center mb-6">
            Kuch tasty add karein!
          </p>
          <button
            onClick={() => navigate('/')}
            className="big-button big-button-primary"
          >
            Menu Dekhen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader title="🛒 Cart" />

      <main className="p-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="cart-item animate-fade-in">
            {/* Regular item */}
            {!item.isDeal && (
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground">{item.name}</h3>
                    {item.extras && item.extras.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        + {item.extras.join(', ')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-destructive"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-xl w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="price-tag text-lg font-bold">
                    Rs. {item.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Deal item */}
            {item.isDeal && (
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎁</span>
                    <h3 className="font-bold text-lg text-foreground">{item.name}</h3>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-destructive"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mt-3 space-y-2 pl-2 border-l-2 border-primary/30 ml-4">
                  {item.dealItems?.map((dealItem, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>
                        {dealItem.type === 'pizza' && '🍕'}
                        {dealItem.type === 'drink' && '🥤'}
                        {dealItem.type === 'fries' && '🍟'}
                      </span>
                      {dealItem.type === 'pizza' && `${dealItem.size} ${dealItem.flavor}`}
                      {dealItem.type === 'drink' && dealItem.name}
                      {dealItem.type === 'fries' && 'French Fries'}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end mt-3">
                  <span className="price-tag text-lg font-bold">
                    Rs. {item.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add more items button */}
        <button
          onClick={() => navigate('/')}
          className="big-button big-button-secondary"
        >
          + Aur Items Add Karein
        </button>
      </main>

      {/* Fixed bottom total and checkout */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-bottom">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-2xl font-bold price-tag">
            Rs. {totalPrice.toLocaleString()}
          </span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="big-button big-button-accent"
        >
          Order Confirm Karein →
        </button>
      </div>
    </div>
  );
}
