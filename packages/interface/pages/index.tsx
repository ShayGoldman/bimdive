import { GetServerSideProps } from 'next';
import HomePage, { HomePageProps } from './home/HomePage';

export const getServerSideProps: GetServerSideProps<HomePageProps, { tab?: string }> = async context => {
    return {
        props: {
            preSelectedTab: String(context.query.tab) || null,
        },
    };
};

export default HomePage;
