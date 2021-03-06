import { defineComponent } from 'vue';
import { truthProp, createNamespace } from '../utils';
import { useChildren } from '../pant-use';
import './index.less';

const [name, bem] = createNamespace('action-bar');

export const ACTION_BAR_KEY = Symbol(name);

export default defineComponent({
  name,

  props: {
    safeAreaInsetBottom: truthProp,
  },

  setup(props, { slots }) {
    const { linkChildren } = useChildren(ACTION_BAR_KEY);

    linkChildren();

    return () => (
      <div class={bem({ unfit: !props.safeAreaInsetBottom })}>
        {slots.default?.()}
      </div>
    );
  },
});
