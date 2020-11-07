import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import ProjectSelect from './ProjectSelect/ProjectSelect';
import ScanButton from '../ScanButton/ScanButton';
import classNames from 'classnames';
import './TopPanel.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TopPanel: FunctionComponent<Props> = props => {
    return (
        <Grid className="top-panel" container item xs={12} spacing={3}>
            <Grid item xs={1}>
                <img src="/images/home/bimdive-logo.png" alt="" />
            </Grid>
            <Grid item xs={2}>
                <ProjectSelect />
            </Grid>
            <Grid item xs={2}>
                <ScanButton />
            </Grid>
            <Grid item xs={3}>
                <img src="/images/home/company-logo.png" alt="" />
            </Grid>
            <Grid item xs={4}>
            </Grid>
        </Grid>
    );
};

export default TopPanel;
