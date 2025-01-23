# インバウンドリソースの生成
#
# * 1: 当ディレクトリからsrcまでにあるディレクトリ
#   * ex. dev-tools/../app/src/view: 「../app」を指定
# * 2: 画面名（物理） ex. create-customer
# * 3: 画面名（論理） ex. 顧客登録
# 
# * 実行例
#   `bash generate-inbound.sh ../app create-customer 顧客登録`
#
# * 注意事項
#   * 再帰的に生成する作りにはしていません。新規作成用と考えてください。
#   * tsconfig.jsonにパスを設定してください。
#     ```json
#     "@view/*": [
#       "src/view/*"
#     ]
#     ```

# cd $1
CAMEL_CASE_VIEW_NAME=$(echo "$2" | sed -r 's/(^|-)(\w)/\U\2/g') # キャメルケースの画面名（物理）

# プロダクトコードの生成
mkdir gen/$2 -p
# mkdir src/view/$2 -p
# cd src/view/$2

bash generate-module.sh gen/$2 $2 $3
bash generate-controller.sh gen/$2 $2 $3
bash generate-index.sh gen/$2 $2 $3

# ## module
# npx nest g module $2 --flat
# MODULE_FILE="$2.module.ts" # モジュール名
# sed -i "/export class ${CAMEL_CASE_NAME}Module {/i /** $3モジュール */" $MODULE_FILE

# # controller
# npx nest g controller $2 --flat
# CONTROLLER_FILE="$2.controller.ts" # コントローラー名
# sed -i "/export class ${CAMEL_CASE_NAME}Controller {/i /** $3コントローラー */" $CONTROLLER_FILE

# ## index
# echo "/**
#  * $3パッケージ。
#  */
# export * from './$2.module';
# export * from './$2.controller';" > index.ts

# # テストコードの移動
# TO_TEST_CODE_PATH=test/view/$2/$2.controller.spec.ts
# cd ../../..
# mkdir test/view/$2 -p
# mv src/view/$2/$2.controller.spec.ts ${TO_TEST_CODE_PATH}

# # インポート文の変更
# sed -i "s|import { ${CAMEL_CASE_VIEW_NAME}Controller } from './$2.controller';|import { ${CAMEL_CASE_VIEW_NAME}Controller } from '@view/$2';|g" ${TO_TEST_CODE_PATH}
# # インポートの編成
# npx format
