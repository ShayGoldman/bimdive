import naturalSort from 'natural-sort';

interface Params<T> {
    array: T[];
    sortBy?: (T) => string | number;
    options?: Parameters<typeof naturalSort>[0];
}

export function naturalSortBy<T>({ array, sortBy = item => item, options }: Params<T>): T[] {
    const sortFn = naturalSort(options);

    return array.sort((a: T, b: T) => {
        const keyA = sortBy(a);
        const keyB = sortBy(b);
        return sortFn(keyA, keyB);
    });
}
