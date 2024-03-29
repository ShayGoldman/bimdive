import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import ProjectSelect from './ProjectSelect/ProjectSelect';
import VerticalLineSeparator from '../../../components/VerticalLineSeparator/VerticalLineSeparator';
import MainMenuButton from './MainMenuButton/MainMenuButton';
import './TopPanel.scss';
import ScanButton from './ScanButton/ScanButton';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TopPanel: FunctionComponent<Props> = props => {
    return (
        <Grid container item xs={12} className="top-panel">
            <Grid item xs={1} style={{ justifyContent: 'center' }}>
                <img src="/images/home/bimdive-logo.png" alt="" />
            </Grid>
            <Grid item xs={2}>
                <ProjectSelect />
            </Grid>
            <VerticalLineSeparator />
            <Grid item xs={2}>
                <ScanButton />
            </Grid>
            <Grid item xs={4} style={{ justifyContent: 'center' }}></Grid>
            <Grid item xs={2}>
                <MainMenuButton />
            </Grid>
        </Grid>
    );
};

export default TopPanel;
