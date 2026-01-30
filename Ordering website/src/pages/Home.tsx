import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from '@/components/CategoryCard';
import { FloatingCart } from '@/components/FloatingCart';
import { restaurant, categories } from '@/data/menuData';

const categoryClassMap: Record<string, string> = {
  pizza: 'category-pizza',
  fries: 'category-fries',
  drinks: 'category-drinks',
  deals: 'category-deals',
};

export default function Home() {
  const navigate = useNavigate();

  const handleCategoryClick = (category: typeof categories[0]) => {
    if (category.id === 'deals') {
      navigate('/deals');
    } else if (category.directCustomize && category.id === 'pizza') {
      navigate('/customize/pizza/pizza-main');
    } else {
      navigate(`/category/${category.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-6 text-center">
        <h1 className="text-3xl font-bold">{restaurant.emoji} {restaurant.name}</h1>
        <p className="text-lg mt-1 opacity-90">{restaurant.tagline}</p>
      </header>

      {/* Categories Grid */}
      <main className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              emoji={cat.emoji}
              label={cat.label}
              categoryClass={categoryClassMap[cat.id] || 'category-pizza'}
              onClick={() => handleCategoryClick(cat)}
            />
          ))}
        </div>
      </main>

      <FloatingCart />
    </div>
  );
}
