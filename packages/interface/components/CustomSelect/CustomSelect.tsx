import React, { FunctionComponent } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { SelectProps } from '@material-ui/core/Select/Select';
import classNames from 'classnames';
import './CustomSelect.scss';

interface Props {
    options: { key: string; label: string }[];
    value: any;
    onValueChange: (newValue: string) => void;
}

const CustomSelect: FunctionComponent<Props & SelectProps> = ({ options, value, onValueChange, ...restProps }) => {
    return (
        <Select
            {...restProps}
            value={value}
            margin="dense"
            onChange={event => onValueChange(event.target.value as string)}
            variant="outlined"
            className={classNames('custom-select', restProps.className)}
        >
            {options.map(({ key, label }) => (
                <MenuItem key={key} value={key}>
                    {label}
                </MenuItem>
            ))}
        </Select>
    );
};

export default CustomSelect;
