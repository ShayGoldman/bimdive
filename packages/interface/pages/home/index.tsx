import { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';

const HomePage: FunctionComponent = () => {
    return (
        <Grid container spacing={3}>
            <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                    1
                </Grid>
                <Grid item xs={4}>
                    2
                </Grid>
                <Grid item xs={4}>
                    3
                </Grid>
            </Grid>
            <Grid container item>
                <Grid item xs={12}>
                    4
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomePage;
