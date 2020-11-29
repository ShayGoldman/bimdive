import { Grid } from '@material-ui/core';
import CustomSelect from 'components/CustomSelect/CustomSelect';
import React, { FunctionComponent, useEffect } from 'react';
import { useIssuesTypesQuery, IssuesTypesQuery } from 'schema/generated/graphql';
import { naturalSortBy } from 'utils/sort-utils';

import MetbaseChart from '../../../components/MetabaseChart/MetabaseChart';
import { useQuery } from '../hooks';
import './TypesOverview.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

function getTypesOptions(data: IssuesTypesQuery) {
    const owners = !data ? [] : data.owners.map(({ type }) => ({ key: type, label: type }));
    return naturalSortBy({
        array: owners,
        sortBy: item => item.label,
    });
}

const TypesOverview: FunctionComponent<Props> = props => {
    const [projectId] = useQuery('ppid');
    const { data, error } = useIssuesTypesQuery({ variables: { projectProviderId: projectId } });

    const typesOptions = getTypesOptions(data);
    const hasTypes = typesOptions.length > 0;
    const [type, setType] = useQuery('type');

    useEffect(() => {
        const candidate = typesOptions[0]?.key;
        if (process.browser && !type && candidate) {
            setType(candidate);
        }
    }, [typesOptions, type]);

    return (
        <Grid container spacing={2} className="types-overview">
            {hasTypes && (
                <Grid container item xs={12}>
                    <CustomSelect options={typesOptions} value={type} onValueChange={type => setType(type)} />
                </Grid>
            )}
            <Grid container item xs={12} className="chart-row">
                {projectId && type && <MetbaseChart dashboardId={13} params={{ project_provider_id: projectId, issue_type: type }} />}
            </Grid>
        </Grid>
    );
};

export default TypesOverview;
