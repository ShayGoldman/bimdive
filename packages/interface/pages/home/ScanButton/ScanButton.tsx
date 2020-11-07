import { useCookie } from 'react-use';
import React, { FunctionComponent, useCallback } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../components/utils/consts';
import CustomButton from '../../../components/CustomButton/CustomButton';
import './ScanButton.scss';

const ScanButton: FunctionComponent = () => {
    const [cookie] = useCookie('_bimdive');

    const scan = useCallback(async () => {
        const { id } = JSON.parse(cookie) || {};
        if (!id) return;

        await axios.post(apiUrl + '/scan', { userId: id });
    }, []);

    return (
        <div className="scan-button">
            <CustomButton onClick={scan}>Scan for projects</CustomButton>
            <h5 className="last-scanned-label">Last scanned: </h5>
        </div>
    );
};

export default ScanButton;
