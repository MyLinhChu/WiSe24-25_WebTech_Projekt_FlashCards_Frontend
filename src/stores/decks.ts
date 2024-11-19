import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Deck, FlashCard } from '@/types'

export const useDeckStore = defineStore('deck', () => {
  const decks = ref<Deck[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Mock data for development
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

  const fetchDecks = async () => {
    loading.value = true
    error.value = null
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      if (decks.value.length === 0) {
        decks.value = mockDecks
      }
    } catch (err) {
      error.value = 'Failed to fetch decks'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const getDeck = computed(() => (id: number) => {
    return decks.value.find(deck => deck.id === id)
  })

  const createDeck = async (name: string, description: string = '', initialCards: FlashCard[] = []) => {
    const newDeck: Deck = {
      id: Math.max(0, ...decks.value.map(d => d.id)) + 1,
      name,
      description,
      cards: initialCards,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    decks.value.push(newDeck)
    return newDeck
  }

  const updateDeck = async (id: number, updates: Partial<Deck>) => {
    const index = decks.value.findIndex(deck => deck.id === id)
    if (index !== -1) {
      decks.value[index] = {
        ...decks.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
    }
  }

  const deleteDeck = async (id: number) => {
    const index = decks.value.findIndex(deck => deck.id === id)
    if (index !== -1) {
      decks.value.splice(index, 1)
    }
  }

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
