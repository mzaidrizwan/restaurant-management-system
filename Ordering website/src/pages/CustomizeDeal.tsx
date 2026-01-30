import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { useCart } from '@/context/CartContext';
import { deals, pizzaFlavors, drinks } from '@/data/menuData';

interface DealSelection {
  type: 'pizza' | 'drink' | 'fries';
  size: string;
  flavor?: string;
  name?: string;
  completed: boolean;
}

export default function CustomizeDeal() {
  const { dealId } = useParams<{ dealId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const deal = deals.find(d => d.id === dealId);
  
  // Build selection steps from deal items
  const buildInitialSelections = (): DealSelection[] => {
    if (!deal) return [];
    const selections: DealSelection[] = [];
    
    deal.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        selections.push({
          type: item.type,
          size: item.size,
          completed: false,
        });
      }
    });
    
    return selections;
  };

  const [selections, setSelections] = useState<DealSelection[]>(buildInitialSelections);
  const [currentStep, setCurrentStep] = useState(0);

  if (!deal) {
    return <div>Deal not found</div>;
  }

  const currentSelection = selections[currentStep];
  const isLastStep = currentStep === selections.length - 1;
  const allCompleted = selections.every(s => s.completed);

  const getStepTitle = () => {
    const sel = currentSelection;
    if (!sel) return '';
    
    const pizzaCount = selections.filter((s, i) => s.type === 'pizza' && i <= currentStep).length;
    const drinkCount = selections.filter((s, i) => s.type === 'drink' && i <= currentStep).length;
    const friesCount = selections.filter((s, i) => s.type === 'fries' && i <= currentStep).length;
    
    if (sel.type === 'pizza') {
      return `${sel.size} Pizza #${pizzaCount} ka flavor select karein`;
    }
    if (sel.type === 'drink') {
      return drinkCount > 1 ? `Drink #${drinkCount} Select Karein` : 'Drink Select Karein';
    }
    if (sel.type === 'fries') {
      return 'Fries Confirm Karein';
    }
    return '';
  };

  const handlePizzaFlavorSelect = (flavor: string) => {
    const newSelections = [...selections];
    newSelections[currentStep] = {
      ...newSelections[currentStep],
      flavor,
      completed: true,
    };
    setSelections(newSelections);
    
    if (!isLastStep) {
      setTimeout(() => setCurrentStep(s => s + 1), 300);
    }
  };

  const handleDrinkSelect = (drinkName: string) => {
    const newSelections = [...selections];
    newSelections[currentStep] = {
      ...newSelections[currentStep],
      name: drinkName,
      completed: true,
    };
    setSelections(newSelections);
    
    if (!isLastStep) {
      setTimeout(() => setCurrentStep(s => s + 1), 300);
    }
  };

  const handleFriesConfirm = () => {
    const newSelections = [...selections];
    newSelections[currentStep] = {
      ...newSelections[currentStep],
      name: 'French Fries',
      completed: true,
    };
    setSelections(newSelections);
    
    if (!isLastStep) {
      setTimeout(() => setCurrentStep(s => s + 1), 300);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: deal.id,
      name: deal.name,
      quantity: 1,
      unitPrice: deal.price,
      totalPrice: deal.price,
      isDeal: true,
      dealItems: selections.map(s => ({
        type: s.type,
        size: s.size,
        flavor: s.flavor,
        name: s.name,
      })),
    });
    navigate('/');
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title={`🎁 ${deal.name}`} onBack={handleBack} />

      {/* Progress */}
      <div className="px-4 py-3">
        <div className="flex gap-1">
          {selections.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 rounded-full transition-colors ${
                idx < currentStep ? 'bg-accent' :
                idx === currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Step {currentStep + 1} of {selections.length}
        </p>
      </div>

      <main className="p-4">
        {currentSelection && !allCompleted && (
          <div className="animate-fade-in">
            <h2 className="step-title">{getStepTitle()}</h2>

            {/* Pizza flavor selection */}
            {currentSelection.type === 'pizza' && (
              <div className="grid grid-cols-2 gap-3">
                {pizzaFlavors.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => handlePizzaFlavorSelect(flavor)}
                    className={`step-option ${currentSelection.flavor === flavor ? 'step-option-selected' : ''}`}
                  >
                    🍕 {flavor}
                  </button>
                ))}
              </div>
            )}

            {/* Drink selection */}
            {currentSelection.type === 'drink' && (
              <div className="grid grid-cols-2 gap-3">
                {drinks.map((drink) => (
                  <button
                    key={drink.id}
                    onClick={() => handleDrinkSelect(drink.name)}
                    className={`step-option ${currentSelection.name === drink.name ? 'step-option-selected' : ''}`}
                  >
                    🥤 {drink.name}
                  </button>
                ))}
              </div>
            )}

            {/* Fries confirmation */}
            {currentSelection.type === 'fries' && (
              <div className="text-center">
                <div className="bg-card rounded-2xl p-6 border border-border mb-4">
                  <span className="text-6xl">🍟</span>
                  <p className="text-xl font-bold mt-4">French Fries</p>
                </div>
                <button
                  onClick={handleFriesConfirm}
                  className="big-button big-button-primary"
                >
                  ✓ Confirm Fries
                </button>
              </div>
            )}
          </div>
        )}

        {/* All done - show summary and add to cart */}
        {allCompleted && (
          <div className="animate-fade-in">
            <h2 className="step-title">Deal Ready Hai! 🎉</h2>
            
            <div className="bg-card rounded-2xl p-4 border border-border space-y-3">
              {selections.map((sel, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-muted/50 rounded-xl">
                  <span className="text-2xl">
                    {sel.type === 'pizza' && '🍕'}
                    {sel.type === 'drink' && '🥤'}
                    {sel.type === 'fries' && '🍟'}
                  </span>
                  <div>
                    {sel.type === 'pizza' && (
                      <p className="font-semibold">{sel.size} {sel.flavor} Pizza</p>
                    )}
                    {sel.type === 'drink' && (
                      <p className="font-semibold">{sel.name}</p>
                    )}
                    {sel.type === 'fries' && (
                      <p className="font-semibold">French Fries</p>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="pt-3 border-t border-border">
                <p className="text-2xl font-bold price-tag text-center">
                  Total: Rs. {deal.price.toLocaleString()}
                </p>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="big-button big-button-accent mt-6"
            >
              ✓ Deal Cart Mein Add Karein
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
