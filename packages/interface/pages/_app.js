import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    return (
        <div className="App">
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
