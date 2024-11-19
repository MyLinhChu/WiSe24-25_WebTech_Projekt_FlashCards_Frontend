<template>
  <div class="max-w-xl mx-auto">
    <div
      class="relative preserve-3d card-container"
      @click="flipCard"
    >
      <div
        class="card-face card-front"
        :class="{ 'is-flipped': isFlipped }"
      >
        <div class="text-center">
          <h3 class="text-2xl font-semibold mb-4">{{ card.frage }}</h3>
          <p class="text-gray-600">Click to flip</p>
        </div>
      </div>

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

    <div class="mt-8 flex justify-center gap-4">
      <button
        @click="handleResponse(false)"
        class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
      >
        Incorrect
      </button>
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
import { ref } from 'vue'

const props = defineProps<{
  card: {
    frage: string
    antwort: string
  }
}>()

console.log(props)

const emit = defineEmits<{
  (e: 'response', correct: boolean): void
}>()

const isFlipped = ref(false)

const flipCard = () => {
  isFlipped.value = !isFlipped.value
}

const handleResponse = (correct: boolean) => {
  emit('response', correct)
  isFlipped.value = false
}
</script>

<style scoped>
.preserve-3d {
  perspective: 1000px;
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
  backface-visibility: hidden;
  transition: transform 0.6s;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-front {
  transform: rotateY(0deg);
}

.card-front.is-flipped {
  transform: rotateY(180deg);
}

.card-back {
  transform: rotateY(-180deg);
}

.card-back.is-flipped {
  transform: rotateY(0deg);
}
</style>
