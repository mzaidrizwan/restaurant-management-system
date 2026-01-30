import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { useCart } from '@/context/CartContext';
import { menuItems, pizzaSizes, pizzaFlavors, pizzaExtras } from '@/data/menuData';
import { Check, Plus, Minus } from 'lucide-react';

type Step = 'size' | 'flavor' | 'extras' | 'quantity';

export default function CustomizePizza() {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const item = menuItems.find(i => i.id === itemId);
  
  const [step, setStep] = useState<Step>('size');
  const [selectedSize, setSelectedSize] = useState<{ name: string; price: number } | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return <div>Item not found</div>;
  }

  const calculatePrice = () => {
    let price = selectedSize?.price || 0;
    selectedExtras.forEach(extraName => {
      const extra = pizzaExtras.find(e => e.name === extraName);
      if (extra) price += extra.price;
    });
    return price;
  };

  const handleSizeSelect = (size: { name: string; price: number }) => {
    setSelectedSize(size);
    setTimeout(() => setStep('flavor'), 300);
  };

  const handleFlavorSelect = (flavor: string) => {
    setSelectedFlavor(flavor);
    setTimeout(() => setStep('extras'), 300);
  };

  const handleExtraToggle = (extraName: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraName)
        ? prev.filter(e => e !== extraName)
        : [...prev, extraName]
    );
  };

  const handleAddToCart = () => {
    const unitPrice = calculatePrice();
    addItem({
      id: item.id,
      name: `${selectedSize?.name} ${selectedFlavor} Pizza`,
      size: selectedSize?.name,
      flavor: selectedFlavor || undefined,
      extras: selectedExtras,
      quantity,
      unitPrice,
      totalPrice: unitPrice * quantity,
    });
    navigate('/');
  };

  const handleBack = () => {
    if (step === 'flavor') setStep('size');
    else if (step === 'extras') setStep('flavor');
    else if (step === 'quantity') setStep('extras');
    else navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title="🍕 Pizza" onBack={handleBack} />

      <main className="p-4">
        {/* Step 1: Size */}
        {step === 'size' && (
          <div className="animate-fade-in">
            <h2 className="step-title">Size Select Karein</h2>
            <div className="space-y-3">
              {pizzaSizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => handleSizeSelect(size)}
                  className={`step-option ${selectedSize?.name === size.name ? 'step-option-selected' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <span>{size.name}</span>
                    <span className="price-tag">Rs. {size.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Flavor */}
        {step === 'flavor' && (
          <div className="animate-fade-in">
            <h2 className="step-title">Flavor Select Karein</h2>
            <div className="grid grid-cols-2 gap-3">
              {pizzaFlavors.map((flavor) => (
                <button
                  key={flavor}
                  onClick={() => handleFlavorSelect(flavor)}
                  className={`step-option ${selectedFlavor === flavor ? 'step-option-selected' : ''}`}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Extras */}
        {step === 'extras' && (
          <div className="animate-fade-in">
            <h2 className="step-title">Extra Add Karna Hai?</h2>
            <div className="space-y-3">
              {pizzaExtras.map((extra) => (
                <button
                  key={extra.name}
                  onClick={() => handleExtraToggle(extra.name)}
                  className={`step-option ${selectedExtras.includes(extra.name) ? 'step-option-selected' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                        selectedExtras.includes(extra.name) 
                          ? 'bg-primary border-primary' 
                          : 'border-muted-foreground'
                      }`}>
                        {selectedExtras.includes(extra.name) && (
                          <Check className="w-4 h-4 text-primary-foreground" />
                        )}
                      </div>
                      <span>{extra.name}</span>
                    </div>
                    <span className="text-muted-foreground">+Rs. {extra.price}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setStep('quantity')}
                className="big-button big-button-primary"
              >
                Continue
              </button>
              <button
                onClick={() => {
                  setSelectedExtras([]);
                  setStep('quantity');
                }}
                className="big-button big-button-secondary"
              >
                Skip Karein
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Quantity */}
        {step === 'quantity' && (
          <div className="animate-fade-in">
            <h2 className="step-title">Kitni Quantity?</h2>
            
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="text-center mb-6">
                <p className="text-lg text-muted-foreground">
                  {selectedSize?.name} {selectedFlavor} Pizza
                </p>
                {selectedExtras.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    + {selectedExtras.join(', ')}
                  </p>
                )}
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
                  Rs. {(calculatePrice() * quantity).toLocaleString()}
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
        )}
      </main>
    </div>
  );
}
