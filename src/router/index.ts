import { createRouter, createWebHistory } from 'vue-router' // Router-Funktionen von Vue
import HomeView from '../views/HomeView.vue' // Hauptseite (Liste der Decks)
import CreateDeckView from '../views/CreateDeckView.vue' // Seite zum Erstellen/Bearbeiten von Decks
import LearnView from '../views/LearnView.vue' // Seite für den Lernmodus

const router = createRouter({
  history: createWebHistory(),  // Verwendet die Browser-Historie für Navigation (ohne Hash in URLs)
  routes: [
    {
      path: '/', // Startseite
      name: 'home',
      component: HomeView // Verknüpfung mit HomeView-Komponente
    },
    {
      path: '/create', // Seite zum Erstellen eines neuen Decks
      name: 'create',
      component: CreateDeckView
    },
    {
      path: '/edit/:id', // Seite zum Bearbeiten eines Decks (ID des Decks wird in der URL übergeben)
      name: 'edit',
      component: CreateDeckView
    },
    {
      path: '/learn/:id', // Seite für den Lernmodus eines spezifischen Decks
      name: 'learn',
      component: LearnView
    }
  ]
})
// Router exportieren, um ihn in main.ts zu verwenden
export default router
