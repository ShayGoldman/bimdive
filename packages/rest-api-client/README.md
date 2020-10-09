# api-client

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
