export const convertToSearchParams = (params: any): string => {
    const result: string[] = [];
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            switch (typeof params[key]) {
                case 'string':
                case 'boolean':
                case 'number':
                    result.push(`${key}=${params[key]}`);
                    break;
                case 'object':
                    if (Array.isArray(params[key])) {
                        params[key].forEach((item: string) => result.push(`${key}=${item}`));
                    }
                    break;
            }
        }
    }

    return result.length ? `?${encodeURI(result.join('&'))}` : '';
};
