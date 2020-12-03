import { AppBar, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { useQuery } from 'hooks/hooks';
import React, { FunctionComponent } from 'react';
import './CustomTabs.scss';

interface TabDetails {
    key: string;
    title: string;
    content: React.ReactNode;
}

interface Props {
    tabs: TabDetails[];
    selectedTab: string;
    onTabSelected: (string) => any;
}

const CustomTabs: FunctionComponent<Props> = ({ tabs, selectedTab, onTabSelected }) => {
    return (
        <TabContext value={selectedTab}>
            <AppBar position="static">
                <TabList onChange={(event, newValue) => onTabSelected(newValue)} variant="fullWidth">
                    {tabs.map(({ title }, index) => (
                        <Tab key={title} label={title} value={(index + 1).toString()} />
                    ))}
                </TabList>
            </AppBar>
            {tabs.map(({ key, content }, index) => (
                <TabPanel key={key} value={(index + 1).toString()}>
                    {content}
                </TabPanel>
            ))}
        </TabContext>
    );
};

export default CustomTabs;
