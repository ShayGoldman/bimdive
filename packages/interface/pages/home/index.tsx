import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import TopPanel from './TopPanel/TopPanel';

const HomePage: FunctionComponent = () => {
    return (
        <Grid container spacing={3}>
            <TopPanel />
            <Grid container item>
                <Grid item xs={12}>
                    <CustomTabs
                        tabs={[
                            { title: 'Open Issues', content: <div>Open Issues</div> },
                            { title: 'Type', content: <div>Type</div> },
                            { title: 'Assignees', content: <div>Assignees</div> },
                            { title: 'Owners', content: <div>Owners</div> },
                        ]}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomePage;
