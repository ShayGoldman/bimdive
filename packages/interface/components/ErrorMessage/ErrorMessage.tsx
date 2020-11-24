import React, { FunctionComponent, useEffect } from 'react';
import './ErrorMessage.scss';

interface Props {
    error: { message: string };
}

const ErrorMessage: FunctionComponent<Props> = ({ error }) => {
    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    return (
        <div className="error-message">
            <h2>Error: {error.message}</h2>
        </div>
    );
};

export default ErrorMessage;
