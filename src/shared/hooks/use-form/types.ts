import { ZodSchema } from "zod";

export type LooseKeys<Values> = keyof Values | (string & Record<string, unknown>);
export type FormErrors = Record<string, React.ReactNode>;


export type SetFieldValue<Values> = <Field extends LooseKeys<Values>>(
    path: Field,
    value: string | number
  ) => void;


export type GetInputProps<Values> = <Field extends LooseKeys<Values>>(
    path: Field,
  ) => any;

export type UseFormType<
  Values,
  TValidate
>  = {
  initialValues: Values;
  rules?: ZodSchema<TValidate>;
  initialErrors?: any[]
}

export type ClearErrors = () => void;
export type SetErrors = (err: any) => void;
export type SetValues<Values> = (val: Values) => void;
export type IsValid = () => boolean;
export type ClearFieldError = (path: unknown) => void;
export type SubmitParam<Values> = {values: Values|null, isValid: boolean, errors: any}
export type OnSubmit<Values> = (
  handleSubmit: (
    data: SubmitParam<Values>,
    event: React.FormEvent<HTMLFormElement|HTMLButtonElement>
  ) => void
) => (event: React.FormEvent<HTMLFormElement|HTMLButtonElement>) => void;