import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import DeckList from '../../views/HomeView.vue';
//funktioniert
describe('DeckList.vue', () => {
  it('renders the list of decks', () => {
    const decks = [
      { id: 1, name: 'Math Deck', description: 'Description for Math Deck', cards: [{ frage: '1', antwort: '1' }] },
      { id: 2, name: 'Science Deck', description: 'Description for Science Deck', cards: [] },
    ];

    const wrapper = mount(DeckList, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn, initialState: { deck: { decks } } })],
        stubs: ['router-link'],
      },
    });

    expect(wrapper.text()).toContain('Math Deck');
    expect(wrapper.text()).toContain('Science Deck');
    expect(wrapper.text()).toContain('1 cards');
    expect(wrapper.text()).toContain('0 cards');
  });
});
