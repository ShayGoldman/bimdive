import { useCookie } from 'react-use';
import React, { FunctionComponent, useCallback, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../utils/consts';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { nowDateTime } from '../../../utils/dateTimeUtils';
import './ScanButton.scss';

const ScanButton: FunctionComponent = () => {
    const [cookie] = useCookie('_bimdive');
    const [lastScannedDateTime, setLastScannedDateTime] = useState<string>('Never');

    const scan = useCallback(async () => {
        const { id } = JSON.parse(cookie) || {};
        if (!id) return;

        await axios.post(apiUrl + '/scan', { userId: id });
        setLastScannedDateTime(nowDateTime());
    }, []);

    return (
        <div className="scan-button">
            <CustomButton onClick={scan}>Scan for projects</CustomButton>
            <h5 className="last-scanned-label">Last scanned: {lastScannedDateTime}</h5>
        </div>
    );
};

export default ScanButton;
