import { ref } from 'vue';
import { useEventListener } from '../useEventListener';

export function useWindowSize() {
  const width = ref(__isBrowser__ ? window.innerWidth : 0);
  const height = ref(__isBrowser__ ? window.innerHeight : 0);

  const onResize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  useEventListener('resize', onResize);
  useEventListener('orientationchange', onResize);

  return { width, height };
}
