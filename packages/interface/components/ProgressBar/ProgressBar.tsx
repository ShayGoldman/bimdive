import React, { FunctionComponent, useEffect, useState } from 'react';
import { GridLoader } from 'react-spinners';
import './ProgressBar.scss';

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
        <div className="progress-bar-container" style={style}>
            {showLoading && <GridLoader size={15} margin={2} color="#f06623" />}
        </div>
    );
};

export default ProgressBar;
