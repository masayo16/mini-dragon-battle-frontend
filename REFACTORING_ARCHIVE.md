# リファクタリング アーカイブ

## フェーズ1: LevelLoader基盤整備（✅完了）

### 完了した作業
- [x] LevelData型定義作成
- [x] parseLevel関数のテスト作成・実装
- [x] loadLevel関数の副作用削除（walls引数削除）
- [x] GameEngine側の呼び出し修正
- [x] バグ修正（dotが消えない問題）

### 解決した設計課題

#### walls設計の問題と解決
**Before**:
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

**After（解決済み）**:
```typescript
// loadLevel関数
const { walls, dots, powers } = await loadLevel('/assets/level/level1.txt', this.app.stage);
this.walls = walls; // 直接代入
```

**利点**:
- 関数の副作用を削除
- データフローが明確  
- parseLevel結果を直接活用

### 実装した型定義
```typescript
export type LevelData = {
  walls: Set<string>; // NOTE: "col,row" 高速lookup用
  dots: GridPos[];    // NOTE: 順次処理用
  powers: GridPos[];
};
```

### テストファースト開発の実績
parseLevel関数の段階的実装:
1. 空文字列テスト → 基本構造実装
2. 単一壁("#")テスト → walls Set実装
3. 複数要素テスト → dots/powers 配列実装
4. 境界条件テスト → エラーハンドリング

この手法により、**確実に動作する最小実装**から始めて段階的に機能を拡張できた。

## フェーズ2: LevelSpriteFactory分離

### ✅ ステップ1: 最小テスト作成（完了）
**達成した成果:**
- [x] テストファイル`LevelSpriteFactory.spec.ts`基盤作成
- [x] 空データテストの実装完了（最小実装のベース）
- [x] 壁1つ作成テストの実装
- [x] ドット1つ作成テストの実装
- [x] パワー1つ作成テストの実装
- [x] テストを通す最小実装

**解決した課題:**
- テストファーストアプローチの基盤構築
- 最小動作の保証
- 各要素の基本的なSprite生成機能の確立

### ✅ ステップ2: 基本機能のTDD（完了）
**達成した成果:**
- [x] **Red**: 壁Sprite作成テスト（失敗）
- [x] **Green**: createWallSprite最小実装
- [x] **Refactor**: 壁作成ロジックの改善
- [x] **Red**: ドットSprite作成テスト（失敗）
- [x] **Green**: createDotSprite最小実装
- [x] **Refactor**: ドット作成ロジックの改善
- [x] **Red**: パワーSprite作成テスト（失敗）
- [x] **Green**: createPowerSprite最小実装
- [x] **Refactor**: パワー作成ロジックの改善

**解決した課題:**
- Red-Green-Refactorサイクルの実践
- 各ゲーム要素の基本的なSprite作成機能
- テストドリブンな品質保証の実現
- コードの段階的な改善とリファクタリング

### 実装したファクトリーパターン
```typescript
export class LevelSpriteFactory {
  createSprites(levelData: LevelData): Container {
    const container = new Container();
    
    levelData.walls.forEach(wall => {
      const sprite = this.createWallSprite(wall);
      container.addChild(sprite);
    });
    
    // dots, powers も同様に実装
    return container;
  }
}
```

### 採用した設計パターン

#### Composition Rootパターン
```
src/game/
├── level/
│   ├── LevelDataLoader.ts      # Level データ解析（純粋ロジック）
│   └── LevelSpriteFactory.ts   # Sprite作成のみ
├── composition/
│   └── Boot.ts                 # 依存注入とStage追加（Composition Root）
└── entities/
    ├── Player.ts
    └── Enemy.ts
```

#### テストファースト設計原則の実践

1. **最小実装から開始**
   - 空データテスト → 基本構造実装
   - 単一要素テスト → 個別機能実装
   - 複数要素テスト → 統合機能実装

2. **Red-Green-Refactor サイクル**
   - Red: 失敗するテストを書く
   - Green: テストを通す最小実装
   - Refactor: 品質向上とコード改善

3. **責任の分離**
   - Factory: Sprite作成のみ（Stage操作なし）
   - Composition Root: 依存注入とStage管理
   - テスト: 各責任を独立してテスト

4. **段階的複雑化**
   - 単純なケースから複雑なケースへ
   - エラーケースは基本機能実装後
   - パフォーマンステストは最後