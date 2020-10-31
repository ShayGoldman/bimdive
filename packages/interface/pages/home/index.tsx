import { FunctionComponent } from 'react';

interface Props {
    query: any;
}

const HomePage: FunctionComponent<Props> = ({ query }) => {
    const { email = '' } = query;
    console.log(query);
    return (
        <div>

        </div>
    );
}
