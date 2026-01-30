import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { ItemCard } from '@/components/ItemCard';
import { FloatingCart } from '@/components/FloatingCart';
import { getItemsByCategory, getCategoryById } from '@/data/menuData';

export default function CategoryItems() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  const categoryConfig = getCategoryById(category || '');
  const items = getItemsByCategory(category || '');

  const handleSelect = (itemId: string) => {
    if (category === 'pizza') {
      navigate(`/customize/pizza/${itemId}`);
    } else if (category === 'drinks') {
      navigate(`/customize/drink/${itemId}`);
    } else {
      navigate(`/customize/simple/${itemId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title={categoryConfig?.label || 'Menu'} />
      
      <main className="p-4 space-y-4">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            name={item.name}
            nameUrdu={item.nameUrdu}
            price={item.price || 0}
            emoji={categoryConfig?.emoji || '🍽️'}
            onSelect={() => handleSelect(item.id)}
          />
        ))}
      </main>

      <FloatingCart />
    </div>
  );
}
