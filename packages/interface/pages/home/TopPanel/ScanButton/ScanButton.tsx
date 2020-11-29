import axios from 'axios';
import { useUser } from '../../../../hooks/hooks';
import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { useUserProjectScansQuery } from 'schema/generated/graphql';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { apiUrl } from '../../../../utils/consts';
import { formatDateTime } from '../../../../utils/dateTimeUtils';
import './ScanButton.scss';

const ScanButton: FunctionComponent = () => {
    const [{ id: userId }] = useUser();
    const isAbleToScan = Boolean(userId);
    const { data, loading, refetch } = useUserProjectScansQuery({ variables: { initiatingUserId: userId } });

    const lastScanTime = data?.scans[0]?.created_at;

    const scan = useCallback(async () => {
        if (isAbleToScan && userId) {
            await axios.post(apiUrl + '/scan', { userId });
            await refetch();
        }
    }, []);

    useEffect(() => {
        if (process.browser && !loading && !lastScanTime) {
            scan();
        }
    }, [lastScanTime, loading, Boolean(process.browser)]);

    return (
        <div className="scan-button">
            {process.browser && (
                <CustomButton disabled={!isAbleToScan} onClick={scan}>
                    Scan for projects
                </CustomButton>
            )}
            <h5 className="last-scanned-label">Last scan: {lastScanTime ? formatDateTime(lastScanTime) : 'Never'}</h5>
        </div>
    );
};

export default ScanButton;
