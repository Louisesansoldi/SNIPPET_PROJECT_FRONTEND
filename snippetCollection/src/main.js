import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Importer les composants
import AuthPage from './components/AuthPage.vue'
import MyCollection from './components/MyCollection.vue'

// Configurer les routes
const routes = [
    { path: '/', component: AuthPage },
    { path: '/MyCollection/:collectionId', name: 'MyCollection', component: MyCollection }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Créer et configurer l'application Vue
const app = createApp(App)
app.use(router)
app.mount('#app')
