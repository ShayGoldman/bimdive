import React, { FunctionComponent } from 'react';
import MetbaseChart from '../../../components/MetabaseChart/MetabaseChart';
import { Grid } from '@material-ui/core';
import './AssigneeOverview.scss';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const AssigneeOverview: FunctionComponent<Props> = props => {
    const router = useRouter();

    return (
        <Grid container spacing={2} className="assignee-overview">
            <Grid item xs={12}>
                <MetbaseChart dashboardId={7} />
            </Grid>
        </Grid>
    );
};

export default AssigneeOverview;
