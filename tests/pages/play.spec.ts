import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import PlayPage from '~/pages/play.vue';

const { mockedUseGame, mockScoreStore } = vi.hoisted(() => {
  return { 
    mockedUseGame: vi.fn(),
    mockScoreStore: {
      value: 0,
      fetch: vi.fn().mockResolvedValue(undefined)
    }
  };
});

vi.mock('~/composables/useGame', () => ({ useGame: mockedUseGame }));
vi.mock('~/stores/score.store', () => ({
  useScoreStore: () => mockScoreStore
}));

describe('play ページ', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    mockedUseGame.mockClear();
    mockScoreStore.fetch.mockClear();
  });

  it('マウント時に useGame が呼ばれ、canvas 用コンテナが存在する', async () => {
    const wrapper = mount(PlayPage);
    
    // Wait for async operations to complete
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.find('.game-container').exists()).toBe(true);
    expect(mockedUseGame).toHaveBeenCalledTimes(1);
    expect(mockScoreStore.fetch).toHaveBeenCalledTimes(1);
  });
});
