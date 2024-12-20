
import { defineStore } from 'pinia'
 import { ref, computed, onMounted } from 'vue'
 import type { Deck, FlashCard } from '@/types'
 import axios from 'axios'

 // API-Endpunkt aus Umgebungsvariable zusammensetzen
 const apiEndpoint = import.meta.env.VITE_APP_BACKEND_BASE_URL + '/api/decks'

 export const useDeckStore = defineStore('deck', () => {
   const decks = ref<Deck[]>([])
   const loading = ref(false)
   const error = ref<string | null>(null)

   // Decks vom Backend abrufen
   const fetchDecks = async () => {
     loading.value = true
     error.value = null
     try {
       const response = await axios.get<Deck[]>(apiEndpoint)
       decks.value = response.data
     } catch (err) {
       error.value = 'Failed to fetch decks'
       console.error(err)
     } finally {
       loading.value = false
     }
   }

   // Einzelnes Deck anhand der ID holen
   const getDeck = computed(() => (id: number) => {
     return decks.value.find(deck => deck.id === id)
   })

   // Neues Deck erstellen
   const createDeck = async (name: string, description: string = '', initialCards: FlashCard[] = []) => {
     try {
       const response = await axios.post<Deck>(apiEndpoint, {
         name,
         description,
         cards: initialCards
       })
       const newDeck = response.data
       decks.value.push(newDeck)
       return newDeck
     } catch (err) {
       error.value = 'Failed to create deck'
       console.error(err)
     }
   }

   // Deck aktualisieren
   const updateDeck = async (id: number, updates: Partial<Deck>) => {
     try {
       const response = await axios.put<Deck>(`${apiEndpoint}/${id}`, updates)
       const updatedDeck = response.data
       const index = decks.value.findIndex(deck => deck.id === id)
       if (index !== -1) {
         decks.value[index] = updatedDeck
       }
     } catch (err) {
       error.value = 'Failed to update deck'
       console.error(err)
     }
   }

   // Deck löschen
   const deleteDeck = async (id: number) => {
     try {
       await axios.delete(`${apiEndpoint}/${id}`)
       const index = decks.value.findIndex(deck => deck.id === id)
       if (index !== -1) {
         decks.value.splice(index, 1)
       }
     } catch (err) {
       error.value = 'Failed to delete deck'
       console.error(err)
     }
   }

   onMounted(() => {
     axios
       .get<Deck[]>(apiEndpoint)
       .then(response => {
         decks.value = response.data
       })
       .catch(error => {
         console.error(error)
       })
   })


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


