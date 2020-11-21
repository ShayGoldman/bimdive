import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import TopPanel from './TopPanel/TopPanel';
import OpenIssuesOverview from './OpenIssuesOverview/OpenIssuesOverview';

const HomePage: FunctionComponent = () => {
    const topPanelHeight = 150;

    return (
        <Grid container style={{ height: '100%', alignContent: 'flex-start' }}>
            <div style={{ height: topPanelHeight, width: '100%' }}>
                <TopPanel />
            </div>
            <Grid container item style={{ height: `calc(100vh - ${topPanelHeight}px)` }}>
                <Grid item xs={12}>
                    <CustomTabs
                        tabs={[
                            { title: 'Open Issues', content: <OpenIssuesOverview /> },
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
