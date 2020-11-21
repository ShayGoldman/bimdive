import React, { FunctionComponent } from 'react';
import MetbaseChart from '../../../components/MetabaseChart/MetabaseChart';
import { Grid } from '@material-ui/core';
import './OpenIssuesOverview.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const OpenIssuesOverview: FunctionComponent<Props> = props => {
    return (
        <Grid container className="open-issues-overview">
            <Grid item xs={8}>
                <MetbaseChart questionId={17} />
            </Grid>
            <Grid item xs={4}>

            </Grid>
        </Grid>
    );
};

export default OpenIssuesOverview;
