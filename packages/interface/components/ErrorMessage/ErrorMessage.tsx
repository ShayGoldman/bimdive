import React, { FunctionComponent } from 'react';
import './ErrorMessage.module.scss';

interface Props {
    error: { message: string };
}

const ErrorMessage: FunctionComponent<Props> = ({ error }) => {
    return (
        <div className="error">
            <h2>Error: {error.message}</h2>
            <pre>{error}</pre>
        </div>
    );
};

export default ErrorMessage;
