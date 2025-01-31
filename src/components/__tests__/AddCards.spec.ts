import { describe, it, vi, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeView from '../../views/HomeView.vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import CreateDeckView from '../../views/CreateDeckView.vue';

describe('AddCards.vue', () => {
  it('adds a new card to the deck', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/edit/:id', name: 'edit', component: CreateDeckView },
      ],
    });

    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        deck: {
          decks: [{ id: 1, name: 'Sample Deck', description: '', cards: [] }],
        },
      },
    });

    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia, router],
      },
    });

    // Navigate programmatically to the edit route
    router.push('/edit/:1');
    await router.isReady();

    // Verify that the correct component is rendered for the route
    const createDeckView = wrapper.findComponent(CreateDeckView);
    expect(createDeckView.exists()).toBe(true);

    // Interact with the Add Card button in the CreateDeckView
    const addCardButton = createDeckView.find('button:has-text("Add Card")');
    expect(addCardButton.exists()).toBe(true); // Ensure button exists
    await addCardButton.trigger('click');

    // Check if a new card input was added
    const cardInputs = createDeckView.findAll('input[placeholder="Question"]');
    expect(cardInputs.length).toBe(1); // One card input should now exist
  });
});
