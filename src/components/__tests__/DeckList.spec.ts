import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DeckList from '@/views/HomeView.vue';

describe('DeckList.vue', () => {
  it('renders the list of decks', () => {
    const decks = [
      { id: 1, name: 'Math', cards: [] },
      { id: 2, name: 'Science', cards: [] }
    ];
    const wrapper = mount(DeckList, {
      global: { mocks: { $store: { state: { decks } } } }
    });

    expect(wrapper.text()).toContain('Math');
    expect(wrapper.text()).toContain('Science');
  });
});
