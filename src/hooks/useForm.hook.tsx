import { hasProperties } from "@/components/common/forms/form/form.helpers";
import {
  FormProxy,
  createFormProxy,
} from "@/components/common/forms/form/form.proxy";
import { GreenevilleBJJObject } from "@/types/base.types";

interface UseFormProps {
  formName?: string;
  defaultValues?: GreenevilleBJJObject;
  validationModel?: Record<string, (value: any) => string | null>;
  onFormErrors?: (errors: GreenevilleBJJObject) => void;
  onHandleSubmit?: (formData: GreenevilleBJJObject) => void;
  onHandleUpdate?: (formData: GreenevilleBJJObject) => GreenevilleBJJObject;
}

const noopProxy: FormProxy = {
  setValue: () => {},
  getValue: () => undefined,
  getFormState: () => ({}),
  registerField: () => {},
  deregisterField: () => {},
  submitForm: () => {},
  subscribe: () => {},
  unsubscribe: () => {},
  onFormErrorsListeners: [],
  onHandleSubmitListeners: [],
  onHandleUpdateListeners: [],
  reset: () => {},
};

export const useForm = ({
  formName,
  defaultValues = {},
  validationModel,
  onFormErrors,
  onHandleSubmit,
  onHandleUpdate,
}: UseFormProps): FormProxy => {
  if (!formName) {
    return noopProxy;
  }

  return createFormProxy({
    formName,
    formState: defaultValues,
    setErrors: (errors: GreenevilleBJJObject | undefined) => {
      if (hasProperties(errors)) {
        onFormErrors?.(errors);
      } else {
        onFormErrors?.(undefined);
      }
    },
    validationModel,
    onFormErrors,
    onHandleSubmit,
    onHandleUpdate,
  });
};
