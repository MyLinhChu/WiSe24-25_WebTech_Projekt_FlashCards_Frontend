import { createApp } from 'vue' // Importiert die Funktion zum Erstellen einer Vue-App
import { createPinia } from 'pinia'  // Importiert Pinia, das für das State-Management verwendet wird
import App from './App.vue' // Importiert die Hauptkomponente (die Wurzelkomponente der App)
import router from './router' // Importiert die Router-Konfiguration (Navigation zwischen Seiten)
import './index.css' // Importiert die globale CSS-Datei (Tailwind CSS)

const app = createApp(App) // Erstellt die Vue-App basierend auf der Hauptkomponente `App`
app.use(createPinia()) // Bindet Pinia (State-Management) an die App
app.use(router) // Bindet den Router (Navigation) an die App
app.mount('#app') // Bindet die App an das HTML-Element mit der ID `#app` und startet die Anwendung
