export interface FlashCard {
  id: number
  frage: string
  antwort: string
  lastReviewed?: string // Changed from Date to string
  correctCount?: number
  incorrectCount?: number
}

export interface Deck {
  id: number
  name: string
  description: string
  cards: FlashCard[]
  tags: string[]
  createdAt: string // Changed from Date to string
  updatedAt: string // Changed from Date to string
}

export interface Folder {
  id: number
  name: string
  decks: Deck[]
}
