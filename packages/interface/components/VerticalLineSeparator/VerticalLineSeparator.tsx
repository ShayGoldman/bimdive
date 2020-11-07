import { FunctionComponent } from 'react';
import './VerticalLineSeparator.scss';

interface Props {
    horizontalMargin?: number;
}

const VerticalLineSeparator: FunctionComponent<Props> = ({ horizontalMargin = 50 }) => {
    return <div className="vertical-line-separator" style={{ marginLeft: horizontalMargin, marginRight: horizontalMargin }} />;
};

export default VerticalLineSeparator;
