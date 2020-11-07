import React, { FunctionComponent, useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import styles from './ProgressBar.scss';

interface Props {
    style?: React.CSSProperties;
}

const ProgressBar: FunctionComponent<Props> = ({ style }) => {
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowLoading(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.progressBarContainer} style={style}>
            {showLoading && <BarLoader height={4} width={100} />}
        </div>
    );
};

export default ProgressBar;
