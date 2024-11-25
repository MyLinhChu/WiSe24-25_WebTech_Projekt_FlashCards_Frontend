<template>
  <div class="max-w-2xl mx-auto p-6 space-y-6">
    <!-- Navigationsleiste -->
    <div class="flex justify-between items-center mb-6">
      <!-- Zurück zur Startseite -->
      <router-link
        to="/"
        class="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeftIcon class="w-5 h-5 mr-2" />
        Back to Home
      </router-link>
      <!-- Fortschrittsanzeige -->
      <p class="text-gray-600">Card {{ currentIndex + 1 }} of {{ cards.length }}</p>
    </div>

    <!-- Fortschrittsbalken -->
    <div class="progress-bar flex h-2 rounded-full overflow-hidden bg-gray-200 mb-6">
      <!-- Richtig beantwortete Karten -->
      <div
        class="bg-green-500 transition-all duration-300"
        :style="{ width: `${(correctCount / cards.length) * 100}%` }"
      ></div>
      <!-- Falsch beantwortete Karten -->
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

      <!-- FlashCard Component -->
      <!-- Übergibt aktuelle Karte -->
      <!-- Antwort verarbeiten -->
      <FlashCard
        v-if="currentCard"
        :card="currentCard"
        @response="handleCardResponse"
      />

      <!-- Abschlussanzeige, wenn alle Karten gelernt wurden -->
      <div v-if="completed" class="text-center py-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Session Complete!</h2>
        <p class="text-gray-600 mb-6">
          Final Score: {{ correctCount }} correct, {{ incorrectCount }} incorrect
        </p>

        <!-- Optionen -->
        <div class="flex justify-center gap-4">
          <!-- Sitzung neu starten -->
          <button
            @click="restartSession"
            class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Restart Session
          </button>
          <!-- Zurück zur Startseite -->
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
import { ref, computed, onMounted } from 'vue' // Reaktive Variablen und Lifecycle-Hooks
import { useRoute, useRouter } from 'vue-router' // Router für Navigation
import { ArrowLeftIcon } from 'lucide-vue-next' // Icons
import FlashCard from '@/components/FlashCard.vue' // FlashCard-Komponente
import type { FlashCard as FlashCardType } from '@/types' // Typ für Karten
import { useDeckStore } from '@/stores/decks' // Pinia-Store für Decks

// Route und Router
const route = useRoute()
const router = useRouter()
const deckStore = useDeckStore() // Store für Deck-Daten

// State für das Lernsystem
const loading = ref(true) // Ladeanzeige
const currentIndex = ref(0) // Index der aktuellen Karte
const cards = ref<FlashCardType[]>([])  // Karten im aktuellen Deck
const completed = ref(false) // Ob die Lernsession abgeschlossen ist
const correctCount = ref(0) // Korrekte Antworten
const incorrectCount = ref(0) // Falsche Antworten

// Aktuelles Deck aus dem Store holen
const deckId = parseInt(route.params.id as string) // ID aus der Route
const deck = computed(() => deckStore.getDeck(deckId))
const currentCard = computed(() => cards.value[currentIndex.value]) // Aktuelle Karte
const remainingCount = computed(() =>
  cards.value.length - (correctCount.value + incorrectCount.value) // Anzahl verbleibender Karten
)

// Methode zur Verarbeitung einer Antwort (richtig oder falsch)
const handleCardResponse = (correct: boolean) => {
  if (correct) {
    correctCount.value++
  } else {
    incorrectCount.value++
  }

  // Nächste Karte oder Session abschließen
  if (currentIndex.value < cards.value.length - 1) {
    currentIndex.value++
  } else {
    completed.value = true
  }
}

// Session neu starten
const restartSession = () => {
  currentIndex.value = 0
  completed.value = false
  correctCount.value = 0
  incorrectCount.value = 0
}

// Deck-Daten beim Mounten laden
onMounted(async () => {
  try {
    await deckStore.fetchDecks() // Decks abrufen
    if (!deck.value) {
      router.push('/') // Wenn Deck fehlt, zurück zur Startseite
      return
    }
    cards.value = [...deck.value.cards] // Karten in State speichern
  } finally {
    loading.value = false // Ladeanzeige deaktivieren
  }
})
</script>
