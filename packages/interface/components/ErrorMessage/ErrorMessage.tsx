import React, { FunctionComponent } from 'react';
import './ErrorMessage.scss';

interface Props {
    error: { message: string };
}

const ErrorMessage: FunctionComponent<Props> = ({ error }) => {
    return (
        <div className="error-message">
            <h2>Error: {error.message}</h2>
            <pre>{error}</pre>
        </div>
    );
};

export default ErrorMessage;
