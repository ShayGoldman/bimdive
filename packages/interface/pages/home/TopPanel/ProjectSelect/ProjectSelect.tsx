import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { naturalSortBy } from 'utils/sort-utils';
import CustomSelect from '../../../../components/CustomSelect/CustomSelect';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { useQuery, useReplaceQuery, useUser } from '../../../../hooks/hooks';
import { UserProjectScansQuery, useUserProjectScansQuery } from '../../../../schema/generated/graphql';
import './ProjectSelect.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

function getProjectsOptions(data: UserProjectScansQuery) {
    const projects = !data ? [] : data.scans.map(({ project_provider_id, project_name }) => ({ key: project_provider_id, label: project_name }));
    return naturalSortBy({
        array: projects,
        sortBy: item => item.label,
    });
}

const ProjectSelect: FunctionComponent<Props> = props => {
    const [projectId] = useQuery('ppid');
    const [tab] = useQuery('tab');
    const [_, replaceQuery] = useReplaceQuery();
    const setProjectId = useCallback(ppid => replaceQuery({ ppid, tab: tab || '1' }), [tab]);

    const [{ id: userId }] = useUser();
    const { error, loading, data } = useUserProjectScansQuery({ variables: { initiatingUserId: userId } });

    const options = getProjectsOptions(data);

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
