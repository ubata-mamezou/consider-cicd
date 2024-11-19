# Backend(TS)

## 構築手順

```sh
npm install @nestjs/cli
npx nest new customer-service
#  package manager: npm
```

* create resource
```sh
# module
npx nest generate module customers
# controller
npx nest generate controller customers
# service
npx nest generate service customers
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
