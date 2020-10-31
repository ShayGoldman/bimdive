import React, { FunctionComponent } from 'react';
import { useAsync } from 'react-use';
import axios from 'axios';
import ProgressBar from '../../../../components/ProgressBar/ProgressBar';
import { apiUrl } from '../../../../components/utils/consts';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';

const Demo1: FunctionComponent = () => {
    const { loading, error, value } = useAsync(async () => {
        const { data } = await axios.post(apiUrl + '/metabase/embed', {
            questionId: 17,
        });
        return data;
    }, []);

    return (
        <div>
            {loading && <ProgressBar />}
            {!loading && error && <ErrorMessage error={error} />}
            {!loading && !error && value?.data?.url && <iframe src={value.data.url} frameBorder="0" width="400" height="400" />}
        </div>
    );
};
