import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LearnView from '../../views/LearnView.vue';

describe('LearnView.vue', () => {
  it('shows correct progress based on answered cards', async () => {
    const cards = [
      { id: 1, frage: 'Q1', antwort: 'A1' },
      { id: 2, frage: 'Q2', antwort: 'A2' },
    ];

    // Mount the component with props and mock the initial state
    const wrapper = mount(LearnView, {
      global: {
        mocks: {
          $route: { params: { id: '1' } }, // Mock route parameters
        },
      },
      data() {
        return {
          correctCount: 1, // Initial correct count
          incorrectCount: 0, // Initial incorrect count
          currentIndex: 1, // Start on the second card
          cards,
        };
      },
    });

    // Assert the progress is correctly displayed
    expect(wrapper.text()).toContain('Card 2 of 2');
  });
});
