import React, { FunctionComponent } from 'react';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import styles from './ProjectSelect.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const ProjectSelect: FunctionComponent<Props> = props => {
    return (
        <>
            <h2>Project Name</h2>
            <CustomSelect className={styles.projectSelect} values={['Autodesk', 'BIMdive']} onValueChange={newValue => console.log(newValue)} />
        </>
    );
};

export default ProjectSelect;
