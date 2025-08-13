# リファクタリング 基本方針

## 現状の問題
- GameEngine.ts: PIXIアプリ管理 + ゲームロジック + 入力処理が混在
- LevelLoader.ts: レベル読込 + 解析 + Sprite作成 + Stage追加が混在

## 採用するアプローチ
**シンプルな分離** (過度な抽象化は避ける)

```
src/game/
├── level/
│   ├── LevelDataLoader.ts      # レベル文字列解析のみ
│   ├── LevelAssetManager.ts    # アセット読み込み管理
│   └── LevelSpriteFactory.ts   # Sprite作成 + Stage追加
├── logic/
│   ├── CollisionDetector.ts    # 衝突判定ロジック
│   ├── ScoreManager.ts         # スコア管理
│   └── InputHandler.ts         # 入力処理
├── engine/
│   ├── GameEngine.ts           # PIXIアプリ管理 + オーケストレーション
│   └── GameLoop.ts             # ゲームループ管理
└── entities/
    └── Player.ts               # 既存
```

## 学習目標
- SRP: 1クラス1責務
- テストファースト開発
- Command Query Separation
- 使用パターンに基づいた型設計

## 実装戦略

### テストファースト開発
- 最もシンプルなケースから始める
- 境界条件のテストケース
- 既存機能は残したまま段階的に移行

### PIXIモック戦略（完全モック）
```typescript
// __mocks__/pixi.js.ts 活用
export class Sprite {
  constructor(texture) {
    this.texture = texture;
    this.anchor = { set: vi.fn() };
    this.position = { set: vi.fn() };
  }
}
```

**利点**:
- テスト高速実行
- PIXIの複雑な初期化不要  
- ロジックに焦点、描画結果は対象外