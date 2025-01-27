# インバウンドリソースの生成
#
# * 1: 当ディレクトリからsrcディレクトリの間にあるパス
#   * ex. 下記のようなディレクトリ構成であれば「../../app」を指定
#     * customer
#       * app
#         * src
#           * view
#         * test
#       * dev-tools
#         * code-gen
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

CAMEL_CASE_VIEW_NAME=$(echo "$2" | sed -r 's/(^|-)(\w)/\U\2/g') # キャメルケースの画面名（物理）
VIEW_ROOT_DIRECTORY=$1/src/view # ビューリソースのコンテキストルートパス
VIEW_ROOT_TEST_DIRECTORY=$1/test/view # ビューリソースのテストコンテキストルートパス

# プロダクトコードの生成
mkdir $VIEW_ROOT_DIRECTORY/$2 -p
bash generate-module.sh $VIEW_ROOT_DIRECTORY/$2 $2 $3
bash generate-controller.sh $VIEW_ROOT_DIRECTORY/$2 view/$2 $3
bash generate-index.sh $VIEW_ROOT_DIRECTORY/$2 $2 $3

# テストコードの生成
mkdir $VIEW_ROOT_TEST_DIRECTORY/$2 -p
bash generate-controller.spec.sh $VIEW_ROOT_TEST_DIRECTORY/$2 $2 $3
