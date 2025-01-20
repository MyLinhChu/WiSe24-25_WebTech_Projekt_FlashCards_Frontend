import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import HomeView from '../../views/HomeView.vue';
//funktioniert
describe('HomeView.vue - Search Functionality', () => {
  it('filters decks based on the search query', async () => {
    const decks = [
      { id: 1, name: 'Math Deck', description: 'Learn math', cards: [] },
      { id: 2, name: 'Science Deck', description: 'Explore science', cards: [] },
    ];

    const wrapper = mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: { deck: { decks } },
          }),
        ],
        stubs: ['router-link'],
      },
    });

    // Set the search query to "Math"
    const searchInput = wrapper.find('input[placeholder="Search decks..."]');
    await searchInput.setValue('Math');

    // Assert that only "Math Deck" is displayed
    expect(wrapper.text()).toContain('Math Deck');
    expect(wrapper.text()).not.toContain('Science Deck');
  });
});
