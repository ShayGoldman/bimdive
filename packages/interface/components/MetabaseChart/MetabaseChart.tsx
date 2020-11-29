import React, { FunctionComponent } from 'react';
import { useAsyncFn, useDeepCompareEffect } from 'react-use';
import axios from 'axios';
import { apiUrl } from '../../utils/consts';
import ProgressBar from '../ProgressBar/ProgressBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './MetabaseChart.scss';

interface Props {
    dashboardId?: number;
    questionId?: number;
    params?: object;
}

const MetabaseChart: FunctionComponent<Props & ({ dashboardId: number } | { questionId: number })> = ({ dashboardId, questionId, params }) => {
    const [{ loading, error, value }, fetch] = useAsyncFn(async () => {
        const { data } = await axios.post(apiUrl + '/metabase/embed', {
            dashboardId,
            questionId,
            params,
        });
        return data;
    }, [dashboardId, questionId, params]);

    useDeepCompareEffect(() => {
        fetch();
    }, [params]);

    if (loading) return <ProgressBar />;
    if (error) return <ErrorMessage error={error} />;

    return <iframe src={value?.data?.url} frameBorder="0" width="100%" height="100%" allowTransparency />;
};

export default MetabaseChart;
