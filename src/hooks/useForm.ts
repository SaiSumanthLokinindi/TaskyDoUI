import { useReducer } from 'react';

type Validator = (data: FormState['data']) => string;

interface FormState {
    data: Record<string, string>;
    validators: Record<string, Validator[]>;
    errors: Record<string, string[]>;
}

interface FormAction {
    type: string;
    payload: {
        name: string;
        value?: Validator[] | string[] | string;
    };
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
                    [action.payload.name]: '',
                },
                validators: {
                    ...state.validators,
                    [action.payload.name]: (action.payload.value ||
                        []) as Validator[],
                },
                errors: {
                    ...state.errors,
                    [action.payload.name]: [],
                },
            };
        case 'setData':
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.name]: action.payload.value as string,
                },
            };
        case 'setErrors':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload.name]: action.payload.value as string[],
                },
            };
        case 'runValidators': {
            const { validators, data } = { ...state };
            const formErrors = Object.entries(validators).reduce(
                (errors: FormState['errors'], [name, validators]) => {
                    const errorMessages = validators.reduce(
                        (result: string[], validator: Validator) => {
                            const error = validator(data);
                            if (error) return [...result, error];
                            else return result;
                        },
                        [],
                    );

                    if (errorMessages.length > 0) errors[name] = errorMessages;
                    else errors[name] = [];
                    return errors;
                },
                {},
            );

            return {
                ...state,
                errors: formErrors,
            };
        }
        case 'resetFieldError':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload.name]: [],
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

            delete data[action.payload.name];
            delete currentValidators[action.payload.name];
            delete errors[action.payload.name];

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

    return {
        data: formState.data,
        errors: formState.errors,
        registerInput,
        setFieldValue,
        runValidators: () => {
            dispatch({ type: 'runValidators' });
        },
        resetError,
    };
};
