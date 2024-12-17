<template>
  <div class="space-y-6 p-6">
    <!-- Überschrift und Suchleiste -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">My Flashcard Decks</h1>
      <div class="flex space-x-4">
        <!-- Suchleiste -->
        <input
          type="text"
          placeholder="Search decks..."
          class="px-4 py-2 border rounded-md"
          v-model="searchQuery"
        />
        <!-- Button zum Erstellen eines neuen Decks -->
        <router-link
          to="/create"
          class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusIcon class="w-5 h-5 mr-2" />
          New Deck
        </router-link>
      </div>
    </div>

    <!-- Ladeanzeige -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
    </div>

    <!-- Deck-Liste -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Iteration über gefilterte Decks -->
      <div
        v-for="deck in filteredDecks"
        :key="deck.id"
        class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-medium text-gray-900">{{ deck.name }}</h3>
          <div class="flex items-center space-x-2">
            <!-- Bearbeiten -->
            <router-link
              :to="'/edit/' + deck.id"
              class="text-gray-500 hover:text-gray-700"
            >
              <PencilIcon class="w-5 h-5" />
            </router-link>
            <!-- Löschen -->
            <button
              @click="deleteDeck(deck.id)"
              class="text-gray-500 hover:text-red-600"
            >
              <Trash2Icon class="w-5 h-5" />
            </button>
          </div>
        </div>
        <p class="text-gray-600 text-sm mb-4">{{ deck.description }}</p>
        <div class="flex justify-between items-center">
          <span
            class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
          >
            {{ deck.cards.length }} cards
          </span>
          <router-link
            :to="'/learn/' + deck.id"
            class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
          >
            Start Learning
            <ArrowRightIcon class="w-4 h-4 ml-1" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  ArrowRightIcon
} from 'lucide-vue-next'
import { useDeckStore } from '@/stores/decks'

// State-Management
const deckStore = useDeckStore()

// Debugging: Logge den Deckstore-Inhalt
console.log('DeckStore Inhalt beim Laden:', deckStore)

// Suchabfrage
const searchQuery = ref('')
const loading = computed(() => deckStore.loading)

// Gefilterte Decks (mit Absicherung)
const filteredDecks = computed(() => {
  if (!Array.isArray(deckStore.decks)) {
    console.warn('deckStore.decks ist kein Array:', deckStore.decks)
    return []
  }

  return deckStore.decks.filter(
    (deck) =>
      deck.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      deck.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Deck löschen
const deleteDeck = async (id: number) => {
  if (confirm('Are you sure you want to delete this deck?')) {
    await deckStore.deleteDeck(id)
  }
}

// Decks laden
onMounted(async () => {
  try {
    console.log('Decks werden geladen...')
    await deckStore.fetchDecks()
    console.log('Decks erfolgreich geladen:', deckStore.decks)
  } catch (error) {
    console.error('Fehler beim Laden der Decks:', error)
  }
})
</script>
