import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeView from '../../views/HomeView.vue';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createMemoryHistory } from 'vue-router';
import { useDeckStore } from '@/stores/decks';

describe('DeleteDeck.vue', () => {
  it('deletes a deck when delete button is clicked', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', name: 'home', component: HomeView }],
    });

    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        deck: {
          decks: [{ id: 1, name: 'Test Deck', description: 'Description', cards: [] }],
        },
      },
    });

    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia, router],
      },
    });

    const deckStore = useDeckStore(); // Correctly access the store
    const deleteSpy = vi.spyOn(deckStore, 'deleteDeck');

    // Click delete button
    const deleteButton = wrapper.find('button[text-gray-500]');
    expect(deleteButton.exists()).toBe(true);
    await deleteButton.trigger('click');

    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});

