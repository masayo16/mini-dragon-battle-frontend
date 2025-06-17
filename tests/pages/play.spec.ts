import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PlayPage from '~/pages/play.vue';

const { mockedUseGame } = vi.hoisted(() => {
  return { mockedUseGame: vi.fn() };
});
vi.mock('~/composables/useGame', () => ({ useGame: mockedUseGame }));

describe('play ページ', () => {
  it('マウント時に useGame が呼ばれ、canvas 用コンテナが存在する', async () => {
    const wrapper = mount(PlayPage);

    expect(wrapper.find('.game-container').exists()).toBe(true);

    expect(mockedUseGame).toHaveBeenCalledTimes(1);
  });
});
