import React, { FunctionComponent } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import './CustomMenuButton.scss';

interface Props {
    renderButton: (onClick: (event) => void) => React.ReactElement;
    options: { label: string; onClick: () => void }[];
}

const CustomMenuButton: FunctionComponent<Props> = ({ renderButton, options }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <div className="custom-menu">
            {renderButton(handleClick)}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                keepMounted
            >
                {options.map(({ label, onClick }) => (
                    <MenuItem
                        key={label}
                        onClick={() => {
                            handleClose();
                            onClick();
                        }}
                    >
                        {label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default CustomMenuButton;
