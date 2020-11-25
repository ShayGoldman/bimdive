import React, { FunctionComponent } from 'react';
import MetbaseChart from '../../../components/MetabaseChart/MetabaseChart';
import { Grid } from '@material-ui/core';
import './OpenIssuesOverview.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const OpenIssuesOverview: FunctionComponent<Props> = props => {
    return (
        <Grid container spacing={2} className="open-issues-overview">
            <Grid item xs={8}>
                <MetbaseChart questionId={17} />
            </Grid>
            <Grid container item xs={4}>
                <div className="right-charts-container">
                    <MetbaseChart questionId={17} />
                    <MetbaseChart questionId={17} />
                    <MetbaseChart questionId={17} />
                </div>
            </Grid>
        </Grid>
    );
};

export default OpenIssuesOverview;
