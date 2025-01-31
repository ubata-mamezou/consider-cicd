# モジュールの生成
#
# * 1: 生成先の相対パス ex. gen/create-customer
# * 2: 画面名（物理） ex. create-customer
# * 3: 画面名（論理） ex. 顧客登録
# 
# * 実行例
#   `bash generate-module.sh create-customer 顧客登録`
#
# * 注意事項
#   * 生成先のフォルダは事前に準備してください。
CAMEL_CASE_VIEW_NAME=$(echo "$2" | sed -r 's/(^|-)(\w)/\U\2/g') # キャメルケースの画面名（物理）

node -e "
const fs = require('fs');
const Handlebars = require('handlebars');

const template = fs.readFileSync('templates/module.hbs', 'utf8');

const compiled = Handlebars.compile(template);

const content = compiled({
  logicalName: '$3',
  physicalName: '$2',
  className: '$CAMEL_CASE_VIEW_NAME'
});

fs.writeFileSync('$1/$2.module.ts', content);
"