import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import TopPanel from './TopPanel/TopPanel';
import OpenIssuesOverview from './OpenIssuesOverview/OpenIssuesOverview';
import TypesOverview from './TypesOverview/TypesOverview';
import AssigneeOverview from './AssigneeOverview/AssigneeOverview';
import OwnerOverview from './OwnerOverview/OwnerOverview';
import { GetServerSideProps } from 'next';

const HomePage: FunctionComponent = () => {
    const topPanelHeight = 100;

    return (
        <Grid container style={{ height: '100%', alignContent: 'flex-start' }}>
            <div style={{ height: topPanelHeight, width: '100%' }}>
                <TopPanel />
            </div>
            <Grid container item style={{ height: `calc(100% - ${topPanelHeight}px)` }}>
                <Grid item xs={12}>
                    <CustomTabs
                        tabs={[
                            { title: 'Open Issues', content: <OpenIssuesOverview /> },
                            { title: 'Type', content: <TypesOverview /> },
                            { title: 'Assignees', content: <AssigneeOverview /> },
                            { title: 'Owners', content: <OwnerOverview /> },
                        ]}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {},
    };
};

export default HomePage;
