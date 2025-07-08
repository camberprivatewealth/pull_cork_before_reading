import { Card } from '../types/cards';

export const loadCards = async (): Promise<Card[]> => {
  const cards: Card[] = [];
  
  // Create an array from 1 to 49 for the card numbers
  const cardNumbers = Array.from({ length: 49 }, (_, i) => i + 1);
  
  // Create card objects with the correct image paths
  for (const num of cardNumbers) {
    const imagePath = new URL(`../assets/cards/pcbr_${num}.png`, import.meta.url).href;
    cards.push({
      id: num,
      imagePath,
      rotation: Math.random() * 20 - 10, // Random rotation between -10 and +10 degrees
    });
  }
  
  // Shuffle the cards
  return shuffleArray(cards);
};

// Fisher-Yates shuffle algorithm
function shuffleArray(array: Card[]): Card[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}