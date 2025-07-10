import { Card } from '../types/cards';

export const loadCards = async (): Promise<Card[]> => {
  const cards: Card[] = [];
  
  // Create an array from 1 to 49 for the card numbers
  const cardNumbers = Array.from({ length: 49 }, (_, i) => i + 1);
  
  // Create card objects with the correct image paths
  for (const num of cardNumbers) {
    try {
      const imagePath = new URL(`../assets/cards/pcbr_${num}.png`, import.meta.url).href;
      cards.push({
        id: num,
        imagePath,
        rotation: Math.random() * 20 - 10, // Random rotation between -10 and +10 degrees
      });
    } catch (error) {
      console.error(`Failed to load card ${num}:`, error);
    }
  }
  
  // Verify we have all cards loaded
  if (cards.length !== 49) {
    console.warn(`Expected 49 cards, but loaded ${cards.length}`);
  }
  
  // Shuffle the cards
  return shuffleArray(cards);
};

// Alternative static import approach for better reliability
export const loadCardsStatic = async (): Promise<Card[]> => {
  const cards: Card[] = [];
  
  // Import all card images statically
  const cardModules = import.meta.glob('../assets/cards/pcbr_*.png', { eager: true });
  
  Object.entries(cardModules).forEach(([path, module]) => {
    const match = path.match(/pcbr_(\d+)\.png$/);
    if (match) {
      const cardNumber = parseInt(match[1]);
      cards.push({
        id: cardNumber,
        imagePath: (module as any).default,
        rotation: Math.random() * 20 - 10,
      });
    }
  });
  
  // Sort by card number to ensure consistent order before shuffling
  cards.sort((a, b) => a.id - b.id);
  
  return shuffleArray(cards);
};

// Preload images for better performance
export const preloadImages = (cards: Card[]): Promise<void[]> => {
  return Promise.all(
    cards.map((card) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = card.imagePath;
      });
    })
  );
};

// Fisher-Yates shuffle algorithm
function shuffleArray(array: Card[]): Card[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}