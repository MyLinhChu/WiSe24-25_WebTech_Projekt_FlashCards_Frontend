
// Import necessary modules
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Deck, FlashCard } from '@/types';
import axios from 'axios';

// API endpoint
const apiEndpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/api/decks';

export const useDeckStore = defineStore('deck', () => {
  const decks = ref<Deck[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch all decks
  const fetchDecks = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get<Deck[]>(apiEndpoint);
      decks.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch decks';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Get a single deck by ID
  const getDeck = computed(() => (id: number) => {
    return decks.value.find(deck => deck.id === id);
  });

  // Fetch shuffled cards for learning
  const fetchShuffledCards = async (deckId: number): Promise<FlashCard[]> => {
    try {
      const response = await axios.get<FlashCard[]>(`${apiEndpoint}/${deckId}/learn`);
      if (response.headers['content-type']?.includes('application/json')) {
        return response.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching shuffled cards:', err);
      throw err;
    }
  };



  // Create a new deck
  const createDeck = async (name: string, description: string = '', initialCards: FlashCard[] = []) => {
    try {
      const response = await axios.post<Deck>(apiEndpoint, {
        name,
        description,
        cards: initialCards,
      });
      const newDeck = response.data;
      decks.value.push(newDeck);
      return newDeck;
    } catch (err) {
      error.value = 'Failed to create deck';
      console.error(err);
    }
  };

  // Update a deck
  const updateDeck = async (id: number, updates: Partial<Deck>) => {
    try {
      const payload = {
        name: updates.name,
        description: updates.description,
        cards: updates.cards?.map(card => ({
          frage: card.frage,
          antwort: card.antwort,
        })) || [],
      };

      const response = await axios.put<Deck>(`${apiEndpoint}/${id}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const updatedDeck = response.data;
      const index = decks.value.findIndex(deck => deck.id === id);
      if (index !== -1) {
        decks.value[index] = updatedDeck;
      }
    } catch (err) {
      error.value = 'Failed to update deck';
      console.error(err);
    }
  };

  // Delete a deck
  const deleteDeck = async (id: number) => {
    try {
      await axios.delete(`${apiEndpoint}/${id}`);
      const index = decks.value.findIndex(deck => deck.id === id);
      if (index !== -1) {
        decks.value.splice(index, 1);
      }
    } catch (err) {
      error.value = 'Failed to delete deck';
      console.error(err);
    }
  };

  return {
    decks,
    loading,
    error,
    fetchDecks,
    getDeck,
    fetchShuffledCards,
    createDeck,
    updateDeck,
    deleteDeck,
  };
});
