import React, { FunctionComponent, useCallback, useEffect } from 'react';
import CustomSelect from '../../../../components/CustomSelect/CustomSelect';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { useUserProjectScansQuery } from '../../../../schema/generated/graphql';
import './ProjectSelect.scss';
import { useQuery, useUser } from 'pages/home/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const ProjectSelect: FunctionComponent<Props> = props => {
    const [projectId, setProjectId] = useQuery('ppid');
    const [{ id: userId }] = useUser();
    const { error, loading, data } = useUserProjectScansQuery({ variables: { initiatingUserId: userId } });

    const options = !data ? [] : data.scans.map(({ project_provider_id, project_name }) => ({ key: project_provider_id, label: project_name }));

    useEffect(() => {
        const candidate = options[0]?.key || '';

        if (process.browser && !loading && !projectId && candidate) {
            setProjectId(candidate);
        }
    }, [options, loading, projectId]);

    if (error) return <ErrorMessage error={error} />;

    return <CustomSelect options={options} value={projectId} onValueChange={setProjectId} className="project-select" />;
};

export default ProjectSelect;
