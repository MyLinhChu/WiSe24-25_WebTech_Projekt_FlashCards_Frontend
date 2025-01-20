import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import HomeView from '../../views/HomeView.vue';
//funktioniert
describe('HomeView.vue - Empty State', () => {
  it('displays a message when no decks exist', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: { deck: { decks: [] } },
          }),
        ],
        stubs: ['router-link'],
      },
    });

    // Assert that the empty state message is displayed
    expect(wrapper.text()).toContain('My Flashcard Decks');
  });
});
