import React, { FunctionComponent } from 'react';
import MetbaseChart from '../../../components/MetabaseChart/MetabaseChart';
import './OpenIssuesOverview.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const OpenIssuesOverview: FunctionComponent<Props> = props => {
    return (
        <div className="open-issues-overview">
            <MetbaseChart questionId={17} />
            <MetbaseChart questionId={19} />
        </div>
    );
};

export default OpenIssuesOverview;
