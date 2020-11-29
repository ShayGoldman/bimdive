import { Grid } from '@material-ui/core';
import CustomSelect from 'components/CustomSelect/CustomSelect';
import React, { FunctionComponent, useEffect } from 'react';
import { IssuesOwnersQuery, useIssuesOwnersQuery } from 'schema/generated/graphql';
import { naturalSortBy } from 'utils/sort-utils';
import MetbaseChart from '../../../components/MetabaseChart/MetabaseChart';
import { useQuery } from '../../../hooks/hooks';
import './OwnerOverview.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

function getOwnerOptions(data: IssuesOwnersQuery) {
    const owners = !data ? [] : data.owners.map(({ owner }) => owner).map(user => ({ key: user.provider_id, label: user.name }));
    return naturalSortBy({
        array: owners,
        sortBy: item => item.label,
    });
}

const OwnerOverview: FunctionComponent<Props> = props => {
    const [projectId] = useQuery('ppid');
    const { data, error } = useIssuesOwnersQuery({ variables: { projectProviderId: projectId } });

    const ownerOptions = getOwnerOptions(data);
    const hasOwners = ownerOptions.length > 0;
    const [owner, setOwner] = useQuery('owner');

    useEffect(() => {
        const candidate = ownerOptions[0]?.key;
        if (process.browser && !owner && candidate) {
            setOwner(candidate);
        }
    }, [ownerOptions, owner]);

    return (
        <Grid container spacing={2} alignItems="flex-start" className="owner-overview">
            {hasOwners && (
                <Grid container item xs={12}>
                    <CustomSelect options={ownerOptions} value={owner} onValueChange={owner => setOwner(owner)} />
                </Grid>
            )}
            <Grid container item xs={12} className="chart-row">
                {projectId && owner && <MetbaseChart dashboardId={15} params={{ project_provider_id: projectId, issue_owner: owner }} />}
            </Grid>
        </Grid>
    );
};

export default OwnerOverview;
