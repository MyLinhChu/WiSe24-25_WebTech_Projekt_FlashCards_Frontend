<template>
  <div class="max-w-2xl mx-auto p-6 space-y-6">
    <div class="flex justify-between items-center mb-6">
      <router-link
        to="/"
        class="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeftIcon class="w-5 h-5 mr-2" />
        Back to Home
      </router-link>
      <p class="text-gray-600">Card {{ currentIndex + 1 }} of {{ cards.length }}</p>
    </div>

    <div class="progress-bar flex h-2 rounded-full overflow-hidden bg-gray-200 mb-6">
      <div
        class="bg-green-500 transition-all duration-300"
        :style="{ width: `${(correctCount / cards.length) * 100}%` }"
      ></div>
      <div
        class="bg-red-500 transition-all duration-300"
        :style="{ width: `${(incorrectCount / cards.length) * 100}%` }"
      ></div>
    </div>

    <div class="flex justify-center gap-4 mb-6 text-sm">
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-gray-200 mr-2"></div>
        <span>Remaining: {{ remainingCount }}</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <span>Correct: {{ correctCount }}</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <span>Incorrect: {{ incorrectCount }}</span>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading flashcards...</p>
    </div>

    <template v-else>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">{{ deck?.name }}</h1>
      </div>

      <FlashCard
        v-if="currentCard"
        :card="currentCard"
        @response="handleCardResponse"
      />

      <div v-if="completed" class="text-center py-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Session Complete!</h2>
        <p class="text-gray-600 mb-6">
          Final Score: {{ correctCount }} correct, {{ incorrectCount }} incorrect
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="restartSession"
            class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Restart Session
          </button>
          <router-link
            to="/"
            class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
          >
            Back to Home
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon } from 'lucide-vue-next'
import FlashCard from '@/components/FlashCard.vue'
import type { FlashCard as FlashCardType } from '@/types'
import { useDeckStore } from '@/stores/decks'

const route = useRoute()
const router = useRouter()

const deckStore = useDeckStore()
const loading = ref(true)
const currentIndex = ref(0)
const cards = ref<FlashCardType[]>([])
const completed = ref(false)
const correctCount = ref(0)
const incorrectCount = ref(0)

const deckId = parseInt(route.params.id as string)
const deck = computed(() => deckStore.getDeck(deckId))
const currentCard = computed(() => cards.value[currentIndex.value])
const remainingCount = computed(() =>
  cards.value.length - (correctCount.value + incorrectCount.value)
)

const handleCardResponse = (correct: boolean) => {
  if (correct) {
    correctCount.value++
  } else {
    incorrectCount.value++
  }

  if (currentIndex.value < cards.value.length - 1) {
    currentIndex.value++
  } else {
    completed.value = true
  }
}

const restartSession = () => {
  currentIndex.value = 0
  completed.value = false
  correctCount.value = 0
  incorrectCount.value = 0
}

onMounted(async () => {
  try {
    await deckStore.fetchDecks()
    if (!deck.value) {
      router.push('/')
      return
    }
    cards.value = [...deck.value.cards]
  } finally {
    loading.value = false
  }
})
</script>
