import React, { FunctionComponent, useCallback, useEffect } from 'react';
import CustomSelect from '../../../../components/CustomSelect/CustomSelect';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { useScansQuery } from '../../../../schema/generated/graphql';
import './ProjectSelect.scss';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const ProjectSelect: FunctionComponent<Props> = props => {
    const { error, data } = useScansQuery();
    const router = useRouter();
    const { ppid: selectedProjectId = '', ...query } = router.query;

    const options = !data ? [] : data.scans.map(({ project_provider_id, project_name }) => ({ key: project_provider_id, label: project_name }));
    const onProjectSelected = useCallback(
        ppid => {
            const { pathname } = location;
            router.push({
                pathname,
                query: {
                    ...query,
                    ppid,
                },
            });
        },
        [query]
    );

    useEffect(() => {
        const candidate = options[0]?.key || '';

        if (candidate && !selectedProjectId) {
            onProjectSelected(candidate);
        }
    }, [options, selectedProjectId]);

    if (error) return <ErrorMessage error={error} />;

    return <CustomSelect options={options} value={selectedProjectId} onValueChange={onProjectSelected} className="project-select" />;
};

export default ProjectSelect;
