import axios from 'axios';
import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { useCookie } from 'react-use';
import { useScansQuery } from 'schema/generated/graphql';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { apiUrl } from '../../../../utils/consts';
import { formatDateTime } from '../../../../utils/dateTimeUtils';
import './ScanButton.scss';

const ScanButton: FunctionComponent = () => {
    const [cookie] = useCookie('_bimdive');
    const { id } = JSON.parse(cookie) || {};
    const isAbleToScan = Boolean(id);
    const { data, refetch } = useScansQuery();

    const lastScanTime = data?.scans[0]?.created_at;

    const scan = useCallback(async () => {
        if (isAbleToScan && id) {
            await axios.post(apiUrl + '/scan', { userId: id });
            await refetch();
        }
    }, []);

    useEffect(() => {
        if (!lastScanTime) {
            scan();
        }
    }, [lastScanTime]);

    if (!isAbleToScan) {
        return null;
    }

    return (
        <div className="scan-button">
            <CustomButton onClick={scan}>Scan for projects</CustomButton>
            <h5 className="last-scanned-label">Last scan: {lastScanTime ? formatDateTime(lastScanTime) : 'Never'}</h5>
        </div>
    );
};

export default ScanButton;
