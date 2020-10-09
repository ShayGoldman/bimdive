# rest-api

## Scripts

- `yarn dev` will start PostREST & Swagger-UI locally, connected to production DB
- `yarn deploy` will redeploy the rest api
- `yarn deploy:status` will fetch the status of the current deployment

## Environment

You'll need an `.env.prod` file with the following keys:

```
PGRST_DB_URI
PGRST_DB_ANON_ROLE
PGRST_DB_SCHEMA
PROD_CLUSTER_ARN
```
