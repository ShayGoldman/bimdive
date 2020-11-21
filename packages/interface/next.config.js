const withStyles = require('@webdeb/next-styles');

module.exports = withStyles({
    env: {
      GRAPHQL_API_URL: 'http://localhost:5000/v1/graphql',
    },
    sass: true, // use .scss files
    modules: true, // style.(m|module).css & style.(m|module).scss for module files
    sassLoaderOptions: {
        sassOptions: {
            includePaths: ['styles'], // @import 'variables'; # loads (styles/variables.scss)
        },
    },
});
