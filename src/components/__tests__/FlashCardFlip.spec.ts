import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FlashCard from '../../components/FlashCard.vue';
//funktioniert
describe('FlashCard.vue', () => {
  it('flips the card when clicked', async () => {
    const card = { frage: 'What is Vue.js?', antwort: 'A JavaScript framework' };
    const wrapper = mount(FlashCard, { props: { card } });

    await wrapper.trigger('click');
    expect(wrapper.text()).toContain('A JavaScript framework');
  });
});
