import { defineStore } from 'pinia' // Funktion zur Definition eines Stores
import { ref, computed } from 'vue' // Reaktive Variablen und Computed Properties
import type { Deck, FlashCard } from '@/types' // Typdefinitionen für Decks und Karten

// Pinia-Store für Deck-Daten
export const useDeckStore = defineStore('deck', () => {
  // State: Liste der Decks, Ladeanzeige, Fehler
  const decks = ref<Deck[]>([]) // Liste der vorhandenen Decks
  const loading = ref(false) // Ladeanzeige
  const error = ref<string | null>(null) // Fehlermeldung (falls vorhanden)

  // Mock data für die Entwicklung (werden in der fetch-Methode verwendet)
  const mockDecks: Deck[] = [
    {
      id: 1,
      name: 'Spanish Vocabulary',
      description: 'Basic Spanish words and phrases',
      cards: [
        { id: 1, frage: '¿Cómo estás?', antwort: 'How are you?' },
        { id: 2, frage: 'Buenos días', antwort: 'Good morning' }
      ],
      tags: ['language'],
      createdAt: '2024-01-28T12:00:00Z',
      updatedAt: '2024-01-28T12:00:00Z'
    },
    {
      id: 2,
      name: 'JavaScript Basics',
      description: 'Core JavaScript concepts',
      cards: [
        { id: 3, frage: 'What is a closure?', antwort: 'A function that has access to variables in its outer scope' },
        { id: 4, frage: 'What is hoisting?', antwort: 'Variable and function declarations are moved to the top' }
      ],
      tags: ['programming'],
      createdAt: '2024-01-28T12:00:00Z',
      updatedAt: '2024-01-28T12:00:00Z'
    }
  ]

  // Methode: Decks laden
  const fetchDecks = async () => {
    loading.value = true  // Ladeanzeige aktivieren
    error.value = null // Fehler zurücksetzen
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulierter API-Aufruf
      if (decks.value.length === 0) {
        decks.value = mockDecks  // Mock-Daten verwenden
      }
    } catch (err) {
      error.value = 'Failed to fetch decks' // Fehler setzen
      console.error(err)
    } finally {
      loading.value = false // Ladeanzeige deaktivieren
    }
  }

  // Methode: Ein bestimmtes Deck anhand der ID abrufen
  const getDeck = computed(() => (id: number) => {
    return decks.value.find(deck => deck.id === id)
  })

  // Methode: Neues Deck erstellen
  const createDeck = async (name: string, description: string = '', initialCards: FlashCard[] = []) => {
    const newDeck: Deck = {
      id: Math.max(0, ...decks.value.map(d => d.id)) + 1, // ID basierend auf vorhandenen Decks
      name,
      description,
      cards: initialCards,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    decks.value.push(newDeck) // Neues Deck zur Liste hinzufügen
    return newDeck
  }

  // Methode: Bestehendes Deck aktualisieren
  const updateDeck = async (id: number, updates: Partial<Deck>) => {
    const index = decks.value.findIndex(deck => deck.id === id)  // Deck finden
    if (index !== -1) {
      decks.value[index] = {
        ...decks.value[index], // Bestehendes Deck
        ...updates, // Änderungen anwenden
        updatedAt: new Date().toISOString()
      }
    }
  }

  // Methode: Deck löschen
  const deleteDeck = async (id: number) => {
    const index = decks.value.findIndex(deck => deck.id === id) // Deck finden
    if (index !== -1) {
      decks.value.splice(index, 1) // Deck aus der Liste entfernen
    }
  }

  // Exportiert State und Methoden für den Store
  return {
    decks,
    loading,
    error,
    fetchDecks,
    getDeck,
    createDeck,
    updateDeck,
    deleteDeck
  }
})
