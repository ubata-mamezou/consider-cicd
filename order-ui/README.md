# Orde UI

## 環境

|name|
|---|
|React|
|TypeScript|
|Vite|

## 開始時の設定

```sh
npm create vite
cd {app-name}
npm install
```

## jest追加

1. jest追加
```sh
npm install --save-dev jest ts-jest @types/jest babel-jest @vitejs/plugin-react vite-tsconfig-paths
```

2. jestの初期化
```sh
npx ts-jest config:init
```

3. jest設定
拡張子をjsからcjsに変更して、下記を設定。
```js: jest.config.cjs
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.export = {
  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/?(*.)+(spec|test).(ts|tsx|js)'],
};
```

4. ts設定
```json: tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["ESNext", "DOM"],
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true
  },
  "exclude": ["node_modules", "dist"]
}
```
