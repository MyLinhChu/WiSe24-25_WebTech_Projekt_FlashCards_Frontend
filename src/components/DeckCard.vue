<template>
  <!-- Die Hauptkarte mit Hover-Effekten und anklickbarer Oberfläche -->
  <div class="border rounded-lg p-6 bg-white hover:shadow-md cursor-pointer">
    <div class="flex justify-between items-start mb-4">
      <!-- Deck Name -->
      <h3 class="font-medium text-lg">{{ deck.name }}</h3>
      <!-- Tags des Decks -->
      <div class="flex space-x-1">
        <!-- Iteriert über alle Tags und ruft `getTagColor` auf, um die CSS-Klassen basierend auf dem Tag-Typ zu setzen -->
        <span v-for="tag in deck.tags" :key="tag"
              class="px-2 py-1 rounded-full text-xs font-medium"
              :class="getTagColor(tag)">
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Beschreibung des Decks -->
    <p class="text-gray-600 text-sm mb-4">{{ deck.description }}</p>

    <div class="flex justify-between items-center">
      <!-- Anzahl der Karten im Deck-->
      <span class="text-sm text-gray-500">{{ deck.cards.length }} cards</span>
      <!-- Button zum Starten des Lernens -->
      <!-- Ruft die Methode `startLearning` auf, um zur Lernansicht zu navigieren -->
      <button @click="startLearning(deck.id)"
              class="text-blue-600 hover:text-blue-700 text-sm font-medium">
        Start Learning →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router' // Router zur Navigation importieren
import type { Deck } from '@/types' // Typ des Decks importieren

// Erwartet eine `deck`-Eigenschaft, die Details des Decks enthält
const props = defineProps<{
  deck: Deck
}>()

console.log(props.deck)

// Instanz des Routers erstellen
const router = useRouter()

// Methode zum Starten des Lernens eines Decks
const startLearning = (deckId: number) => {
  router.push(`/learn/${deckId}`) // Navigiert zur Route `/learn/:id`
}

// Methode, um die passenden Farben für jedes Tag zurückzugeben
const getTagColor = (tag: string) => {
  const colors: Record<string, string> = {
    'private': 'bg-purple-100 text-purple-800', // Farben für "private" Tags
    'public': 'bg-green-100 text-green-800', // Farben für "public" Tags
    'shared': 'bg-blue-100 text-blue-800' // Farben für "shared" Tags
  }
  return colors[tag] || 'bg-gray-100 text-gray-800' // Standardfarbe, falls Tag unbekannt
}
</script>



