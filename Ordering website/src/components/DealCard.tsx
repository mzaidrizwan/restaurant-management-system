import React from 'react';
import { Deal } from '@/data/menuData';

interface DealCardProps {
  deal: Deal;
  onCustomize: () => void;
}

export function DealCard({ deal, onCustomize }: DealCardProps) {
  const getItemLabel = (item: Deal['items'][0]) => {
    const count = item.quantity > 1 ? `${item.quantity}x ` : '';
    if (item.type === 'pizza') return `${count}${item.size} Pizza`;
    if (item.type === 'drink') return `${count}Drink`;
    if (item.type === 'fries') return `${count}Fries`;
    return '';
  };

  return (
    <div className="item-card animate-fade-in">
      <div className="flex items-start gap-4">
        <span className="text-5xl">🎁</span>
        <div className="flex-1">
          <h3 className="font-bold text-xl text-foreground">{deal.name}</h3>
          <p className="price-tag text-2xl mt-1">Rs. {deal.price.toLocaleString()}</p>
          
          <div className="mt-3 space-y-1">
            <p className="text-sm font-semibold text-muted-foreground">Includes:</p>
            {deal.items.map((item, idx) => (
              <p key={idx} className="text-foreground flex items-center gap-2">
                <span className="text-lg">
                  {item.type === 'pizza' && '🍕'}
                  {item.type === 'drink' && '🥤'}
                  {item.type === 'fries' && '🍟'}
                </span>
                {getItemLabel(item)}
              </p>
            ))}
          </div>
        </div>
      </div>
      
      <button
        onClick={onCustomize}
        className="big-button big-button-primary mt-4"
      >
        Customize Deal
      </button>
    </div>
  );
}
