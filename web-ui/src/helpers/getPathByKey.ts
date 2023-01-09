export const getPathByKey = (routes: any, key: string) => {
    for (const index in routes) {
        if (routes.hasOwnProperty(index)) {
            if (index === key) return routes[index];
        }
    }
};
