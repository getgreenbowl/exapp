import { useCallback, useState } from 'react';
import { checkErrors, getFieldError } from './format-error';
import {
  ClearErrors,
  GetInputProps,
  IsValid,
  OnSubmit,
  SetErrors,
  SetFieldValue,
  SetValues,
  UseFormType,
} from './types';

export const useForm = <Values = Record<string, unknown>, TValidate = any>({
  initialValues = {} as Values,
  rules,
  initialErrors = [],
}: UseFormType<Values, TValidate>) => {
  const [values, _setValues] = useState<null | Values>(initialValues);
  const [errors, _setErrors] = useState<any>(initialErrors);

  //  setfield value
  const setFieldValue: SetFieldValue<Values> = useCallback(
    (path, value) => {
      const form: any = values;
      form[path] = value;
      _setValues({ ...form });
    },
    [values]
  );

  //  get input props
  const getInputProps: GetInputProps<Values> = (field) => {
    const onChange = (val: any) => {
      setFieldValue(field, val);
      validate();
    };
    const payload: Record<string, any> = { onChange };

    // @ts-ignore
    payload.value = values[field];
    payload.name = field;
    payload.placeholder = field;
    payload.type = 'text';

    return payload;
  };

  const getRnInputProps: GetInputProps<Values> = (field) => {
    const onChangeText = (val: string | number) => {
      setFieldValue(field, val);
      validate();
    };
    const payload: Record<string, any> = { onChangeText };
    // @ts-ignore
    payload.value = values[field];
    payload.name = field;
    payload.placeholder = `Enter ${field.toString()}`;
    if (errors?.length) {
      payload.error = getFieldError(field, errors);
    }

    return payload;
  };
  // doesn't set isvalidate field
  const isValid: IsValid = useCallback(() => {
    return !!rules?.safeParse(values).success;
  }, [values, rules]);

  const clearErrors: ClearErrors = useCallback(() => _setErrors([]), []);
  const setErrors: SetErrors = useCallback((err) => _setErrors([...err]), []);

  const setValues: SetValues<Values> = useCallback((payload) => {
    _setValues((currentValues) => {
      return { ...currentValues, ...payload };
    });
  }, []);

  /**
   * validates the form
   */
  const validate = useCallback(() => {
    const errors = checkErrors(values, rules);
    setErrors(errors);
    return !errors.length;
  }, [values, rules, setErrors]);

  /**
   * @empty values in the form and clears the errors
   */
  const reset = useCallback(() => {
    _setValues({ ...initialValues });
    clearErrors();
  }, [clearErrors, initialValues]);

  /**
   *
   * @param handleSubmit function which gets passed
   * @returns executes the function passed as params with with values and form information
   */
  const onSubmit: OnSubmit<Values> = (handleSubmit) => (event) => {
    event.preventDefault();
    handleSubmit(
      { values, isValid: isValid(), errors: checkErrors(values, rules) },
      event
    );
  };

  return {
    values,
    errors,
    getInputProps,
    getRnInputProps,
    isValid,
    validate,
    clearErrors,
    reset,
    setValues,
    onSubmit,
    setErrors,
    setFieldValue,
  };
};
