import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '../styles/globals.scss';

const client = new ApolloClient({
    uri: 'http://localhost:5000/v1/graphql',
    cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Component {...pageProps} />
            </div>
        </ApolloProvider>
    );
}

export default MyApp;
