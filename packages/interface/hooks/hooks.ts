import { useCallback, useEffect, EffectCallback } from 'react';
import { useCookie } from 'react-use';
import { NextRouter, useRouter } from 'next/router';
import querystring from 'querystring';
import last from 'lodash/last';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';

function getQueryParams(router: NextRouter) {
    const queryParmsString = router.asPath.includes('?') ? last(router.asPath.split('?')) : '';
    return querystring.parse(queryParmsString);
}

// todo type for query param is string | string[]
export const useQuery = (key: string) => {
    const router = useRouter();
    const { [key]: value = '' } = getQueryParams(router);

    const setValue = useCallback(
        value => {
            const { [key]: _, ...queryParams } = getQueryParams(router);
            const query = {
                ...queryParams,
                [key]: value,
            };
            router.push({
                pathname: router.pathname,
                query,
            });
        },
        // asPath takes care of pathname & queryParams
        [value, key, router.asPath]
    );
    return [value as string, setValue] as const;
};

export const useReplaceQuery = () => {
    const router = useRouter();
    return useCallback(
        (key: string, value: string) => {
            router.push({
                pathname: router.pathname,
                query: { [key]: value },
            });
        },
        [router.asPath]
    );
};

export const useCleanup = (fn: ReturnType<EffectCallback>) => {
    return useEffect(() => {
        return fn;
    }, []);
};

export const useUser = () => {
    const [cookie] = useCookie('_bimdive');
    const { id } = JSON.parse(cookie) || {};
    return [{ id }, () => {}] as const;
};
