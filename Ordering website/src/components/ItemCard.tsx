import React from 'react';

interface ItemCardProps {
  name: string;
  nameUrdu?: string;
  price: number;
  emoji: string;
  onSelect: () => void;
}

export function ItemCard({ name, nameUrdu, price, emoji, onSelect }: ItemCardProps) {
  return (
    <div className="item-card animate-fade-in">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{emoji}</span>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground">{name}</h3>
          {nameUrdu && <p className="text-muted-foreground text-sm">{nameUrdu}</p>}
          <p className="price-tag text-lg mt-1">Starting Rs. {price}</p>
        </div>
      </div>
      <button
        onClick={onSelect}
        className="big-button big-button-primary mt-2"
      >
        Select Karein
      </button>
    </div>
  );
}
