import React, { FunctionComponent } from 'react';
import CustomMenuButton from '../../../../components/CustomMenuButton/CustomMenuButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';
import './MainMenuButton.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const MainMenuButton: FunctionComponent<Props> = props => {
    const router = useRouter();

    return (
        <CustomMenuButton
            renderButton={onClick => (
                <div className="main-menu" onClick={onClick}>
                    <MenuIcon className="menu-icon" />
                </div>
            )}
            options={[
                {
                    label: 'Logout',
                    onClick: () => router.push('/'),
                },
            ]}
        />
    );
};

export default MainMenuButton;
