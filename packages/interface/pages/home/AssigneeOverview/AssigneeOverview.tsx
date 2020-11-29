import { Grid } from '@material-ui/core';
import CustomSelect from 'components/CustomSelect/CustomSelect';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { IssuesAssigneesQuery, useIssuesAssigneesQuery } from 'schema/generated/graphql';
import { naturalSortBy } from 'utils/sort-utils';
import MetbaseChart from '../../../components/MetabaseChart/MetabaseChart';
import { useQuery } from '../../../hooks/hooks';
import './AssigneeOverview.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

function getAssigneeOptions(data: IssuesAssigneesQuery) {
    const assignees = !data ? [] : data.assignees.map(({ assignee }) => assignee).map(user => ({ key: user.provider_id, label: user.name }));
    return naturalSortBy({
        array: assignees,
        sortBy: item => item.label,
    });
}

const AssigneeOverview: FunctionComponent<Props> = props => {
    const [projectId] = useQuery('ppid');
    const { data, error } = useIssuesAssigneesQuery({ variables: { projectProviderId: projectId } });

    const assigneeOptions = getAssigneeOptions(data);
    const hasAssignees = assigneeOptions.length > 0;
    const [assignee, setAssignee] = useQuery('assignee');

    useEffect(() => {
        const candidate = assigneeOptions[0]?.key;
        if (process.browser && !assignee && candidate) {
            setAssignee(candidate);
        }
    }, [assigneeOptions, assignee]);

    return (
        <Grid container spacing={2} alignItems="flex-start" className="assignee-overview">
            {hasAssignees && (
                <Grid container item xs={12}>
                    <CustomSelect options={assigneeOptions} value={assignee} onValueChange={assignee => setAssignee(assignee)} />
                </Grid>
            )}
            <Grid container item xs={12} className="chart-row">
                {projectId && assignee && <MetbaseChart dashboardId={14} params={{ project_provider_id: projectId, issue_assignee: assignee }} />}
            </Grid>
        </Grid>
    );
};

export default AssigneeOverview;
