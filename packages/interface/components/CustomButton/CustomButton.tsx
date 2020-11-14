import React, { FunctionComponent } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import './CustomButton.scss';

const CustomButton: FunctionComponent<ButtonProps> = ({ children, ...restProps }) => {
    return (
        <Button variant="contained" color="primary" {...restProps}>
            {children}
        </Button>
    );
};

export default CustomButton;
