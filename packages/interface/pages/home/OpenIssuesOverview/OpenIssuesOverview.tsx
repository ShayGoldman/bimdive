import { Grid } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import MetbaseChart from '../../../components/MetabaseChart/MetabaseChart';
import { useQuery } from '../../../hooks/hooks';
import './OpenIssuesOverview.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const OpenIssuesOverview: FunctionComponent<Props> = props => {
    const [projectId] = useQuery('ppid');

    return (
        <Grid container spacing={2} className="open-issues-overview">
            <Grid item xs={12}>
                {projectId && <MetbaseChart dashboardId={10} params={{ project_provider_id: projectId }} />}
            </Grid>
        </Grid>
    );
};

export default OpenIssuesOverview;
