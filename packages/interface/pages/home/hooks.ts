import React, { useCallback } from 'react';
import { useCookie } from 'react-use';
import { useRouter } from 'next/router';
import querystring from 'querystring';
import last from 'lodash/last';

// todo type for query param is string | string[]
export const useQuery = (key: string) => {
    const router = useRouter();
    const queryParmsString = last(router.asPath.split('?'));

    const { [key]: value = '', ...queryParams } = querystring.parse(queryParmsString);

    const setValue = useCallback(
        value => {
            const { pathname } = location;
            router.push({
                pathname,
                query: {
                    ...queryParams,
                    [key]: value,
                },
            });
        },
        [value, queryParams]
    );
    return [value as string, setValue] as const;
};

export const useUser = () => {
    const [cookie] = useCookie('_bimdive');
    const { id } = JSON.parse(cookie) || {};
    return [{ id }, () => {}] as const;
};
