import { FieldValue } from 'src/hooks/useForm';

export const fieldRequiredValidator = (fieldName: string) => {
    return (data: Record<string, FieldValue>) => {
        return !data[fieldName] ? `${fieldName} is required` : '';
    };
};
