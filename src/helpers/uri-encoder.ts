export const customEncodeQueryParam = (param: string): string => {
    const replacedString = param.replace(/\./g, '%2E');
    return replacedString;
};
