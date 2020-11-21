import React, { FunctionComponent } from 'react';
import { useAsync } from 'react-use';
import axios from 'axios';
import { apiUrl } from '../../utils/consts';
import ProgressBar from '../ProgressBar/ProgressBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './MetabaseChart.scss';

interface Props {
    questionId: number;
}

const MetabaseChart: FunctionComponent<Props> = ({ questionId }) => {
    const { loading, error, value } = useAsync(async () => {
        const { data } = await axios.post(apiUrl + '/metabase/embed', {
            questionId,
        });
        return data;
    }, []);

    if (loading) return <ProgressBar />;
    if (error) return <ErrorMessage error={error} />;

    return <iframe src={value?.data?.url} frameBorder="0" width="100%" height="100%" />;
};

export default MetabaseChart;
