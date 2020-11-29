import { Grid } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import MetbaseChart from '../../../components/MetabaseChart/MetabaseChart';
import { useQuery } from '../hooks';
import './TypesOverview.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TypesOverview: FunctionComponent<Props> = props => {
    const [projectId] = useQuery('ppid');

    return (
        <Grid container spacing={2} className="types-overview">
            <Grid item xs={12}>
                {projectId && <MetbaseChart dashboardId={6} params={{ project_provider_id: projectId }} />}
            </Grid>
        </Grid>
    );
};

export default TypesOverview;
