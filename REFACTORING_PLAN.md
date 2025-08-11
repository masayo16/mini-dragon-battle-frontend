# リファクタリング計画

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

## 具体的な責務分担

### LevelDataLoader.ts
```typescript
export function parseLevel(levelText: string): LevelData
export async function fetchLevel(file: string): Promise<string>
```

### LevelAssetManager.ts
```typescript
export class LevelAssetManager {
  async loadTextures(): Promise<LevelTextures>
}
```

### CollisionDetector.ts
```typescript
export class CollisionDetector {
  checkPickups(player, items, radius): PickupResult[]
}
```

## 型定義
```typescript
export type LevelData = {
  walls: Set<string>; // NOTE: "row,col" 高速lookup用
  dots: GridPos[];    // NOTE: 順次処理用
  powers: GridPos[];
};
```

## 学習目標
- SRP: 1クラス1責務
- テストファースト開発
- Command Query Separation
- 使用パターンに基づいた型設計

## 実装戦略

### テストファースト開発
- 最もシンプルなケースから始める (`parseLevel("#")`)
- 境界条件のテストケース (空文字列、未知文字)
- 既存機能は残したまま段階的に移行

### 移行手順
1. LevelData型定義作成
2. parseLevel関数のテスト作成
3. parseLevel関数実装
4. 既存loadLevel関数をparseLevel + createSpritesに分離
5. CollisionDetector分離
6. ScoreManager分離
7. InputHandler分離
8. GameEngine簡素化

## 進行状況
- [x] 問題分析完了
- [x] アプローチ決定  
- [x] 詳細なファイル構成設計
- [x] LevelData型定義作成 (src/game/grid/LevelLoader.ts:5-9)
- [ ] parseLevel関数のテスト作成 ← 現在ここ
- [ ] parseLevel関数実装
- [ ] 既存機能の段階的分離
- [ ] 動作確認とテスト