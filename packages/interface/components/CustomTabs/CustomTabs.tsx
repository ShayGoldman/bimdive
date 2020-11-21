import React, { FunctionComponent } from 'react';
import { AppBar, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import './CustomTabs.scss';

interface TabDetails {
    title: string;
    content: React.ReactNode;
}

interface Props {
    tabs: TabDetails[];
}

const CustomTabs: FunctionComponent<Props> = ({ tabs }) => {
    const [value, setValue] = React.useState('1');

    return (
        <div className="custom-tabs">
            <TabContext value={value}>
                <AppBar position="static">
                    <TabList onChange={(event, newValue) => setValue(newValue)} variant="fullWidth">
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
        </div>
    );
};

export default CustomTabs;
