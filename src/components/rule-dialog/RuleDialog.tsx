import { PropType, defineComponent } from 'vue';

// Utils
import {
  pick,
  extend,
  addUnit,
  truthProp,
  isFunction,
  unknownProp,
  createNamespace,
} from '../utils';
import { popupSharedProps, popupSharedPropKeys } from '../popup/shared';

// Components
import { Popup } from '../popup';
import './index.less';

const [name, bem] = createNamespace('rule-dialog');

export type DialogMessage = string | (() => JSX.Element);
export type DialogMessageAlign = 'left' | 'center' | 'right';

export type PopupCloseIconPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

const popupKeys = [
  ...popupSharedPropKeys,
  'transition',
  'closeOnPopstate',
  'closeOnClickOverlay',
  'closeIcon',
  'closeIconPosition'
] as const;

export default defineComponent({
  name,

  props: extend({}, popupSharedProps, {
    title: String,
    width: {
      type: [Number, String] as PropType<number | string>,
    },
    message: [String, Function] as PropType<DialogMessage>,
    allowHtml: Boolean,
    className: unknownProp,
    messageAlign: String as PropType<DialogMessageAlign>,
    closeOnPopstate: truthProp,
    closeOnClickOverlay: truthProp,
    transition: {
      type: String,
      default: 'pant-dialog-bounce',
    },
    closeIcon: {
      type: String,
      default: 'close',
    },
    closeIconPosition: {
      type: String as PropType<PopupCloseIconPosition>,
      default: 'bottom-center',
    },
  }),

  emits: ['update:show', 'close'],

  setup(props, { emit, slots }) {

    const updateShow = (value: boolean) => emit('update:show', value);
    const close = () => emit('close');

    const renderTitle = () => {
      const title = slots.title ? slots.title() : props.title;
      if (title) {
        return (
          <div
            class={bem('header', {
              isolated: !props.message && !slots.default,
            })}
          >
            {title}
          </div>
        );
      }
    };

    const renderMessage = (hasTitle: boolean) => {
      const { message, allowHtml, messageAlign } = props;
      const classNames = bem('message', {
        'has-title': hasTitle,
        [messageAlign as string]: messageAlign,
      });

      const content = isFunction(message) ? message() : message;

      if (allowHtml && typeof content === 'string') {
        return <div class={classNames} innerHTML={content} />;
      }

      return <div class={classNames}>{content}</div>;
    };

    const renderContent = () => {
      if (slots.default) {
        return <div class={bem('content')}>{slots.default()}</div>;
      }

      const { title, message, allowHtml } = props;
      if (message) {
        const hasTitle = !!(title || slots.title);
        return (
          <div
            // add key to force re-render
            key={allowHtml ? 1 : 0}
            class={bem('content', { isolated: !hasTitle })}
          >
            {renderMessage(hasTitle)}
          </div>
        );
      }
    };


    return () => {
      return (
        <Popup
          role="dialog"
          class={[props.className]}
          style={{ width: addUnit(props.width) }}
          aria-labelledby={props.title || props.message}
          closeable={true}
          {...pick(props, popupKeys)}
          {...{ 'onUpdate:show': updateShow, 'onClose': close }}
        >
          {renderTitle()}
          {renderContent()}
        </Popup>
      );
    };
  },
});