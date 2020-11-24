import React, { FunctionComponent } from 'react';
import MetbaseChart from '../../../components/MetabaseChart/MetabaseChart';
import { Grid } from '@material-ui/core';
import './OpenIssuesOverview.scss';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const OpenIssuesOverview: FunctionComponent<Props> = props => {
    const router = useRouter();

    return (
        <Grid container spacing={2} className="open-issues-overview">
            <Grid item xs={12}>
                {router.query.ppid && <MetbaseChart dashboardId={10} params={{ project_provider_id: router.query.ppid }} />}
            </Grid>
        </Grid>
    );
};

export default OpenIssuesOverview;
