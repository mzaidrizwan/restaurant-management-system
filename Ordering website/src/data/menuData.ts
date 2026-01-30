import restaurantData from './restaurant_data.json';

// Types
export interface PizzaSize {
  name: string;
  price: number;
}

export interface PizzaExtra {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  nameUrdu?: string;
  price?: number;
  category: 'pizza' | 'fries' | 'drinks' | 'deals';
}

export interface DealItem {
  type: 'pizza' | 'drink' | 'fries';
  size: string;
  quantity: number;
}

export interface Deal {
  id: string;
  name: string;
  price: number;
  items: DealItem[];
}

export interface Category {
  id: string;
  emoji: string;
  label: string;
  directCustomize: boolean;
}

export interface Restaurant {
  name: string;
  emoji: string;
  tagline: string;
  whatsappNumber: string;
}

// Export restaurant info
export const restaurant: Restaurant = restaurantData.restaurant;

// Export categories
export const categories: Category[] = restaurantData.categories;

// Export pizza configuration
export const pizzaSizes: PizzaSize[] = restaurantData.pizzaConfig.sizes;
export const pizzaFlavors: string[] = restaurantData.pizzaConfig.flavors;
export const pizzaExtras: PizzaExtra[] = restaurantData.pizzaConfig.extras;

// Export menu items
export const menuItems: MenuItem[] = restaurantData.menuItems.map(item => ({
  ...item,
  category: item.category as MenuItem['category'],
}));

// Export drinks (filtered from menu items)
export const drinks = menuItems.filter(item => item.category === 'drinks');

// Export deals
export const deals: Deal[] = restaurantData.deals.map(deal => ({
  ...deal,
  items: deal.items.map(item => ({
    ...item,
    type: item.type as DealItem['type'],
  })),
}));

// Helper function to get items by category
export const getItemsByCategory = (category: string): MenuItem[] => {
  return menuItems.filter(item => item.category === category);
};

// Helper to get category config
export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find(cat => cat.id === categoryId);
};
