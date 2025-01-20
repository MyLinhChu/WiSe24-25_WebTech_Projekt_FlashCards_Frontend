import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import HomeView from '../../views/HomeView.vue';
//funktioniert

describe('HomeView.vue - Deck Descriptions', () => {
  it('displays deck descriptions', () => {
    const decks = [
      { id: 1, name: 'Math Deck', description: 'Learn math formulas', cards: [] },
      { id: 2, name: 'Science Deck', description: 'Explore science topics', cards: [] },
    ];

    const wrapper = mount(HomeView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn, initialState: { deck: { decks } } })],
        stubs: ['router-link'],
      },
    });

    // Assert that deck descriptions are displayed
    expect(wrapper.text()).toContain('Learn math formulas');
    expect(wrapper.text()).toContain('Explore science topics');
  });
});
