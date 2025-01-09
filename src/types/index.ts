// FlashCard: Struktur für einzelne Karten, die Frage-Antwort-Paare repräsentieren
export interface FlashCard {
  id?: number // Eindeutige ID der Karte
  frage: string
  antwort: string
  lastReviewed?: string // Optional: Letztes Überprüfungsdatum (als ISO-Zeitstring gespeichert)
  correctCount?: number // Optional: Anzahl der richtigen Antworten für diese Karte
  incorrectCount?: number // Optional: Anzahl der falschen Antworten für diese Karte
}

// Deck: Struktur für ein Deck, das aus mehreren FlashCards besteht
export interface Deck {
  id: number  // Eindeutige ID des Decks
  name: string // Name des Decks (z. B. "Spanisch-Vokabeln")
  description: string // Beschreibung des Decks
  cards: FlashCard[] // Liste der Karten im Deck
  tags: string[]  // Tags zur Kategorisierung des Decks (z. B. "Sprache", "Programmierung")
  createdAt: string // Erstellungsdatum des Decks (als ISO-Zeitstring gespeichert)
  updatedAt: string // Letzte Aktualisierung des Decks (als ISO-Zeitstring gespeichert)
}
// Folder: Struktur für einen Ordner, der mehrere Decks enthält
export interface Folder {
  id: number  // Eindeutige ID des Ordners
  name: string // Name des Ordners (z. B. "Meine Sammlung")
  decks: Deck[] // Liste der Decks in diesem Ordner
}
