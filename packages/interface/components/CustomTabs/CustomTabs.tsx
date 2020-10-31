import React, { FunctionComponent } from 'react';
import styles from './CustomTabs.module.scss';
import { AppBar, Tab, Tabs } from '@material-ui/core';

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
        <div className={styles.customTabs}>
            <AppBar position="static">
                <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
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
