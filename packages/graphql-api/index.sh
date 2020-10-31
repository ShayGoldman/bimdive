#! /bin/bash
docker run -it --rm -p 5000:8080 \
  -e HASURA_GRAPHQL_DATABASE_URL=$DB_CONNECTION_URI \
  -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
  -e HASURA_GRAPHQL_DEV_MODE=true \
  -e HASURA_GRAPHQL_ENABLED_LOG_TYPES=startup,http-log,query-log,websocket-log,webhook-log \
  hasura/graphql-engine:v1.3.2 | pino-pretty --crlf
