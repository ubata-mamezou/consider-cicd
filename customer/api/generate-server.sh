rm dist/api-server
npx openapi-generator-cli generate \
  -i openapi.yaml \
  -g typescript-nestjs \
  -o dist/customer-api \
  -c server-config.json
