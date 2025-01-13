import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CreateDeckView from  '../../views/HomeView.vue';

describe('CreateDeckView.vue', () => {
  it('adds a new card when the add button is clicked', async () => {
    // Mount the component
    const wrapper = mount(CreateDeckView, {
      global: {
        stubs: ['router-link'], // Stub router-link to avoid navigation issues
      },
    });

    // Ensure there are no cards initially
    expect(wrapper.findAll('input[placeholder="Question"]').length).toBe(0);

    // Simulate adding a card
    const addButton = wrapper.find('button.mt-4'); // Selector for the "Add Card" button
    await addButton.trigger('click');

    // Check that one card input is added
    const questionInputs = wrapper.findAll('input[placeholder="Question"]');
    const answerInputs = wrapper.findAll('input[placeholder="Answer"]');

    expect(questionInputs.length).toBe(1);
    expect(answerInputs.length).toBe(1);
  });

  it('removes a card when the delete button is clicked', async () => {
    // Mount the component
    const wrapper = mount(CreateDeckView, {
      global: {
        stubs: ['router-link'], // Stub router-link to avoid navigation issues
      },
    });

    // Add two cards
    const addButton = wrapper.find('button.mt-4');
    await addButton.trigger('click');
    await addButton.trigger('click');

    // Check two cards are added
    expect(wrapper.findAll('input[placeholder="Question"]').length).toBe(2);

    // Remove the first card
    const deleteButtons = wrapper.findAll('button.text-red-500'); // Selector for delete buttons
    await deleteButtons[0].trigger('click');

    // Check that one card remains
    expect(wrapper.findAll('input[placeholder="Question"]').length).toBe(1);
  });
});
