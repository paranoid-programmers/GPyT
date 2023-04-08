# npm install @openapitools/openapi-generator-cli -g

# first arg is location of json file, assert
if [ -z "$1" ]; then
    echo "No json file provided"
    exit 1
fi

# check if the apiclient directory exists, if it does, delete it
if [ -d "./services/apiclient/" ]; then
    rm -rf ./services/apiclient/
fi

npx @openapitools/openapi-generator-cli generate \
    -i $1 \
    -g typescript \
    --package-name gpyt \
    -o ./services/apiclient/

(
    cd ./services/apiclient/
    npm install
    npm run build
)
(
    cd ./services/fe/
    npm install
)
