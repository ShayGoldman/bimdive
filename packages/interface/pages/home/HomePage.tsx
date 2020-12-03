import React, { FunctionComponent, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import TopPanel from './TopPanel/TopPanel';
import OpenIssuesOverview from './OpenIssuesOverview/OpenIssuesOverview';
import TypesOverview from './TypesOverview/TypesOverview';
import AssigneeOverview from './AssigneeOverview/AssigneeOverview';
import OwnerOverview from './OwnerOverview/OwnerOverview';
import { useQuery, useReplaceQuery } from '../../hooks/hooks';

export interface HomePageProps {
    preSelectedTab?: string;
}

const HomePage: FunctionComponent<HomePageProps> = ({ preSelectedTab }) => {
    const topPanelHeight = 100;
    const [projectId] = useQuery('ppid');
    const [selectedTab = preSelectedTab, setSelectedTab] = useQuery('tab');
    const [_, replaceQuery] = useReplaceQuery();

    useEffect(() => {
        if (!selectedTab) {
            setSelectedTab('1', true);
        }
    }, [projectId]);

    return (
        <Grid container style={{ height: '100%', alignContent: 'flex-start' }}>
            <div style={{ height: topPanelHeight, width: '100%' }}>
                <TopPanel />
            </div>
            <Grid container item style={{ height: `calc(100% - ${topPanelHeight}px)` }}>
                <Grid item xs={12}>
                    <CustomTabs
                        selectedTab={selectedTab}
                        onTabSelected={tab => replaceQuery({ ppid: projectId, tab })}
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
