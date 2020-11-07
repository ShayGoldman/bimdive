import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import ProjectSelect from './ProjectSelect/ProjectSelect';
import ScanButton from '../ScanButton/ScanButton';
import classNames from 'classnames';
import styles from './TopPanel.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TopPanel: FunctionComponent<Props> = props => {
    return (
        <Grid className={classNames('grid-row', styles.topPanel)} container item xs={12} spacing={3}>
            <Grid item xs={4}>
                <img height={150} src="/images/home/bimdive-logo.png" alt="" style={{ height: 'inherit' }} />
            </Grid>
            <Grid item xs={4}>
                <img width={500} src="/images/home/company-logo.png" alt="" />
            </Grid>
            <Grid item xs={4}>
                <ProjectSelect />
                <ScanButton />
            </Grid>
        </Grid>
    );
};

export default TopPanel;
