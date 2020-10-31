import React, { FunctionComponent } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { SelectProps } from '@material-ui/core/Select/Select';
import styles from './CustomSelect.module.scss';
import classNames from 'classnames';

interface Props {
    values: string[];
    onValueChange: (newValue: string) => void;
}

const CustomSelect: FunctionComponent<Props & SelectProps> = ({ values, onValueChange, ...restProps }) => {
    return (
        <Select
            {...restProps}
            onChange={event => onValueChange(event.target.value as string)}
            defaultValue={values[0]}
            variant="outlined"
            className={classNames(restProps.className, styles.customSelect)}
        >
            {values.map(value => (
                <MenuItem key={value} value={value}>
                    {value}
                </MenuItem>
            ))}
        </Select>
    );
};

export default CustomSelect;
