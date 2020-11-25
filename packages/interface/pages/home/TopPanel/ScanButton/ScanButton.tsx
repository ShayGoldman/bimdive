import { useCookie } from 'react-use';
import React, { FunctionComponent, useCallback, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../../utils/consts';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { formatDateTime, nowDateTime } from '../../../../utils/dateTimeUtils';
import first from 'lodash/first';
import './ScanButton.scss';
import { useScansQuery } from 'schema/generated/graphql';

const ScanButton: FunctionComponent = () => {
    const [cookie] = useCookie('_bimdive');
    const { data, refetch } = useScansQuery();

    const lastScanTime = data?.scans[0]?.created_at;

    const scan = useCallback(async () => {
        const { id } = JSON.parse(cookie) || {};
        if (id) {
            await axios.post(apiUrl + '/scan', { userId: id });
            await refetch();
        }
    }, []);

    return (
        <div className="scan-button">
            <CustomButton onClick={scan}>Scan for projects</CustomButton>
            <h5 className="last-scanned-label">Last scan: {lastScanTime ? formatDateTime(lastScanTime) : 'Never'}</h5>
        </div>
    );
};

export default ScanButton;
