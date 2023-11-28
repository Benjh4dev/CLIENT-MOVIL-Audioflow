export async function mapZodErrors(error: any) {
    const zodErrors = error.response.data.error.issues;
    const mappedErrors: Record<string, any> = {};

    zodErrors.forEach((err: any) => {
        const fieldName = err.path[0];
        
        if (!mappedErrors[fieldName]) {
        mappedErrors[fieldName] = [];
        }
        mappedErrors[fieldName].push(err.message);
        });
    
    return mappedErrors;
};