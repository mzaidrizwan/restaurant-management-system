import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="text-center animate-scale-in">
        <span className="text-8xl block mb-6">🎉</span>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Order Bhej Diya!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          WhatsApp par confirm karein
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="big-button big-button-primary"
        >
          🏠 Home Jayein
        </button>
      </div>
    </div>
  );
}
