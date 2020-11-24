import { useCookie } from 'react-use';
import React, { FunctionComponent, useCallback, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../../utils/consts';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { nowDateTime } from '../../../../utils/dateTimeUtils';
import './ScanButton.scss';

const ScanButton: FunctionComponent = () => {
    const [cookie] = useCookie('_bimdive');
    const [lastScannedLabel, setLastScannedLabel] = useState<string>('Last scanned: Never');

    const scan = useCallback(async () => {
        const { id } = JSON.parse(cookie) || {};
        if (!id) {
            setLastScannedLabel('Please login to scan');
            return;
        }

        await axios.post(apiUrl + '/scan', { userId: id });
        setLastScannedLabel(`Last scanned: ${nowDateTime()}`);
    }, []);

    return (
        <div className="scan-button">
            <CustomButton onClick={scan}>Scan for projects</CustomButton>
            <h5 className="last-scanned-label">{lastScannedLabel}</h5>
        </div>
    );
};

export default ScanButton;
