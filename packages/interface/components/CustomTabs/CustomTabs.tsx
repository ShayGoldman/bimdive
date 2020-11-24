import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { AppBar, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import './CustomTabs.scss';
import { useRouter } from 'next/router';

interface TabDetails {
    title: string;
    content: React.ReactNode;
}

interface Props {
    tabs: TabDetails[];
}

const CustomTabs: FunctionComponent<Props> = ({ tabs }) => {
    const router = useRouter();
    const query = router.query;
    const selectedTab = router.query.tab as string;

    const onTabChanged = useCallback(
        tab => {
            const { pathname } = location;
            router.push({
                pathname,
                query: { ...query, tab },
            });
        },
        [query]
    );

    useEffect(() => {
        if (!selectedTab) {
            onTabChanged('1');
        }
    }, [selectedTab]);

    return (
        <TabContext value={selectedTab}>
            <AppBar position="static">
                <TabList onChange={(event, newValue) => onTabChanged(newValue)} variant="fullWidth">
                    {tabs.map(({ title }, index) => (
                        <Tab key={title} label={title} value={(index + 1).toString()} />
                    ))}
                </TabList>
            </AppBar>
            {tabs.map(({ title, content }, index) => (
                <TabPanel key={title} value={(index + 1).toString()}>
                    {content}
                </TabPanel>
            ))}
        </TabContext>
    );
};

export default CustomTabs;
