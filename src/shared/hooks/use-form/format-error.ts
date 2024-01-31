import { ZodSchema } from 'zod';

export const checkErrors = <Values, Z>(
  values: Values,
  schema: ZodSchema<Z> | undefined
): any[] => {
  if (!schema) return [];
  const result = schema.safeParse(values);
  if (result.success === false) {
    return result.error.issues;
  }

  return [];
};

export const getFieldError = (field: any, issues: any[]) => {
  let errMessage = '';
  issues.forEach((error) => {
    if (error.path[0] === field) {
      errMessage = error.message;
    }
  });
  return errMessage;
};
