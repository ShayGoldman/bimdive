import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import ProjectSelect from './ProjectSelect/ProjectSelect';
import CustomTabs from '../../components/CustomTabs/CustomTabs';

const HomePage: FunctionComponent = () => {
    return (
        <Grid container spacing={3}>
            <Grid className="grid-row" container item xs={12} spacing={3}>
                <Grid item xs={4}>
                    <img width={500} src="/images/home/company-logo.png" alt="" />
                </Grid>
                <Grid item xs={4}>
                    <ProjectSelect />
                </Grid>
                <Grid item xs={4}>
                    <h1>BIMdive</h1>
                </Grid>
            </Grid>
            <Grid container item>
                <Grid item xs={12}>
                    <CustomTabs
                        tabs={[
                            { title: 'Open Issues', content: <div /> },
                            { title: 'Type', content: <div /> },
                            { title: 'Assignees', content: <div /> },
                            { title: 'Owners', content: <div /> },
                        ]}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomePage;
