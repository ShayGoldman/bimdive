import { useCookie } from 'react-use';
import { FunctionComponent, useCallback } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../components/utils/consts';

interface Props {
    email: string;
}

const ScanButton: FunctionComponent<Props> = ({ email }) => {
    const [cookie] = useCookie('_bimdive');

    const scan = useCallback(async () => {
        const { id } = JSON.parse(cookie) || {};
        if (id) {
            await axios.post(apiUrl + '/scan', { userId: id });
        }
    }, [email]);

    return (
        <button style={{ cursor: 'pointer' }} onClick={scan}>
            Scan for projects
        </button>
    );
};

export default ScanButton;