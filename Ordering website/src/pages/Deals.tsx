import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { DealCard } from '@/components/DealCard';
import { FloatingCart } from '@/components/FloatingCart';
import { deals } from '@/data/menuData';

export default function Deals() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="🎁 Deals" />
      
      <main className="p-4 space-y-4">
        {deals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
            onCustomize={() => navigate(`/customize/deal/${deal.id}`)}
          />
        ))}
      </main>

      <FloatingCart />
    </div>
  );
}
