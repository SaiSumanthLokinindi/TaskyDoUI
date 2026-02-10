import { useCallback, useReducer } from 'react';

type Validator = (data: FormState['data']) => string;

export type FieldValue =
    | string
    | string[]
    | number[]
    | number
    | boolean
    | Date
    | undefined;
interface FormState {
    data: Record<string, FieldValue>;
    validators: Record<string, Validator[]>;
    errors: Record<string, string[]>;
}

enum FormActionType {
    'REGISTER_INPUT' = 'registerInput',
    'SET_DATA' = 'setData',
    'SET_FIELD_ERROR' = 'setFieldError',
    'SET_ERRORS' = 'setErrors',
    'RESET_FIELD_ERROR' = 'resetFieldError',
    'RESET_ERRORS' = 'resetErrors',
    'DEREGISTER_INPUT' = 'deregisterInput',
}

type FormAction =
    | {
          type: FormActionType.REGISTER_INPUT;
          payload: {
              name: string;
              value?: FieldValue;
              validators?: Validator[];
          };
      }
    | {
          type: FormActionType.SET_DATA;
          payload: {
              name: string;
              value: FieldValue;
          };
      }
    | {
          type: FormActionType.SET_FIELD_ERROR;
          payload: {
              name: string;
              value: string[];
          };
      }
    | {
          type: FormActionType.SET_ERRORS;
          payload: Record<string, string[]>;
      }
    | {
          type: FormActionType.RESET_FIELD_ERROR;
          payload: { name: string };
      }
    | {
          type: FormActionType.RESET_ERRORS;
      }
    | {
          type: FormActionType.DEREGISTER_INPUT;
          payload: {
              inputs: string[];
          };
      };

const initialFormState: FormState = {
    data: {},
    validators: {},
    errors: {},
};

const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case 'registerInput':
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.name as string]: action.payload.value,
                },
                validators: {
                    ...state.validators,
                    [action.payload.name as string]: (action.payload
                        .validators || []) as Validator[],
                },
                errors: {
                    ...state.errors,
                    [action.payload.name as string]: [],
                },
            };
        case 'setData':
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.name as string]: action.payload
                        .value as FieldValue,
                },
            };
        case 'setFieldError':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload.name as string]: action.payload
                        .value as string[],
                },
            };
        case 'setErrors':
            return {
                ...state,
                errors: action.payload as Record<string, string[]>,
            };
        case 'resetFieldError':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload.name as string]: [],
                },
            };
        case 'resetErrors': {
            const { errors: currentErrors } = { ...state };
            Object.keys(currentErrors).forEach((name) => {
                currentErrors[name] = [];
            });
            return {
                ...state,
                errors: currentErrors,
            };
        }
        case 'deregisterInput': {
            const {
                data,
                errors,
                validators: currentValidators,
            } = { ...state };
            action.payload.inputs.forEach((input: string) => {
                delete data[input];
                delete currentValidators[input];
                delete errors[input];
            });

            return {
                data,
                errors,
                validators: currentValidators,
            };
        }
        default:
            return state;
    }
};

export type FieldInfo = {
    name: string;
    defaultValue?: FieldValue;
    validators: Validator[];
};

export const useForm = () => {
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const registerInput = useCallback(
        ({ name, defaultValue = undefined, validators }: FieldInfo) => {
            dispatch({
                type: FormActionType.REGISTER_INPUT,
                payload: { name, value: defaultValue, validators },
            });
        },
        [dispatch],
    );

    const deregisterInput = useCallback(
        (...inputs: string[]) => {
            dispatch({
                type: FormActionType.DEREGISTER_INPUT,
                payload: {
                    inputs,
                },
            });
        },
        [dispatch],
    );

    const setFieldValue = useCallback(
        (name: string, value: FieldValue) => {
            dispatch({
                type: FormActionType.SET_DATA,
                payload: {
                    name,
                    value,
                },
            });
        },
        [dispatch],
    );

    const resetFieldError = useCallback(
        (name: string) => {
            dispatch({
                type: FormActionType.RESET_FIELD_ERROR,
                payload: { name },
            });
        },
        [dispatch],
    );

    const runAllValidators = useCallback(() => {
        const validators = formState.validators;
        const data = formState.data;
        let hasError = false;
        const formErrors = Object.entries(validators).reduce(
            (errors: FormState['errors'], [name, validators]) => {
                const errorMessages = validators.reduce(
                    (result: string[], validator: Validator) => {
                        const error = validator(data);
                        if (error) {
                            hasError = true;
                            return [...result, error];
                        } else return result;
                    },
                    [],
                );

                if (errorMessages.length > 0) errors[name] = errorMessages;
                else errors[name] = [];
                return errors;
            },
            {},
        );
        dispatch({ type: FormActionType.SET_ERRORS, payload: formErrors });
        return hasError;
    }, [formState.validators, formState.data, dispatch]);

    const runFieldValidators = useCallback(
        (name: FieldInfo['name']) => {
            const fieldValidators = formState.validators[name];
            let hasError = false;

            if (fieldValidators) {
                const errors = fieldValidators.reduce(
                    (result: string[], validator: Validator): string[] => {
                        const error = validator(formState.data);
                        if (error) {
                            hasError = true;
                            return [...result, error];
                        } else return result;
                    },
                    [],
                );

                dispatch({
                    type: FormActionType.SET_FIELD_ERROR,
                    payload: {
                        name,
                        value: errors,
                    },
                });
            }

            return hasError;
        },
        [formState.data, dispatch],
    );

    return {
        data: formState.data,
        errors: formState.errors,
        registerInput,
        deregisterInput,
        setFieldValue,
        runAllValidators,
        runFieldValidators,
        resetFieldError,
    };
};
