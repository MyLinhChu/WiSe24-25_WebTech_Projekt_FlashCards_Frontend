import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FlashCard from '../../components/FlashCard.vue';

describe('FlashCard.vue', () => {
  it('displays the question on the front of the card', () => {
    const card = { frage: 'What is Vue.js?', antwort: 'A JavaScript framework' };
    const wrapper = mount(FlashCard, { props: { card } });

    expect(wrapper.text()).toContain('What is Vue.js?');
  });
});
