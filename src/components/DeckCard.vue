<template>
  <div class="border rounded-lg p-6 bg-white hover:shadow-md cursor-pointer">
    <div class="flex justify-between items-start mb-4">
      <h3 class="font-medium text-lg">{{ deck.name }}</h3>
      <div class="flex space-x-1">
        <span v-for="tag in deck.tags" :key="tag"
              class="px-2 py-1 rounded-full text-xs font-medium"
              :class="getTagColor(tag)">
          {{ tag }}
        </span>
      </div>
    </div>

    <p class="text-gray-600 text-sm mb-4">{{ deck.description }}</p>

    <div class="flex justify-between items-center">
      <span class="text-sm text-gray-500">{{ deck.cards.length }} cards</span>
      <button @click="startLearning(deck.id)"
              class="text-blue-600 hover:text-blue-700 text-sm font-medium">
        Start Learning →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Deck } from '@/types'

const props = defineProps<{
  deck: Deck
}>()

console.log(props.deck)

const router = useRouter()

const startLearning = (deckId: number) => {
  router.push(`/learn/${deckId}`)
}

const getTagColor = (tag: string) => {
  const colors: Record<string, string> = {
    'private': 'bg-purple-100 text-purple-800',
    'public': 'bg-green-100 text-green-800',
    'shared': 'bg-blue-100 text-blue-800'
  }
  return colors[tag] || 'bg-gray-100 text-gray-800'
}
</script>
