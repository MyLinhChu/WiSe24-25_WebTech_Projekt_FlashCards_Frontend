<template>
  <div class="max-w-xl mx-auto">
    <!-- Karte, die umgedreht werden kann -->
    <div
      class="relative preserve-3d card-container"
      @click="flipCard"
    >
      <!-- Vorderseite der Karte -->
      <div
        class="card-face card-front"
        :class="{ 'is-flipped': isFlipped }"
      >
        <div class="text-center">
          <h3 class="text-2xl font-semibold mb-4">{{ card.frage }}</h3>
          <p class="text-gray-600">Click to flip</p>
        </div>
      </div>

      <!-- Rückseite der Karte -->
      <div
        class="card-face card-back"
        :class="{ 'is-flipped': isFlipped }"
      >
        <div class="text-center">
          <h3 class="text-2xl font-semibold mb-4">{{ card.antwort }}</h3>
          <p class="text-gray-600">Click to flip</p>
        </div>
      </div>
    </div>

    <!-- Buttons zum Bewerten der Antwort -->
    <div class="mt-8 flex justify-center gap-4">
      <!-- Bewertet die Antwort als falsch -->
      <button
        @click="handleResponse(false)"
        class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
      >
        Incorrect
      </button>

      <!-- Bewertet die Antwort als richtig -->
      <button
        @click="handleResponse(true)"
        class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
      >
        Correct
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue' // Reaktive Variable für Umdreh-Zustand

// Eigenschaften für Frage-Antwort-Karte
const props = defineProps<{
  card: {
    frage: string
    antwort: string
  }
}>()

console.log(props)

// Ereignis zur Übermittlung des Benutzerfeedbacks
const emit = defineEmits<{
  (e: 'response', correct: boolean): void
}>()

// Reaktive Variable, um den Umdreh-Zustand der Karte zu speichern
const isFlipped = ref(false)

// Funktion zum Umdrehen der Karte
const flipCard = () => {
  isFlipped.value = !isFlipped.value // Flipped-Zustand umschalten
}

// Funktion, um das Benutzerfeedback zu senden
const handleResponse = (correct: boolean) => {
  emit('response', correct) // Feedback senden
  isFlipped.value = false // Karte zurückdrehen
}
</script>

<style scoped>
/* Styling für die Karte */
.preserve-3d {
  perspective: 1000px; /* Perspektive für 3D-Drehung */
}

.card-container {
  width: 100%;
  height: 300px;
  cursor: pointer;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;  /* Versteckt die Rückseite */
  transition: transform 0.6s; /* Animation bei Drehung */
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-front {
  transform: rotateY(0deg); /* Standardzustand */
}

.card-front.is-flipped {
  transform: rotateY(180deg);  /* Umdrehen */
}

.card-back {
  transform: rotateY(-180deg); /* Rückseite */
}

.card-back.is-flipped {
  transform: rotateY(0deg);  /* Sichtbar */
}
</style>
