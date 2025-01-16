import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import DeckList from '../../views/HomeView.vue';

describe('DeleteDeck.vue', () => {
  it('calls deleteDeck when the delete button is clicked', async () => {
    const mockDeleteDeck = vi.fn();

    const wrapper = mount(DeckList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              deck: {
                decks: [{ id: 1, name: 'Math Deck', description: '', cards: [] }],
              },
            },
          }),
        ],
        stubs: ['router-link'],
      },
    });

    const deleteButton = wrapper.find('button.text-red-500');
    expect(deleteButton.exists()).toBe(true);

    await deleteButton.trigger('click');
    expect(mockDeleteDeck).toHaveBeenCalled(); // Prüfen, ob deleteDeck aufgerufen wurde
  });
});
