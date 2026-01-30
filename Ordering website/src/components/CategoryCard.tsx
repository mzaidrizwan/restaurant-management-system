import React from 'react';

interface CategoryCardProps {
  emoji: string;
  label: string;
  categoryClass: string;
  onClick: () => void;
}

export function CategoryCard({ emoji, label, categoryClass, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`category-card ${categoryClass}`}
    >
      <span className="emoji-icon mb-2">{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
