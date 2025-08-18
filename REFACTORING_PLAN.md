# リファクタリング計画

> **記載方針**: 現在のタスク + 2ステップ先まで記載し、具体的な作業に集中する

## 現在のタスク

### LevelAssetManager分離（🔄進行中）

**目標**: 
- LevelLoader.tsからアセット読み込み責務を分離
- 依存注入を活用した疎結合な設計  
- Composition Rootパターンの採用

**優先タスク**:
- [ ] LevelAssetManager.ts のTDD作成
- [ ] テクスチャ読み込み責務の分離  
- [ ] エラーハンドリング（読み込み失敗）

## ステップ1: LevelSpriteFactory統合

- [ ] Boot.ts（Composition Root）作成
- [ ] LevelLoader.ts 完全削除
- [ ] GameEngine.ts の統合テスト

## ステップ2: GameEngine責務分離

**目標**: GameEngine.tsから入力処理・衝突判定・ゲームループを分離

**タスク**:
- [ ] InputHandler.ts のTDD作成（キーボード処理分離）
- [ ] CollisionDetector.ts のTDD作成（アイテム取得ロジック分離）
- [ ] GameLoop.ts のTDD作成（ticker管理分離）
- [ ] GameEngine.ts をオーケストレーターに変更

## 設計方針

**最終構造** (REFACTORING_BASICS.md準拠):
```
src/game/
├── level/
│   ├── LevelDataLoader.ts      # レベル文字列解析のみ
│   ├── LevelAssetManager.ts    # アセット読み込み管理  
│   └── LevelSpriteFactory.ts   # Sprite作成のみ
├── logic/
│   ├── CollisionDetector.ts    # 衝突判定ロジック
│   └── InputHandler.ts         # 入力処理
├── engine/
│   ├── GameEngine.ts           # PIXIアプリ管理 + オーケストレーション
│   └── GameLoop.ts             # ゲームループ管理
├── composition/
│   └── Boot.ts                 # 依存注入と Stage への追加
└── entities/
    └── Player.ts               # 既存
```

**TDD原則**: Red → Green → Refactor サイクル厳守