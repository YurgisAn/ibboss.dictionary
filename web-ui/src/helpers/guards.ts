export function isDefined<T>(value: T | null | undefined): value is T {
    return value !== undefined && value !== null;
}

export function assertDefined<T>(value: T | null | undefined, variableName: string): asserts value is T {
    if (value === undefined || value === null) {
        throw new Error(`${variableName} expected to be defined, but receive ${value}`);
    }
}

export function absurd(value: never): never {
    throw new Error(`Expect to be unreachable, however receive ${JSON.stringify(value)}`);
}

export function assertIsString(value: unknown): asserts value is string {
    if (typeof value === 'string') return;

    throw new Error(`Expected string value, but receive ${typeof value} ${value}`);
}

export function assertIsNumber(value: unknown): asserts value is number {
    if (typeof value === 'number') return;

    throw new Error(`Expected number value, but receive ${typeof value} ${value}`);
}
