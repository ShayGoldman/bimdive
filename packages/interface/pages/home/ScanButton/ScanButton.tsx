import { useCookie } from 'react-use';
import React, { FunctionComponent, useCallback } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../components/utils/consts';
import CustomButton from '../../../components/CustomButton/CustomButton';

const ScanButton: FunctionComponent = () => {
    const [cookie] = useCookie('_bimdive');

    const scan = useCallback(async () => {
        const { id } = JSON.parse(cookie) || {};
        if (id) {
            await axios.post(apiUrl + '/scan', { userId: id });
        }
    }, []);

    return (
        <CustomButton onClick={scan}>
            Scan for projects
        </CustomButton>
    );
};

export default ScanButton;
