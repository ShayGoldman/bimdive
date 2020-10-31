import React, { FunctionComponent } from 'react';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import styles from './ProjectSelect.module.scss';
import { useEventsScansQuery } from '../../../src/generated/graphql';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const ProjectSelect: FunctionComponent<Props> = props => {
    const { error, data } = useEventsScansQuery();

    if (error) return <ErrorMessage error={error} />;

    const values =  !data ? [] : data.events_scans.map(event_scan => event_scan.project_name);
    return (
        <>
            <h2>Project Name</h2>
            <CustomSelect className={styles.projectSelect} options={values} value={values[0] || ''} onValueChange={newValue => console.log(newValue)} />
        </>
    );
};

export default ProjectSelect;
