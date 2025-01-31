# param
# * 1: service-name
rm dist/$1-api-client -rf
npx openapi-generator-cli generate \
  -i openapi.yaml \
  -g typescript-fetch \
  -o dist/$1-api-client \
  -c client-config.yaml
