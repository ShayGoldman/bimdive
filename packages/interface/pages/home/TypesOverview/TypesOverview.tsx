import React, { FunctionComponent } from 'react';
import MetbaseChart from '../../../components/MetabaseChart/MetabaseChart';
import { Grid } from '@material-ui/core';
import './TypesOverview.scss';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TypesOverview: FunctionComponent<Props> = props => {
    const router = useRouter();

    return (
        <Grid container spacing={2} className="types-overview">
            <Grid item xs={12}>
                <MetbaseChart dashboardId={6} />
            </Grid>
        </Grid>
    );
};

export default TypesOverview;
