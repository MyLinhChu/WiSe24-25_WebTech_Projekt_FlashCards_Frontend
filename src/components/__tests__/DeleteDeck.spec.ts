import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DeckList from '@/views/HomeView.vue';

describe('DeckList.vue', () => {
  it('calls deleteDeck when delete button is clicked', async () => {
    const mockDeleteDeck = vi.fn();
    const decks = [{ id: 1, name: 'Math', cards: [] }];
    const wrapper = mount(DeckList, {
      global: { mocks: { $store: { state: { decks }, deleteDeck: mockDeleteDeck } } }
    });

    await wrapper.find('button.delete-deck').trigger('click');
    expect(mockDeleteDeck).toHaveBeenCalled();
  });
});
