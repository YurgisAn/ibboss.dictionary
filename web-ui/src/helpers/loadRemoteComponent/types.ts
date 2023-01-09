type Scope = unknown;
type Factory = () => any;

export type Container = {
    init: (shareScope: Scope) => void;
    get: (module: string) => Factory;
};
