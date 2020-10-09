docker run --rm -v "${PWD}/src:/out" openapitools/openapi-generator-cli generate \
    -i https://rest.bimdive.com \
    -g typescript-fetch \
    -o /out \
    -p typescriptThreePlus=true,useSingleRequestParameter=true,supportsES6=true