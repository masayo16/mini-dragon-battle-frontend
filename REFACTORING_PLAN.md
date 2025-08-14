# リファクタリング計画（現在の作業）

## フェーズ2: LevelSpriteFactory実装 🚧

### 現在のタスク
- [ ] LevelSpriteFactory のテスト作成 ← **現在ここ**
- [ ] LevelSpriteFactory 実装  
- [ ] loadLevel関数でLevelSpriteFactory活用（DRY違反解消）
- [ ] LevelAssetManager 分離
- [ ] loadLevel関数の最終リファクタリング

### LevelSpriteFactory分離計画

**抽出対象**: `loadLevel`関数の21-46行目のSprite作成処理

**改善設計**: 単一責務（作成のみ）で配置は呼び出し側

```typescript
class LevelSpriteFactory {
  createSprites(levelData: LevelData, textures: LevelTextures): LevelSprites {
    const wallSprites: Sprite[] = [];
    const dotSprites: Sprite[] = [];
    const powerSprites: Sprite[] = [];
    
    // walls: 21-28行目の作成処理のみ移動（stage.addChild除く）
    levelData.walls.forEach(key => {
      const [col, row] = key.split(',').map(Number);
      const pixelPos = gridToPixel({ col, row });
      const sprite = new Sprite(textures.wall);
      sprite.anchor.set(0.5);
      sprite.position.set(pixelPos.x, pixelPos.y);
      wallSprites.push(sprite);
    });
    
    // dots: 30-37行目の作成処理のみ移動
    // powers: 39-46行目の作成処理のみ移動
    
    return { wallSprites, dotSprites, powerSprites };
  }
}

// 使用例（loadLevel内）
const sprites = factory.createSprites(levelData, textures);
sprites.wallSprites.forEach(sprite => stage.addChild(sprite));
const dots = new Set(sprites.dotSprites);
const powers = new Set(sprites.powerSprites);
```

### 型定義
```typescript
interface LevelTextures {
  wall: PIXI.Texture;
  dot: PIXI.Texture;
  power: PIXI.Texture;
}

interface LevelSprites {
  wallSprites: PIXI.Sprite[];
  dotSprites: PIXI.Sprite[];
  powerSprites: PIXI.Sprite[];
}
```

### シンプルDI方針（Composition Root）

**ねらい**: Factory の責務を「生成のみに限定」し、依存の組み立て（ロード・配置）は *Composition Root*（エントリポイントや呼び出し側）で行う。こうすることで責務境界と命名粒度のブレを防ぐ。

- Factory: **Sprite を作って返すだけ**（`createWall/Dot/Power` など小粒な Factory Method。`createAll` は薄いラッパ）
- Composition Root: **依存の注入と配線**（テクスチャの `Assets.load`、`stage.addChild`、レイヤ順や最適化方針）
- ドメイン/サービス層: Pixi など外部詳細を知らない（Clean Architecture の依存ルール）

#### 実装スケッチ
```ts
// composition-root.ts（例: 画面初期化時）
import { Assets } from 'pixi.js'
import { LevelSpriteFactory } from '~/game/level/LevelSpriteFactory'
import { loadLevelData } from '~/game/level/LevelDataLoader' // 解析のみ（Sprite非依存）

export async function boot(stage: PIXI.Container) {
  // 1) 依存をここで準備（ロード & 注入）
  const [wall, dot, power] = await Promise.all([
    Assets.load('/assets/images/wall.png'),
    Assets.load('/assets/images/dot.png'),
    Assets.load('/assets/images/power.png'),
  ])
  const factory = new LevelSpriteFactory()

  // 2) 構造データ（LevelData）を取得
  const levelData = await loadLevelData('/levels/level1.txt')

  // 3) 生成は Factory、配置は呼び出し側
  const sprites = factory.createSprites(levelData, { wall, dot, power })
  sprites.wallSprites.forEach(sp => stage.addChild(sp))
  sprites.dotSprites.forEach(sp => stage.addChild(sp))
  sprites.powerSprites.forEach(sp => stage.addChild(sp))
}
```

#### 設計上の根拠
- **Composition Root**: 依存の組み立てはアプリの入口に一箇所に集約する（Constructor Injection と対）。
- **Dependency Injection / Inversion**: 高水準は抽象に依存し、外部詳細は外側で差し替える。
- **Clean Architecture の依存ルール**: 依存は内向きのみ。ドメインがフレームワーク詳細を知らない。

> 参考:
> - Mark Seemann, *Composition Root*: アプリの入口でオブジェクトグラフを構成するという定義。
> - Martin Fowler, *Dependency Injection*: IoC/DI と Service Locator の対比・配線の考え方。
> - Robert C. Martin, *The Clean Architecture*: 依存ルール（内向き依存）。

### DIによる Factory の肥大化回避と境界の作成

**目的**: Factory の責務を「生成のみに限定」し、依存の注入と配線は Composition Root に集約することで、Factory の肥大化を防ぎ、テスト容易性と変更耐性を高める。

#### 責務境界（決めごと）
- **Factory**: Sprite を**作って返すだけ**。
  - **禁止**: `Assets.load` 等のリソースロード、`stage.addChild` 等の配置、レイヤ順制御、コンテナ生成/保持、シングルトン化やキャッシュ管理。
- **Composition Root（呼び出し側）**: 依存の組み立て（`Assets.load`、Stage/Container への追加、描画順・レイヤのポリシー、パフォーマンス最適化の選択）。
- **ドメイン/サービス層**: Pixi など UI/フレームワーク詳細を知らない（Clean Architecture の依存ルール）。

依存の流れ（概念図）:
```
LevelData ──▶ (Composition Root) ──calls──▶ LevelSpriteFactory ──returns──▶ Sprite[] ──▶ stage.addChild(...)
       (純データ)                       (依存組立)                    (生成のみ)                  (配置)
```

#### DI 方針（最小限の注入）
- **座標変換の注入**: `gridToPixel` を **関数**として注入して Factory を純粋ロジックに寄せる。
- **テクスチャの注入**: 現状は **メソッド引数**で渡す（Factory をステートレスに保つ）。
  - 将来、同一テクスチャで大量生成するホットパスがある場合のみ **コンストラクタ注入**へ切替可（ベンチで判断）。

```ts
// 境界インターフェース
export type GridToPixel = (cell: { col: number; row: number }) => { x: number; y: number };

export class LevelSpriteFactory {
  constructor(private readonly toPixel: GridToPixel) {}

  createWall(cell: { col: number; row: number }, textures: LevelTextures): PIXI.Sprite {
    const { x, y } = this.toPixel(cell);
    const sp = new PIXI.Sprite(textures.wall);
    sp.anchor.set(0.5);
    sp.position.set(x, y);
    return sp;
  }

  createDot(cell: { col: number; row: number }, textures: LevelTextures): PIXI.Sprite {
    const { x, y } = this.toPixel(cell);
    const sp = new PIXI.Sprite(textures.dot);
    sp.anchor.set(0.5);
    sp.position.set(x, y);
    return sp;
  }

  createPower(cell: { col: number; row: number }, textures: LevelTextures): PIXI.Sprite {
    const { x, y } = this.toPixel(cell);
    const sp = new PIXI.Sprite(textures.power);
    sp.anchor.set(0.5);
    sp.position.set(x, y);
    return sp;
  }

  // 薄いラッパ: 既存の loadLevel から置き換えやすい形
  createSprites(levelData: LevelData, textures: LevelTextures): LevelSprites {
    const wallSprites = levelData.walls.map((key) => {
      const [col, row] = key.split(',').map(Number);
      return this.createWall({ col, row }, textures);
    });
    const dotSprites = levelData.dots.map((key) => {
      const [col, row] = key.split(',').map(Number);
      return this.createDot({ col, row }, textures);
    });
    const powerSprites = levelData.powers.map((key) => {
      const [col, row] = key.split(',').map(Number);
      return this.createPower({ col, row }, textures);
    });
    return { wallSprites, dotSprites, powerSprites };
  }
}
```

#### 命名規約
- メソッド: `createWall` / `createDot` / `createPower` / `createSprites`（ラッパ）。
- 型: `LevelTextures`, `LevelSprites`, `GridToPixel`。略語は避け、**役割が一読で分かる**名称にする。

#### テスト戦略（Vitest の着眼点）
- **副作用なし**: Factory は Stage を受け取らないため `stage.addChild` を呼び得ない設計であることを確認。
- **配置の正しさ**: `GridToPixel` をフェイク実装で注入し、返される `Sprite.position` が期待座標になることを検証。
- **生成数の整合**: `createSprites` が `LevelData` の要素数と同数の `Sprite` を返すこと。
- **入力不変**: `LevelData` や `LevelTextures` を破壊的に変更しないこと。

```ts
import { describe, it, expect } from 'vitest';

const fakeToPixel: GridToPixel = ({ col, row }) => ({ x: col * 16, y: row * 16 });

describe('LevelSpriteFactory', () => {
  it('createWall: 正しい座標・アンカーで生成し副作用がない', () => {
    const factory = new LevelSpriteFactory(fakeToPixel);
    const textures: LevelTextures = { wall: wallTex, dot: dotTex, power: powerTex };
    const sp = factory.createWall({ col: 1, row: 2 }, textures);
    expect(sp.anchor.x).toBe(0.5);
    expect(sp.anchor.y).toBe(0.5);
    expect(sp.position.x).toBe(16);
    expect(sp.position.y).toBe(32);
  });
});
```

#### ガードレール（チェックリスト）
- [ ] Factory 内で `Assets`, `Container`, `stage` を import/参照していない。
- [ ] Factory は（必要最小限を除き）**状態を保持しない**。
- [ ] メソッドは **Sprite の生成以外の副作用がない**。
- [ ] 依存は **抽象（関数/インターフェース）で受ける**。

#### マイグレーション手順（フェーズ2補助タスク）
- [ ] `gridToPixel` を関数としてエクスポートし、`LevelSpriteFactory` のコンストラクタ引数にする。
- [ ] `loadLevel` から Sprite 生成ロジックを Factory へ委譲（配置は呼び出し側に残す）。
- [ ] `createSprites` を暫定的に利用し、将来 `createWall/Dot/Power` を直接使う箇所へ段階的に置換。
- [ ] 既存テストを `Factory`/`Composition Root` の責務境界に沿って再配置（UI配置は統合テストで担保）。

#### 将来の拡張メモ
- プール導入時も **取得/返却は Composition Root** に置き、Factory は「生成 API」インターフェースのみを維持する。
- 複数レベル/テーマ対応は `LevelTextures` を引数で差し替え、Factory の実装は據え置き。