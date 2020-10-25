# api-client

# Instructions

1. Make sure the rest api is up-to-date (follow instructions for the `rest-api` package)
1. Run `yarn build` to generate new client
1. Run `yarn install` in any dependant library

## generate client

```
docker run --rm -v "${PWD}/src:/out" openapitools/openapi-generator-cli generate \
    -i https://rest.bimdive.com \
    --enable-post-process-file \
    --api-package apis \
    --model-package models \
    -g typescript-axios \
    -o /out \
    -p useSingleRequestParameter=true,supportsES6=true,withSeparateModelsAndApi=true
```
