# rest-api

## Instructions

1. Apply any updates to the database (new table/changes)
1. Run `yarn deploy` to redeploy PostgREST and detect the changes
1. Run `yarn deploy:status` to track the state of the deployment

### Important

The REST api schema should be always up-to-date to any change in the db

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
