import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import LearnView from '../../views/LearnView.vue';

describe('LearnViewProgress.vue', () => {
  it('shows correct progress based on answered cards', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', name: 'learn', component: LearnView }],
    });

    const wrapper = mount(LearnView, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              deck: {
                decks: [
                  {
                    id: 1,
                    name: 'Sample Deck',
                    cards: [
                      { id: 1, frage: 'Q1', antwort: 'A1' },
                      { id: 2, frage: 'Q2', antwort: 'A2' },
                    ],
                  },
                ],
              },
            },
          }),
        ],
        stubs: ['router-link'],
      },
      data() {
        return {
          correctCount: 1,
          incorrectCount: 0,
          currentIndex: 1,
          cards: [
            { id: 1, frage: 'Q1', antwort: 'A1' },
            { id: 2, frage: 'Q2', antwort: 'A2' },
          ],
        };
      },
    });

    // Fortschritt überprüfen
    expect(wrapper.text()).toContain('Card 2 of 2');
    expect(wrapper.text()).toContain('Correct: 1');
    expect(wrapper.text()).toContain('Incorrect: 0');
  });
});
