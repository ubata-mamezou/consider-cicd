rm dist/api-client
npx openapi-generator-cli generate \
  -i openapi.yaml \
  -g typescript-fetch \
  -o dist/customer-api-client \
  -c client-config.json
