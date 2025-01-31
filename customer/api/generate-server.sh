# param
# * 1: service-name
rm dist/$1-api -rf
npx openapi-generator-cli generate \
  -i openapi.yaml \
  -g typescript-fetch \
  -o dist/$1-api \
  -c server-config.yaml
