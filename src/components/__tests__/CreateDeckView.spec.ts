import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createMemoryHistory } from 'vue-router';
import CreateDeckView from '../../views/CreateDeckView.vue';
//funktioniert
describe('CreateDeckView.vue', () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', name: 'home', component: { template: '<div>Home</div>' } }],
  });

  it('renders the form with input fields', () => {
    const wrapper = mount(CreateDeckView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), router],
        stubs: ['router-link'],
      },
    });

    expect(wrapper.find('input#deckName').exists()).toBe(true);
    expect(wrapper.find('textarea#deckDescription').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });
});
