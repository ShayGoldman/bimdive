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

    const options = !data
        ? []
        : data.events_scans.map(({ project_provider_id, project_name }) => ({ key: project_provider_id, label: project_name }));

    return (
        <>
            <h2>Project Name</h2>
            <CustomSelect
                className={styles.projectSelect}
                options={options}
                value={options[0]?.key || ''}
                onValueChange={newValue => console.log(newValue)}
            />
        </>
    );
};

export default ProjectSelect;
