<template>
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <div v-for="deck in decks" :key="deck.id" class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold mb-2">{{ deck.name }}</h3>
      <p class="text-gray-600 mb-4">{{ deck.cards.length }} cards</p>
      <div class="flex justify-between">
        <button @click="startLearning(deck.id)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Start Learning
        </button>
        <button @click="editDeck(deck.id)" class="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200">
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Deck } from '@/types'
import { onMounted, ref } from 'vue'

const router = useRouter()

const decks = ref<Deck[]>([])

const startLearning = (deckId: number) => {
  router.push(`/learn/${deckId}`)
}

const editDeck = (deckId: number) => {
  router.push(`/deck/${deckId}`)
}

onMounted(async () => {
  // TODO: Fetch decks from API
  decks.value = []
})
</script>
