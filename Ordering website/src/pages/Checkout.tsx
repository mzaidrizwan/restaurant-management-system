import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { useCart } from '@/context/CartContext';
import { restaurant } from '@/data/menuData';
import { MapPin, Loader2 } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const isValid = name.trim() && phone.trim() && address.trim();

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Location not supported');
      return;
    }

    setLocationLoading(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        
        // Try to get address from coordinates using reverse geocoding
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data.display_name) {
            setAddress(data.display_name);
          } else {
            setAddress(`Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          }
        } catch {
          setAddress(`Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        }
        
        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);
        setLocationError('Location access denied');
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const formatOrderForWhatsApp = () => {
    let message = `🍕 *NEW ORDER*\n\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📱 *Phone:* ${phone}\n`;
    message += `📍 *Address:* ${address}\n`;
    
    if (coords) {
      message += `🗺️ *Map:* https://www.google.com/maps?q=${coords.lat},${coords.lng}\n`;
    }
    
    message += `\n━━━━━━━━━━━━━━━\n`;
    message += `📋 *ORDER DETAILS:*\n\n`;

    items.forEach((item) => {
      if (item.isDeal) {
        message += `🎁 *${item.name}* - Rs.${item.totalPrice.toLocaleString()}\n`;
        item.dealItems?.forEach((dealItem) => {
          if (dealItem.type === 'pizza') {
            message += `   🍕 ${dealItem.size} ${dealItem.flavor}\n`;
          } else if (dealItem.type === 'drink') {
            message += `   🥤 ${dealItem.name}\n`;
          } else if (dealItem.type === 'fries') {
            message += `   🍟 French Fries\n`;
          }
        });
      } else {
        message += `• ${item.quantity}x ${item.name} - Rs.${item.totalPrice.toLocaleString()}\n`;
        if (item.extras && item.extras.length > 0) {
          message += `  (+${item.extras.join(', ')})\n`;
        }
      }
    });

    message += `\n━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL: Rs.${totalPrice.toLocaleString()}*`;

    return encodeURIComponent(message);
  };

  const handlePlaceOrder = () => {
    const message = formatOrderForWhatsApp();
    const whatsappUrl = `https://wa.me/${restaurant.whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageHeader title="📝 Checkout" />

      <main className="p-4 space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-lg font-bold text-foreground">
            Aapka Naam
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Naam likhen..."
            className="w-full p-4 text-lg rounded-xl border-2 border-border bg-card focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-lg font-bold text-foreground">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="03XX-XXXXXXX"
            className="w-full p-4 text-lg rounded-xl border-2 border-border bg-card focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="text-lg font-bold text-foreground">
            Delivery Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Pura address likhen..."
            rows={3}
            className="w-full p-4 text-lg rounded-xl border-2 border-border bg-card focus:border-primary focus:outline-none transition-colors resize-none"
          />
          
          <button
            onClick={handleGetLocation}
            disabled={locationLoading}
            className="big-button big-button-secondary"
          >
            {locationLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Location Mil Rahi Hai...
              </>
            ) : (
              <>
                <MapPin className="w-5 h-5" />
                📍 Current Location Use Karein
              </>
            )}
          </button>
          
          {locationError && (
            <p className="text-destructive text-sm text-center">{locationError}</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-muted/50 rounded-xl p-4 mt-6">
          <h3 className="font-bold text-lg mb-3">Order Summary</h3>
          <div className="space-y-2 text-muted-foreground">
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{item.quantity}x {item.name}</span>
                <span>Rs.{item.totalPrice.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-3 pt-3 flex justify-between">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-lg price-tag">Rs.{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </main>

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-bottom">
        <button
          onClick={handlePlaceOrder}
          disabled={!isValid}
          className={`big-button ${isValid ? 'big-button-whatsapp' : 'big-button-secondary opacity-50'}`}
        >
          📱 WhatsApp Par Order Karein
        </button>
      </div>
    </div>
  );
}
