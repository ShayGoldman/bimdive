import React, { FunctionComponent } from 'react';
import { useAsync } from 'react-use';
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
    const { loading, error, value } = useAsync(async () => {
        const { data } = await axios.post(apiUrl + '/metabase/embed', {
            dashboardId,
            questionId,
            params,
        });
        return data;
    }, []);

    if (loading) return <ProgressBar />;
    if (error) return <ErrorMessage error={error} />;

    return <iframe src={value?.data?.url} frameBorder="0" width="100%" height="100%" allowTransparency />;
};

export default MetabaseChart;
