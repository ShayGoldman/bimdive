
if [ -z $API_URI ]; then echo "API_URI is missing"; exit; fi

docker run --rm -v "${PWD}/src:/out" openapitools/openapi-generator-cli generate \
    -i $API_URI \
    -g typescript-fetch \
    -o /out \
    -p typescriptThreePlus=true,useSingleRequestParameter=true,supportsES6=true