# リファクタリング 基本方針

## 現状の問題

### GameEngine.ts の責務の混在
`src/game/engine/GameEngine.ts:27-117` では以下の複数の責務が一つのクラスに集約されている：

1. **PIXIアプリ管理** (42-50行): アプリケーション初期化とCanvas管理
2. **レベル初期化** (52-64行): loadLevel呼び出し、プレイヤー配置
3. **入力処理** (81-90行): キーボードイベントハンドリング  
4. **ゲームループ管理** (92-98行): ticker管理と更新処理
5. **衝突判定ロジック** (100-116行): アイテム取得とスコア更新
6. **状態管理** (30-35行): walls, dots, powers の Set 管理

**問題点**:
- 単一責任原則 (SRP) に違反
- テストが困難（PIXI依存が全体に波及）
- 機能追加時に影響範囲が予測困難

### LevelLoader.ts の責務の混在  
`src/game/grid/LevelLoader.ts:6-49` では以下が一つの関数に混在：

1. **アセット読み込み** (10-12行): テクスチャファイル読み込み
2. **レベルデータ解析** (14-15行): テキストファイル取得と解析
3. **Sprite作成** (21-46行): 各要素のSprite生成と設定
4. **Stage配置** (27,35,44行): `stage.addChild()` による配置
5. **戻り値の構築** (17-19行, 48行): 複数の型の Set を返却

**問題点**:
- 関数が長すぎる（49行）
- async処理とSprite生成が同一関数内
- テストでモック化が複雑（Assets, fetch, stage を全てモック必要）
- Stage への副作用が関数内に隠れている

## 採用するアプローチ
**シンプルな分離** (過度な抽象化は避ける)

```
src/game/
├── level/
│   ├── LevelDataLoader.ts      # レベル文字列解析のみ
│   ├── LevelAssetManager.ts    # アセット読み込み管理
│   └── LevelSpriteFactory.ts   # Sprite作成のみ（Stage追加は Composition Root/呼び出し側）
├── logic/
│   ├── CollisionDetector.ts    # 衝突判定ロジック
│   ├── ScoreManager.ts         # スコア管理
│   └── InputHandler.ts         # 入力処理
├── engine/
│   ├── GameEngine.ts           # PIXIアプリ管理 + オーケストレーション
│   └── GameLoop.ts             # ゲームループ管理
├── composition/
│   └── Boot.ts                 # 依存注入と Stage への追加（Composition Root）
└── entities/
    └── Player.ts               # 既存
```

**備考**: Factory は Sprite 作成のみに限定し、配置（`stage.addChild`）やアセットロードは `composition/Boot.ts`（Composition Root）に集約する。

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