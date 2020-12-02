import { useEffect } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Head from 'next/head';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import '../styles/globals.scss';
import { useRouter } from 'next/router';

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        function trackPage(url: URL) {
            if (process.env.NEXT_PUBLIC_ENABLE_TRACKING) {
                window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID, { page_path: url });
            }
        }

        router.events.on('routeChangeComplete', trackPage);
        return () => router.events.off('routeChangeComplete', trackPage);
    }, [router.events]);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

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
        <>
            <Head>
                <title>BIMdive</title>
            </Head>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <div className="App">
                        <CssBaseline />
                        <Component {...pageProps} />
                    </div>
                </ThemeProvider>
            </ApolloProvider>
        </>
    );
}

export default MyApp;
