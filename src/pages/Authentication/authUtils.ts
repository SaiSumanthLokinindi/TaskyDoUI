export const fieldRequiredValidator = (fieldName: string) => {
    return (data: Record<string, string>) => {
        return !data[fieldName] ? `${fieldName} is required` : '';
    };
};
