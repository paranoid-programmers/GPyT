# npm install @openapitools/openapi-generator-cli -g


# first arg is location of json file, assert
if [ -z "$1" ]; then
    echo "No json file provided"
    exit 1
fi

# check if the apiclient directory exists, if it does, delete it
if [ -d "./src/apiclient/" ]; then
    rm -rf ./src/apiclient/
fi

# todo: add this to apiclient tsconfig.json
#    "module": "ESNext",

npx @openapitools/openapi-generator-cli generate \
    -i $1 \
    -g typescript \
    --package-name gpyt \
    -p --npmName=gpyt \
    -p --supportsES6=true \
    -o ./src/apiclient/


# Fix the module type
input_file="./src/apiclient/tsconfig.json"
temp_file="./src/apiclient/tsconfig.json.tmp"
awk 'NR==4{print $0; print "    \"module\": \"ESNext\","} NR!=4{print}' $input_file > $temp_file && mv $temp_file $input_file

(
    cd ./src/apiclient/
    npm install
    npm run build
)
(
    cd ./src/fe/
    npm install
)
