import React, { FunctionComponent } from 'react';
import MetbaseChart from '../../../components/MetabaseChart/MetabaseChart';
import { Grid } from '@material-ui/core';
import './OwnerOverview.scss';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const OwnerOverview: FunctionComponent<Props> = props => {
    const router = useRouter();

    return (
        <Grid container spacing={2} className="owner-overview">
            <Grid item xs={12}>
                <MetbaseChart dashboardId={8} />
            </Grid>
        </Grid>
    );
};

export default OwnerOverview;
