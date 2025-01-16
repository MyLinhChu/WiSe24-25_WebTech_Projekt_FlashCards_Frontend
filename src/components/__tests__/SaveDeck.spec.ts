import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import CreateDeckView from '../../views/CreateDeckView.vue';

describe('SaveDeck.vue', () => {
  it('calls saveDeck when the save button is clicked', async () => {
    const mockSaveDeck = vi.fn();

    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', name: 'home', component: CreateDeckView }],
    });

    const wrapper = mount(CreateDeckView, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              deck: { decks: [] },
            },
          }),
        ],
        stubs: ['router-link'],
        mocks: {
          $store: { saveDeck: mockSaveDeck },
        },
      },
    });

    const saveButton = wrapper.find('button[type="submit"]');
    expect(saveButton.exists()).toBe(true);

    await saveButton.trigger('click');
    expect(mockSaveDeck).toHaveBeenCalled(); // Prüfen, ob `saveDeck` aufgerufen wurde
  });
});
