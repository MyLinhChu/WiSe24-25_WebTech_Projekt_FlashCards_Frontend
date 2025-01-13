import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CreateDeckView from '@/views/CreateDeckView.vue';

describe('CreateDeckView.vue', () => {
  it('saves changes when the save button is clicked', async () => {
    const mockSaveDeck = vi.fn();
    const wrapper = mount(CreateDeckView, {
      global: { mocks: { $store: { saveDeck: mockSaveDeck } } }
    });

    await wrapper.find('button.save-deck').trigger('click');
    expect(mockSaveDeck).toHaveBeenCalled();
  });
});
