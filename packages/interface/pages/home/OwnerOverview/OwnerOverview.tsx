import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import MetbaseChart from '../../../components/MetabaseChart/MetabaseChart';
import { useQuery } from '../hooks';
import './OwnerOverview.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const OwnerOverview: FunctionComponent<Props> = props => {
    const [projectId] = useQuery('ppid');

    return (
        <Grid container spacing={2} className="owner-overview">
            <Grid item xs={12}>
                {projectId && <MetbaseChart dashboardId={8} params={{ project_provider_id: projectId }} />}{' '}
            </Grid>
        </Grid>
    );
};

export default OwnerOverview;
