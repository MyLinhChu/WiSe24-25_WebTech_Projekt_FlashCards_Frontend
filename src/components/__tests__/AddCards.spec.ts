import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import CreateDeckView from '../../views/CreateDeckView.vue';

describe('AddCards.vue', () => {
  it('adds a new card when the "Add Card" button is clicked', async () => {
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
              deck: {
                decks: [],
              },
            },
          }),
        ],
        stubs: ['router-link'],
      },
    });

    // Überprüfen, ob beim Laden eine Standardkarte vorhanden ist
    expect(wrapper.findAll('input[placeholder="Question"]').length).toBe(1);

    // Button "Add Card" klicken
    const addButton = wrapper.find('button[type="button"]');
    await addButton.trigger('click');

    // Prüfen, ob eine zweite Karte hinzugefügt wurde
    expect(wrapper.findAll('input[placeholder="Question"]').length).toBe(2);
    expect(wrapper.findAll('input[placeholder="Answer"]').length).toBe(2);
  });
});
