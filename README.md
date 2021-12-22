# Firebaseとの連携

## Firebaseの設定

### プロジェクトの追加

- プロジェクト名設定
- [続行]
- アナリティクスは好みで有効にする
- [プロジェクト作成]
- プロジェクトの作成完了

### プロジェクトの設定

- [ウェブ</>]
- アプリのニックネームの設定
- [アプリの登録]
- npmのインストール（すでに済なら飛ばす）
- [コンソールに進む]
- [プロジェクトの設定]
- SDK の設定と構成
- <*構成>

### 連携ファイルの作成

※NEXTJSの場合は"REACT_APP"ではなく"NEXT_PUBLIC"にしないと駄目
※V8とV9で記載方法が異なるので注意

- 『.env.local』の作成

```code
REACT_APP_FIREBASE_APIKEY="<*構成>"
REACT_APP_FIREBASE_DOMAIN="<*構成>"
REACT_APP_FIREBASE_DATABASE="https://<*構成.projectId>.firebaseio.com"
REACT_APP_FIREBASE_PROJECT_ID="<*構成>"
REACT_APP_FIREBASE_STORAGE_BUCKET="<*構成>"
REACT_APP_FIREBASE_SENDER_ID="<*構成>"
REACT_APP_FIREBASE_APP_ID="<*構成>"
```

- 『firebase.ts』

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
```

### DBの作成

- [Firestore Database]
- [データベースの作成]
- <*テストモードで開始>
- [有効にする]
- [コレクションを開始]
  - コレクション:テーブル名
  - ドキュメントID:レコードキー
  - フィールド:カラム
  - 値：バリュー
- [ルール]
  - 1か月間誰でもアクセスできる様になっているため下記のように書き換える

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2022, 1, 16);
    }
  }
}
```

### 認証

- Firebaseの[uthentication]
- [始める]
- ログインプロバイダーを選択

### ストレージ（アバター画像など）

- Firebaseの[Storage]
- [始める]
- [完了]

### CRUDと認証へのアクセス等々

- ソース参照

### Deploy

- "npm run build"
- Firebaseの[hosting]
- [始める]
- Firebase CLI のインストール（すでに済なら飛ばす）
- プロジェクトの初期化
  - Google へのログイン
  - プロジェクトの開始
    - "hosting"の上
    - "Use an existing project"
    - データベースの選択
    - directory:"build"
    - "Configure ... yes"
    - "File ... no"
- Firebase Hostingへのデプロイ
  - urlが表示されるのでそこにアクセス
