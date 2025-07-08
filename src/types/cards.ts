export interface Card {
  id: number;
  imagePath: string;
  rotation: number;
}

export interface CardDeck {
  cards: Card[];
  currentIndex: number;
}