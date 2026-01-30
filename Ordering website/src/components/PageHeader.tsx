import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function PageHeader({ title, showBack = true, onBack }: PageHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="page-header">
      {showBack && (
        <button onClick={handleBack} className="back-button">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
      )}
      <h1 className="screen-title">{title}</h1>
    </header>
  );
}
