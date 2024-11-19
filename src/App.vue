<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex items-center">
              <BookOpenIcon class="h-8 w-8 text-blue-500" />
              <span class="ml-2 text-xl font-bold">FlashCards</span>
            </router-link>
          </div>
          <div class="flex items-center">
            <router-link
              to="/create"
              class="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Create Deck
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { BookOpenIcon } from 'lucide-vue-next'
</script>
