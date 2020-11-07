import React, { FunctionComponent } from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import './CustomTabs.scss';

interface TabDetails {
    title: string;
    content: React.ReactNode;
}

interface Props {
    tabs: TabDetails[];
}

const CustomTabs: FunctionComponent<Props> = ({ tabs }) => {
    const [value, setValue] = React.useState(0);

    return (
        <div className="custom-tabs">
            <AppBar position="static">
                <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} variant="fullWidth">
                    {tabs.map(({ title }) => (
                        <Tab key={title} label={title} />
                    ))}
                </Tabs>
            </AppBar>
            {/*<TabPanel value={value} index={0}>*/}
            {/*    Item One*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={1}>*/}
            {/*    Item Two*/}
            {/*</TabPanel>*/}
            {/*<TabPanel value={value} index={2}>*/}
            {/*    Item Three*/}
            {/*</TabPanel>*/}
        </div>
    );
};

export default CustomTabs;
