<template>
  <div class="min-h-screen bg-gray-50">
    <!--Globale Navigationsleiste -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <!-- Link zur Startseite -->
            <router-link to="/" class="flex items-center">
              <!-- Icon für die App -->
              <BookOpenIcon class="h-8 w-8 text-blue-500" />
              <!-- App-Name -->
              <span class="ml-2 text-xl font-bold">RecallHub</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <!-- Hauptinhalt, der basierend auf der aktuellen Route angezeigt wird -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Dynamische Ansicht wird hier eingefügt -->
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { BookOpenIcon } from 'lucide-vue-next' // Import eines Icons
</script>
