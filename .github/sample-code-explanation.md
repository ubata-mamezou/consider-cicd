# サンプルコードの説明

## サンプルコード構成

* :file_folder: .github
  * pull_request_template.md：PRテンプレート ※1
  * release.yaml：リリースノート自動生成 ※1
  * dependabot.yml：dependabotによる依存関係の監視　※1
  * :file_folder: workflows: ワークフロー
    * wf-build-and-deploy-java.yaml: バックエンド（Java）のビルド～開発環境へのデプロイ ※2
    * wf-build-and-deploy-react.yaml: フロントエンド（SSG）のビルド～開発環境へのデプロイ ※2
    * wf-build-and-deploy-ts.yaml: バックエンド（TypeScript）のビルド～開発環境へのデプロイ ※2
    * wf-build-java.yaml: バックエンド（Java）のビルド ※2
    * wf-build-react.yaml: フロントエンド（SSG）のビルド ※2
    * wf-build-ts.yaml: バックエンド（TypeScript）のビルド ※2
    * wf-deploy-prod_customer-service.yaml: 本番環境への顧客サービスのデプロイ ※3
    * wf-deploy-prod_order-service.yaml: 本番環境への受注サービスのデプロイ ※3
    * wf-deploy-stage_customer-service.yaml: ステージング環境への顧客サービスのデプロイ ※3
    * wf-deploy-stage_order-service.yaml: ステージング環境への受注サービスのデプロイ ※3
    * _build-image.yaml: イメージビルド ※2
    * _build-java-app.yaml: Java+Mavenアプリケーションビルド ※2
    * _build-react-app.yaml: Reactアプリケーションビルド ※2
    * _build-ts-app.yaml: TypeScript+Nodeアプリケーションビルド ※2
    * _deploy-aws-backend.yaml: バックエンドのデプロイ ※2
    * _deploy-aws-frontend.yaml: フロントエンドのデプロイ ※2
    * _deploy-dev-aws-backend.yaml: バックエンドの開発環境へのデプロイ ※2
    * _deploy-dev-aws-frontend.yaml: フロントエンドの開発環境へのデプロイ ※2
    * _deploy-prod-aws-backend.yaml: バックエンドの本番環境へのデプロイ ※2
    * _deploy-stage-aws-backend.yaml: バックエンドのステージング環境への ※2
    * _load-config.yaml: 設定ファイルの読み込み ※2
    * _publish-report.yaml: レポート公開 ※2
    * :file_folder: template: テンプレート
      * workflow-config.yaml: ワークフロー設定ファイルのテンプレート ※2

※_xxx.yaml: 再利用可能ワークフロー（端的に言うと部品化されたワークフローで、他ワークフローから呼び出されることが前提になります）
※1: そのまま利用可能  
※2: 技術スタックが同じなら、そのまま利用可能  
※3: これを例としてアプリケーションに合わせた実装が必要。
※フロントエンドのステージング、本番へのデプロイワークフローは特化したものの量産にしかならないので省略しています

## サンプルコードの流れ

### wf-build-java, wf-build-ts

featureからdevelopブランチへのPRの作成、変更、リオープンをトリガーとしたワークフロー。
後述する`wf-build-and-deploy-java`の「アーティファクト公開」、「イメージ公開」、「デプロイ」のないものが、当ワークフローの流れになります。  
重複部分が多いので、フローは省略します。  

### wf-build-react

featureからdevelopブランチへのPRの作成、変更、リオープンをトリガーとしたワークフロー。
後述する`wf-build-and-deploy-react`の「デプロイ」のないものが、当ワークフローの流れになります。  
重複部分が多いので、フローは省略します。  

### wf-build-and-deploy-java, wf-build-and-deploy-ts

developブランチへのプッシュをトリガーとしたワークフロー。
両者とも基本的な流れは同じなので`wf-build-and-deploy-java`を例に説明します。

```mermaid
sequenceDiagram
  actor reviewer

  box workflow
    participant wf-build-and-deploy-java
    participant build-java-app
    participant build-image
    participant deploy-dev-aws-backend
    participant deploy-aws-backend
    participant publish-report
  end

  box GitHub
    participant Repository
    participant Actions
    participant InternalStorage
    participant Packages
    participant Pages
  end

  box AWS
    participant ECR
    participant ECS
  end

  reviewer ->> Repository: developブランチのPRをマージ
  Actions ->> Repository: 監視
  Actions ->> wf-build-and-deploy-java: ワークフロー実行
  note over wf-build-and-deploy-java: ビルドなど
  wf-build-and-deploy-java ->>+ build-java-app: ビルドなど
    build-java-app ->> build-java-app: ビルド
    build-java-app ->> build-java-app: テスト
    build-java-app ->> InternalStorage: テストレポートアップロード
    build-java-app ->> build-java-app: パッケージ
    build-java-app ->> InternalStorage: ビルドリソースアップロード
    note over build-java-app: アーティファクト公開
    build-java-app ->> Packages: アーティファクト公開
    build-java-app -->>- wf-build-and-deploy-java: -
  note over wf-build-and-deploy-java: イメージビルド
  wf-build-and-deploy-java ->>+ build-image: イメージビルド
    build-image ->> InternalStorage: ビルドリソースダウンロード
    build-image ->> build-image: イメージビルド
    build-image ->> build-image: 脆弱性スキャン
    build-image ->> InternalStorage: 脆弱性スキャンレポートアップロード
    note over build-image: イメージ公開
    build-image ->> Packages: イメージ公開
    build-image -->>- wf-build-and-deploy-java: - 
  par deploy 
    note over wf-build-and-deploy-java: デプロイ
    wf-build-and-deploy-java ->>+ deploy-dev-aws-backend: デプロイ(開発環境)
      deploy-dev-aws-backend ->>+ deploy-aws-backend: デプロイ
        deploy-aws-backend ->> Packages: イメージ取得
        deploy-aws-backend ->> ECR: イメージプッシュ
        deploy-aws-backend ->> ECS: タスク定義取得(rev 0)
        deploy-aws-backend ->> deploy-dev-aws-backend: タスク定義生成(rev 1)
        deploy-aws-backend ->> ECS: タスク定義登録(rev 1)
        deploy-aws-backend ->> ECS: サービス更新
        deploy-aws-backend ->>- deploy-dev-aws-backend: -
      deploy-dev-aws-backend -->>- wf-build-and-deploy-java: -
  and publish reports
    note over wf-build-and-deploy-java: レポート公開
    wf-build-and-deploy-java ->>+ publish-report: レポート公開
      publish-report ->> InternalStorage: テストレポートダウンロード
      publish-report ->> InternalStorage: 脆弱性スキャンレポートダウンロード
      publish-report ->> Pages: レポート公開
      publish-report -->>- wf-build-and-deploy-java: -
  end
```

### wf-build-and-deploy-react

developブランチへのプッシュをトリガーとしたワークフロー。
基本的な流れは`wf-build-and-deploy-java`と同じ。
コンテナー駆動ではないためイメージビルドがないのと、実行環境で使用するサービスが異なります。

```mermaid
sequenceDiagram
  actor reviewer

  box workflow
    participant wf-build-and-deploy-react
    participant build-react-app
    participant deploy-dev-aws-frontend
    participant deploy-aws-frontend
    participant publish-report
  end

  box GitHub
    participant Repository
    participant Actions
    participant InternalStorage
    participant Pages
  end

  box AWS
    participant S3
    participant CloudFront
  end

  reviewer ->> Repository: developブランチのPRをマージ
  Actions ->> Repository: 監視
  Actions ->> wf-build-and-deploy-react: ワークフロー実行
  note over wf-build-and-deploy-react: ビルドなど
  wf-build-and-deploy-react ->>+ build-react-app: ビルドなど
    build-react-app ->> build-react-app: ビルド
    build-react-app ->> build-react-app: テスト
    build-react-app ->> InternalStorage: テストレポートアップロード
    build-react-app ->> build-react-app: パッケージ
    build-react-app ->> InternalStorage: ビルドリソースアップロード
    build-react-app -->>- wf-build-and-deploy-react: -
  par deploy 
    note over wf-build-and-deploy-react: デプロイ
    wf-build-and-deploy-react ->>+ deploy-dev-aws-frontend: デプロイ(開発環境)
      deploy-dev-aws-frontend ->>+ deploy-aws-frontend: デプロイ
        deploy-aws-frontend ->> InternalStorage: ビルドリソースダウンロード
        deploy-aws-frontend ->> S3: コンテンツ同期
        deploy-aws-frontend ->> CloudFront: キャッシュ削除
        deploy-aws-frontend ->>- deploy-dev-aws-frontend: -
      deploy-dev-aws-frontend -->>- wf-build-and-deploy-react: -
  and publish reports
    note over wf-build-and-deploy-react: レポート公開
    wf-build-and-deploy-react ->>+ publish-report: レポート公開
      publish-report ->> InternalStorage: テストレポートダウンロード
      publish-report ->> InternalStorage: 脆弱性スキャンレポートダウンロード
      publish-report ->> Pages: レポート公開
      publish-report -->>- wf-build-and-deploy-react: -
  end
```

### wf-deploy-stage_customer-service, wf-deploy-stage_order-service

releaseブランチへのプッシュをトリガーとしたワークフロー。

```mermaid
sequenceDiagram
  actor reviewer

  box workflow
    participant wf-deploy-stage_customer-service
    participant deploy-stage-aws-backend
  end

  box GitHub
    participant Repository
    participant Actions
  end

  reviewer ->> Repository: releaseブランチのPRをマージ
  Actions ->> Repository: 監視
  Actions ->> wf-deploy-stage_customer-service: ワークフロー実行
    wf-deploy-stage_customer-service ->>+ deploy-stage-aws-backend: デプロイ(ステージング環境)
    note over deploy-stage-aws-backend: `wf-build-and-deploy-java`のデプロイと同じため、省略
```

### wf-deploy-prod_customer-service, wf-deploy-prod_order-service

mainブランチへのプッシュをトリガーとしたワークフロー。
デプロイ処理の流れは`wf-build-and-deploy-java`のデプロイ同じため、省略します。

```mermaid
sequenceDiagram
  actor reviewer

  box workflow
    participant wf-deploy-prod_customer-service
    participant deploy-prod-aws-backend
  end

  box GitHub
    participant Repository
    participant Actions
  end

  reviewer ->> Repository: releaseブランチのPRをマージ
  Actions ->> Repository: 監視
  Actions ->> wf-deploy-prod_customer-service: ワークフロー実行
    wf-deploy-prod_customer-service ->>+ deploy-prod-aws-backend: デプロイ(本番環境)
    note over deploy-prod-aws-backend: `wf-build-and-deploy-java`のデプロイと同じため、省略
```

## Appendix. アプリの設定例

* TypeScriptアプリケーション
  ```json
  {
    "scripts": {
      // # ビルドが実行されるスクリプトの設定
      // * UI(SSG)なら静的コンテンツ、backendならnpmモジュールのビルド
      // * vite, nestなど採用しているミドルによってコマンドが変わるので、これらの差異をアプリで吸収することを目的としています。
      // ## UI(SSG)の場合:環境別のビルドを区別したいので、環境別にコマンドを作成
      // * Suffixのないスクリプトはアプリケーション新規作成時に作成されます。その他は設定ファイルの切り替え方法に合わせて追加が必要です。
      "build": "tsc -b && vite build",
      "build:dev": "tsc -b && vite build --mode dev",
      "build:stage": "tsc -b && vite build --mode stage",
      "build:prod": "tsc -b && vite build --mode prod",
      // ## backendの場合:環境情報は外部から注入できるので環境別にコマンドを作成する必要はありません
      // * 基本、アプリケーション新規作成時に作成されます。
      "build": "nest build",

      // # 静的解析が実行されるスクリプトの設定
      // * 基本、アプリケーション新規作成時に作成されます。
      "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",

      // # テスト実行、カバレッジレポート生成およびテスト結果生成が実行されるスクリプトの設定
      // * ローカルとは区別しておく方が良いのでSuffixを付けています。
      //   * ローカルと同じにすると、ローカルでテストを実行する度、レポートが生成されて重く邪魔になってしまう
      "test:ci": "jest --coverage",
    },
    // # テスト結果の出力設定
    // * カバレッジレポートやテスト結果は、特定の場所に集約してください。サンプルコードでは`test-result`配下に集約しています。
    //    * テスト結果の取得先が散在するとその分亜流が増えるため、これを抑止することを目的としています。
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
      "coverageDirectory": "../test-result/coverage",
      "testEnvironment": "node",
      "coverageReporters": ["text", "lcov"],
      "reporters": [
        "default",
        [
          "jest-html-reporters",
          {
            "publicPath": "./test-result/test-report",
            "filename": "index.html",
            "expand": true
          }
        ]
      ]
    }
  }  
  ```
