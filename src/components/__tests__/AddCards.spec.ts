import { describe, it, expect, beforeEach } from 'vitest'; // Import beforeEach
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia'; // Pinia setup
import { createRouter, createWebHistory } from 'vue-router'; // Vue Router setup
import DeckList from '../../views/HomeView.vue'; // Component to test

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: DeckList }]
});

describe('DeckList.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Set up Pinia before each test
  });

  it('renders the list of decks', async () => {
    const decks = [
      { id: 1, name: 'Math', cards: [] },
      { id: 2, name: 'Science', cards: [] }
    ];

    const wrapper = mount(DeckList, {
      global: {
        plugins: [createPinia(), router], // Provide Pinia and router
        stubs: {
          'router-link': true // Stub router-link to avoid full routing
        }
      }
    });

    await router.isReady(); // Wait for router to initialize

    expect(wrapper.text()).toContain('Math');
    expect(wrapper.text()).toContain('Science');
  });
});
