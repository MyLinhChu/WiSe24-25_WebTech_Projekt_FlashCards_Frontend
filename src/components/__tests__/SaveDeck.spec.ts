import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeView from '../../views/HomeView.vue';
import CreateDeckView from '../../views/CreateDeckView.vue';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createMemoryHistory } from 'vue-router';
import { useDeckStore } from '@/stores/decks';

describe('SaveDeck.vue', () => {
  it('saves a new deck correctly', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/create', name: 'create', component: CreateDeckView },
      ],
    });

    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: { deck: { decks: [] } },
    });

    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia, router],
      },
    });

    const deckStore = useDeckStore();
    const saveSpy = vi.spyOn(deckStore, 'createDeck');

    // Navigate to create deck view
    const createLink = wrapper.find('a[href="/create"]');
    await createLink.trigger('click');

    await router.isReady();

    // Fill in the form in CreateDeckView
    const createView = wrapper.findComponent(CreateDeckView);
    await createView.find('input#deckName').setValue('New Deck');
    await createView.find('textarea#deckDescription').setValue('Deck Description');
    await createView.find('button[type="submit"]').trigger('click');

    expect(saveSpy).toHaveBeenCalledWith('New Deck', 'Deck Description', []);
  });
});
