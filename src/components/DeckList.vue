<template>
  <!-- Grid-Layout für die Anzeige von Decks -->
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <!-- Iteriert über alle Decks und erstellt eine Karte für jedes Deck -->
    <div v-for="deck in decks" :key="deck.id" class="bg-white rounded-lg shadow-md p-6"> <!-- Eindeutige ID für jedes Deck -->
      <!-- Deck Name -->
      <h3 class="text-xl font-semibold mb-2">{{ deck.name }}</h3>
      <!-- Anzahl der Karten -->
      <p class="text-gray-600 mb-4">{{ deck.cards.length }} cards</p>
      <div class="flex justify-between">
        <!-- Button zum Starten des Lernens -->
        <button @click="startLearning(deck.id)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"> <!-- Ruft `startLearning` mit der Deck-ID auf -->
          Start Learning
        </button>
        <!-- Button zum Bearbeiten eines Decks -->
        <button @click="editDeck(deck.id)" class="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"> <!-- Ruft `editDeck` mit der Deck-ID auf -->
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router' // Router importieren
import type { Deck } from '@/types' // Deck-Typ importieren
import { onMounted, ref } from 'vue' // Reaktive Variablen und Lifecycle-Hook

// Router instanziieren
const router = useRouter()
// Reaktive Variable für die Liste der Decks
const decks = ref<Deck[]>([])

// Methode zum Navigieren zur Lernansicht
const startLearning = (deckId: number) => {
  router.push(`/learn/${deckId}`)
}

// Methode zum Navigieren zur Bearbeitungsansicht
const editDeck = (deckId: number) => {
  router.push(`/deck/${deckId}`)
}

// Deck-Daten laden (z. B. durch API-Aufruf oder Mock-Daten)
onMounted(async () => {
  // Beispiel: Decks sind momentan leer, können durch API-Daten ersetzt werden
  decks.value = []
})
</script>
