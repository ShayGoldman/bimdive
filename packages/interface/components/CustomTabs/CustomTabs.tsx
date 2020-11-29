import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { AppBar, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import './CustomTabs.scss';
import { useRouter } from 'next/router';

interface TabDetails {
    key: string;
    title: string;
    content: React.ReactNode;
}

interface Props {
    tabs: TabDetails[];
}

const CustomTabs: FunctionComponent<Props> = ({ tabs }) => {
    const [selectedTab, setSelectedTab] = useState('1');

    return (
        <TabContext value={selectedTab}>
            <AppBar position="static">
                <TabList onChange={(event, newValue) => setSelectedTab(newValue)} variant="fullWidth">
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
