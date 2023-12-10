import { useReducer } from 'react';

type Validator = (data: FormState['data']) => string;

interface FormState {
    data: Record<string, string>;
    validators: Record<string, Validator[]>;
    errors: Record<string, string[]>;
}

interface FormAction {
    type: string;
    payload:
        | {
              name: string;
              value?: Validator[] | string[] | string;
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
                    [action.payload.name as string]: '',
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
                        .value as string,
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
        case 'unregisterInput': {
            const {
                data,
                errors,
                validators: currentValidators,
            } = { ...state };

            delete data[action.payload.name as string];
            delete currentValidators[action.payload.name as string];
            delete errors[action.payload.name as string];

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

    const registerInput = (name: string, validators: Validator[]) => {
        dispatch({
            type: 'registerInput',
            payload: { name, value: validators },
        });
    };

    const setFieldValue = (name: string, value: string) => {
        dispatch({
            type: 'setData',
            payload: {
                name,
                value,
            },
        });
    };

    const resetError = (name: string) => {
        dispatch({ type: 'resetFieldError', payload: { name } });
    };

    const runValidators = () => {
        const { validators, data } = formState;
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
        dispatch({ type: 'setErrors', payload: formErrors });
        return hasError;
    };

    return {
        data: formState.data,
        errors: formState.errors,
        registerInput,
        setFieldValue,
        runValidators,
        resetError,
    };
};
