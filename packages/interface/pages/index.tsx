import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomTabs from '../components/CustomTabs/CustomTabs';
import TopPanel from './home/TopPanel/TopPanel';
import OpenIssuesOverview from './home/OpenIssuesOverview/OpenIssuesOverview';
import TypesOverview from './home/TypesOverview/TypesOverview';
import AssigneeOverview from './home/AssigneeOverview/AssigneeOverview';
import OwnerOverview from './home/OwnerOverview/OwnerOverview';
import { useQuery } from './home/hooks';

const HomePage: FunctionComponent = () => {
    const topPanelHeight = 100;
    const [projectId] = useQuery('ppid');

    return (
        <Grid container style={{ height: '100%', alignContent: 'flex-start' }}>
            <div style={{ height: topPanelHeight, width: '100%' }}>
                <TopPanel />
            </div>
            <Grid container item style={{ height: `calc(100% - ${topPanelHeight}px)` }}>
                <Grid item xs={12}>
                    <CustomTabs
                        tabs={[
                            { key: `open-issues-${projectId}`, title: 'Open Issues', content: <OpenIssuesOverview /> },
                            { key: `types-${projectId}`, title: 'Type', content: <TypesOverview /> },
                            { key: `asignee-${projectId}`, title: 'Assignees', content: <AssigneeOverview /> },
                            { key: `owner-${projectId}`, title: 'Owners', content: <OwnerOverview /> },
                        ]}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomePage;
