import { ref } from 'vue';
import { useEventListener } from '../useEventListener';

export function usePageVisibility() {
  const visibility = ref<VisibilityState>('visible');

  const setVisibility = () => {
    if (__isBrowser__) {
      visibility.value = document.hidden ? 'hidden' : 'visible';
    }
  };

  setVisibility();
  useEventListener('visibilitychange', setVisibility);

  return visibility;
}
