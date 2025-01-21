# Backend(TS)

## 構築手順

```sh
npm install @nestjs/cli
npx nest new customer-service --skip-git
#  package manager: npm
#  --skip-git: デフォルトの動きとしてgitリポジトリの初期化が実行されます。既存リポジトリに追加する場合は初期化は必要ないのでこのオプションをつけましょう。変更が検出されず少しハマりました。
```

* create resource
```sh
# module
npx nest generate module customers
# controller
npx nest generate controller customers
# service
npx nest generate service customers

# ui inbound
## current directory: view
npx nest g module customer-management
npx nest g controller customer-management

# service
## current directory: src
mkdir customers
cd customers
npx nest g module customer --flat
npx nest g service customer --flat
```




## 環境情報をうまく取り扱うために

設定ファイルと環境変数を併用して環境情報を取り扱いたい。
環境変数があれば、環境変数を優先利用。
なければ、設定ファイルを利用。
これによって設定を切り替えていく。

* nest/configをインストール
```sh
npm install @nestjs/config
```
* envファイルの作成
  * ローカル開発用、テスト用などの設定ファイルを作成
* 設定ファイルパスの設定追加
```ts: app.module.ts
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
      isGlobal: true,
    }),
  ],
```
* 設定値の利用
```ts
    console.log(
    `
      env: ${this.configService.get<string>('ENV_NAME', '不明')}
    `);
```
* Appendix: PowerShell上の環境変数設定
```sh
# $Env:{環境変数名}={環境変数値}
$Env:envValName="envVal"
```
* これだと変数名が散在する、値を都度読むことになることから集約＋キャッシングをすべきである。

## test report
```sh
npm install jest-html-reporters
```
scriptの追加
npx jest --reporters=default --reporters=jest-html-reporters --coverage --collectCoverageFrom='./src/**'

```json
{
  "scripts": {
    // "test": "jest", 
    "test": "jest --reporters:default", //毎回テストレポート作成されるのは重いので通常は作成されないようにオプション追加
    "test:ci": "jest --coverage", //追加：CI用のテスト実行コマンド（カバレッジレポートおよびテストレポートの生成あり）
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    // "coverageDirectory": "../coverage",
    "coverageDirectory": "../test-result/coverage", //CI上で扱いづらいので出力先を変更（test-resultフォルダ配下に生成するようにしてください)
    "testEnvironment": "node",
    //
    "coverageReporters": ["text", "lcov"],
    //追加：テストレポートのレポーター設定
    "reporters": [
      "default",
      [
        "jest-html-reporters",
        {
          "publicPath": "./test-result/test-report",
          "filename": "test-report.html",
          "expand": true
        }
      ]
    ]
  }
}
```


## Appendix：トラブルシューティング

* Delete `␍`eslint(prettier/prettier)
Lintとprettierの設定競合によるエラー。
LintはprettierがLFを期待しているが、Windows環境下ではCRLFがデフォルトになり、この祖語によるエラー。
`npm lint`を実行するとエラーは解消するという記事があるが、これは一時的な対処でしかありません。
きちんと設定の祖語を解消しましょう。
```js: .eslintrc.js
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    //Lint, prettierの競合解消
    'prettier/prettier': ['error', { endOfLine: 'auto' }], //追加
  },
```
