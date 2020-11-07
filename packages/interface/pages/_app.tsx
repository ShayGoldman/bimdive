import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Head from 'next/head';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import '../styles/globals.scss';

const client = new ApolloClient({
    uri: 'http://localhost:5000/v1/graphql',
    cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#f06623',
                dark: '#D74D0A',
            },
        },
        typography: {
            fontFamily: ['Barlow', 'sans-serif'].join(','),
        },
    });

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Head>
                        <title>BIMdive</title>
                    </Head>
                    <Component {...pageProps} />
                </div>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default MyApp;
