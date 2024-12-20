<template>
  <div class="max-w-2xl mx-auto space-y-6 p-6">
    <div class="flex justify-between items-center">
      <!-- Titel -->
      <h1 class="text-3xl font-bold text-gray-900">{{ isEditing ? 'Edit Deck' : 'Create New Deck' }}</h1>
      <!-- Zurück-Link -->
      <router-link to="/" class="text-gray-600 hover:text-gray-900 flex items-center">
        <ArrowLeftIcon class="w-5 h-5 mr-2" />
        Back to Home
      </router-link>
    </div>

    <!-- Formular für Deck-Daten -->
    <div class="bg-white shadow rounded-lg p-6">
      <form @submit.prevent="saveDeck" class="space-y-6">
        <!-- Deck Name -->
        <div>
          <label for="deckName" class="block text-sm font-medium text-gray-700">Deck Name</label>
          <input
            type="text"
            id="deckName"
            v-model="deckName"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Deck Beschreibung -->
        <div>
          <label for="deckDescription" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="deckDescription"
            v-model="description"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="3"
            placeholder="A short description of the deck..."
          ></textarea>
        </div>

        <!-- Karten bearbeiten -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Cards</label>
          <div class="space-y-4">
            <!-- Iteration über die Karten -->
            <div v-for="(card, index) in cards" :key="card.id" class="flex gap-4">
              <div class="flex-1">
                <input
                  type="text"
                  v-model="card.frage"
                  placeholder="Question"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div class="flex-1">
                <input
                  type="text"
                  v-model="card.antwort"
                  placeholder="Answer"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <!-- Karte entfernen -->
              <button
                type="button"
                @click="removeCard(index)"
                class="text-red-500 hover:text-red-700"
              >
                <Trash2Icon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Neue Karte hinzufügen -->
          <button
            type="button"
            @click="addCard"
            class="mt-4 flex items-center text-blue-500 hover:text-blue-700"
          >
            <PlusCircleIcon class="w-5 h-5 mr-2" />
            Add Card
          </button>
        </div>

        <!-- Aktionen: Speichern oder Löschen -->
        <div class="flex justify-end gap-4">
          <button
            v-if="isEditing"
            type="button"
            @click="deleteCurrentDeck"
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete Deck
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {{ isEditing ? 'Save Changes' : 'Create Deck' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon, PlusCircleIcon, Trash2Icon } from 'lucide-vue-next'
import { useDeckStore } from '@/stores/decks'
import type { FlashCard } from '@/types'

const route = useRoute()
const router = useRouter()
const deckStore = useDeckStore()

const deckId = computed(() => route.params.id ? parseInt(route.params.id as string) : null)
const isEditing = computed(() => !!deckId.value)

const deckName = ref('')
const description = ref('') // Neue reaktive Variable für die Beschreibung
const cards = ref<FlashCard[]>([])

const addCard = () => {
  cards.value.push({
    id: Date.now(),
    frage: '',
    antwort: ''
  })
}

const removeCard = (index: number) => {
  cards.value.splice(index, 1)
}

const saveDeck = async () => {
  if (isEditing.value && deckId.value) {
    await deckStore.updateDeck(deckId.value, {
      name: deckName.value,
      description: description.value, // Beschreibung in den Updates mitschicken
      cards: cards.value
    })
  } else {
    await deckStore.createDeck(deckName.value, description.value, cards.value) // Beschreibung beim Erstellen mitgeben
  }
  router.push('/')
}

const deleteCurrentDeck = async () => {
  if (confirm('Are you sure you want to delete this deck?')) {
    if (deckId.value) {
      await deckStore.deleteDeck(deckId.value)
      router.push('/')
    }
  }
}

onMounted(() => {
  if (isEditing.value && deckId.value) {
    const deck = deckStore.getDeck(deckId.value)
    if (deck) {
      deckName.value = deck.name
      description.value = deck.description // Bestehende Beschreibung in das Feld laden
      cards.value = [...deck.cards]
    }
  } else {
    addCard()
  }
})
</script>

