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

## 設計課題と解決策

### 現在のwalls設計の問題
```typescript
// GameEngine.ts
private walls = new Set<string>();

// loadLevel関数
await loadLevel('/assets/level/level1.txt', this.app.stage, this.walls);
```

**問題点**:
- GameEngineがwallsの状態を管理
- loadLevelが外部のSetを変更（副作用）
- parseLevel結果との二重管理

### 改善案
```typescript
// loadLevel関数
const levelData = await loadLevel('/assets/level/level1.txt', this.app.stage);
this.walls = levelData.walls; // 直接代入

// または
const { walls, dots, powers } = await loadLevel(...);
this.walls = walls;
```

**利点**:
- 関数の副作用を削除
- データフローが明確
- parseLevel結果を直接活用

## 実装ステップ

### フェーズ1: LevelLoader基盤整備
- [x] LevelData型定義作成
- [x] parseLevel関数のテスト作成・実装
- [x] loadLevel関数の副作用削除（walls引数削除）
- [x] GameEngine側の呼び出し修正
- [x] バグ修正（dotが消えない問題）

### フェーズ2: 段階的分離（現在のフェーズ）
- [ ] LevelSpriteFactory のテスト作成 ← 現在ここ
- [ ] LevelSpriteFactory 実装
- [ ] loadLevel関数でLevelSpriteFactory活用（DRY違反解消）
- [ ] LevelAssetManager 分離
- [ ] loadLevel関数の最終リファクタリング

### フェーズ3: GameEngine分離
- [ ] CollisionDetector分離
- [ ] ScoreManager分離  
- [ ] InputHandler分離
- [ ] GameEngine簡素化

## テスト戦略

### PIXIモック戦略（完全モック）
```typescript
// __mocks__/pixi.js
export class Sprite {
  constructor(texture) {
    this.texture = texture;
    this.x = 0;
    this.y = 0;
    this.anchor = { set: vi.fn() };
    this.position = { set: vi.fn() };
  }
}

export class Container {
  constructor() {
    this.children = [];
    this.addChild = vi.fn();
  }
}
```

**利点**:
- テスト高速実行
- PIXIの複雑な初期化不要  
- ロジックに焦点、描画結果は対象外

## 現在の技術的課題

### loadLevel関数の責務過多
```typescript
// src/game/grid/LevelLoader.ts の現在の構造
export async function loadLevel() {
  // 10-12行目: アセット読み込み
  const wallTex = await Assets.load('/assets/images/wall.png');
  
  // 14-15行目: レベルデータ取得・解析
  const levelText = await (await fetch(file)).text();
  const levelData = parseLevel(levelText);
  
  // 21-46行目: Sprite作成（LevelSpriteFactory候補）
  levelData.walls.forEach(key => { /* wallスプライト作成 */ });
  levelData.dots.forEach(({ col, row }) => { /* dotスプライト作成 */ });
  levelData.powers.forEach(({ col, row }) => { /* powerスプライト作成 */ });
}
```

### LevelSpriteFactory分離計画
**抽出対象**: 21-46行目のSprite作成処理
```typescript
class LevelSpriteFactory {
  createSprites(levelData: LevelData, textures: LevelTextures, stage: Container): LevelSprites {
    const dots = new Set<Sprite>();
    const powers = new Set<Sprite>();
    
    // walls: 21-28行目の処理を移動
    levelData.walls.forEach(key => {
      const [col, row] = key.split(',').map(Number);
      const pixelPos = gridToPixel({ col, row });
      const sprite = new Sprite(textures.wall);
      sprite.anchor.set(0.5);
      sprite.position.set(pixelPos.x, pixelPos.y);
      stage.addChild(sprite);
    });
    
    // dots: 30-37行目の処理を移動
    // powers: 39-46行目の処理を移動
    
    return { walls: levelData.walls, dots, powers };
  }
}
```

**型定義**:
```typescript
interface LevelTextures {
  wall: PIXI.Texture;
  dot: PIXI.Texture;
  power: PIXI.Texture;
}

interface LevelSprites {
  walls: Set<string>;
  dots: Set<PIXI.Sprite>;
  powers: Set<PIXI.Sprite>;
}
```

## 進行状況
- [x] フェーズ1完了
- [ ] フェーズ2: LevelSpriteFactoryテスト作成中
- [ ] フェーズ3未着手