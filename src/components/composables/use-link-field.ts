import { watch, inject, InjectionKey, PropType, ExtractPropTypes, Ref } from 'vue';
import { truthProp } from '../utils';

export type FieldTextAlign = 'left' | 'center' | 'right';
export type FieldValidateTrigger = 'onBlur' | 'onChange' | 'onSubmit';
const props = {
  colon: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  showError: Boolean,
  labelWidth: [Number, String],
  labelAlign: String as PropType<FieldTextAlign>,
  inputAlign: String as PropType<FieldTextAlign>,
  scrollToError: Boolean,
  validateFirst: Boolean,
  submitOnEnter: truthProp,
  showErrorMessage: truthProp,
  errorMessageAlign: String as PropType<FieldTextAlign>,
  validateTrigger: {
    type: String as PropType<FieldValidateTrigger>,
    default: 'onBlur',
  },
};

export type FormProvide = {
  props: ExtractPropTypes<typeof props>;
};

export type FieldProvide = {
  childFieldValue: Ref<(() => unknown) | undefined>;
  resetValidation: () => void;
  validateWithTrigger: (trigger: FieldValidateTrigger) => void;
};

export const FORM_KEY: InjectionKey<FormProvide> = Symbol('pant-form');
export const FIELD_KEY: InjectionKey<FieldProvide> = Symbol('pant-field');

export function useLinkField(getValue: () => unknown) {
  const field = inject(FIELD_KEY, null);

  if (field && !field.childFieldValue.value) {
    field.childFieldValue.value = getValue;

    watch(getValue, () => {
      field.resetValidation();
      field.validateWithTrigger('onChange');
    });
  }
}
