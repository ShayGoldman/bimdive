import { useAsync } from 'react-use';
import axios from 'axios';
import { apiUrl } from '../../../../utils/consts';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';

const Demo2 = () => {
    const { loading, value, error } = useAsync(async () => {
        const { data } = await axios.post(apiUrl + '/metabase/embed', {
            questionId: 19,
        });
        return data;
    }, []);

    return (
        <div>
            <h1>Home Page Depo</h1>
            {value?.data?.url && <iframe src={value.data.url} allowTransparency frameBorder="0" width="800" height="600" />}
            {error && <ErrorMessage error={error} />}
        </div>
    );
};

export default Demo2;
