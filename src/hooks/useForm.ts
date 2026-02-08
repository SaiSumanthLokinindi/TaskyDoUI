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

interface FormAction {
    type: FormActionType;
    payload:
        | {
              name: string;
              value?: Validator[] | string[] | FieldValue;
          }
        | Record<string, string[]>;
}

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
                    [action.payload.name as string]: undefined,
                },
                validators: {
                    ...state.validators,
                    [action.payload.name as string]: (action.payload.value ||
                        []) as Validator[],
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

export const useForm = () => {
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const registerInput = useCallback(
        (name: string, validators?: Validator[]) => {
            dispatch({
                type: FormActionType.REGISTER_INPUT,
                payload: { name, value: validators },
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

    const resetError = useCallback(
        (name: string) => {
            dispatch({
                type: FormActionType.RESET_FIELD_ERROR,
                payload: { name },
            });
        },
        [dispatch],
    );

    const runValidators = useCallback(() => {
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

    return {
        data: formState.data,
        errors: formState.errors,
        registerInput,
        deregisterInput,
        setFieldValue,
        runValidators,
        resetError,
    };
};
