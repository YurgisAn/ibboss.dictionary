export const parseSearchParams = (search: string, aliasMap?: { [key: string]: any }) => {
    const result = {} as { [key: string]: string | string[] };
    const searchParams = decodeURI(search)
        .replace('?', '')
        .split('&')
        .map((item) => item.split('='))
        .filter((item) => item.length === 2);

    searchParams.forEach((pair) => {
        const [key, value] = pair;
        if (result[key]) {
            const prevParams = Array.isArray(result[key]) ? result[key] : [result[key] as string];
            result[key] = [...prevParams, value];
        } else {
            result[key] = value;
        }
    });

    return aliasMap ? changeToAlias(result, aliasMap) : result;
};

const changeToAlias = (params: { [key: string]: any }, aliasMap: { [key: string]: any }) => {
    return Object.entries(params).reduce((acc, pair) => {
        const [key, value] = pair;
        const alias = aliasMap[key];
        if (typeof alias === 'function') Object.assign(acc, alias(value));
        else acc[alias] = value;
        return acc;
    }, {} as { [key: string]: any });
};
