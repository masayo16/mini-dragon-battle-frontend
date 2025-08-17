# リファクタリング計画

## フェーズ2: LevelSpriteFactory分離（🔄進行中 - ステップ3）

### 目標
- LevelLoaderからSprite生成ロジックを分離
- 依存注入を活用した疎結合な設計
- Composition Rootパターンの採用

### テストファースト開発ステップ

#### ステップ1: 最小テスト作成（✅完了）
- [x] テストファイル`LevelSpriteFactory.spec.ts`基盤作成
- [x] 空データテストの実装完了（最小実装のベース）
- [x] 壁1つ作成テストの実装
- [x] ドット1つ作成テストの実装
- [x] パワー1つ作成テストの実装
- [x] テストを通す最小実装

#### ステップ2: 基本機能のTDD（✅完了）
- [x] **Red**: 壁Sprite作成テスト（失敗）
- [x] **Green**: createWallSprite最小実装
- [x] **Refactor**: 壁作成ロジックの改善
- [x] **Red**: ドットSprite作成テスト（失敗）
- [x] **Green**: createDotSprite最小実装
- [x] **Refactor**: ドット作成ロジックの改善
- [x] **Red**: パワーSprite作成テスト（失敗）
- [x] **Green**: createPowerSprite最小実装
- [x] **Refactor**: パワー作成ロジックの改善

#### ステップ3: インターフェース設計の検証（🔄進行中）
- [x] 複数要素テスト（壁+ドット+パワー）
- [x] toContainEqual()を使った深い等価性テスト実装
- [ ] エラーケーステスト（不正なテクスチャ）
- [ ] パフォーマンステスト（大量データ）
- [x] LevelTextures型の最終確定

#### ステップ4: 統合テスト準備
- [ ] モックテクスチャ作成ヘルパー
- [ ] テストデータファクトリー作成
- [ ] LevelLoaderとの統合テスト設計

#### ステップ5: データ構造統一（walls型の一貫性）
- [ ] LevelData型の統一（walls: Set<string> → GridPos[]）
- [ ] Factory内でlookup用Set生成機能の実装
- [ ] 衝突判定への影響確認とテスト
- [ ] parseLevel関数の修正

#### ステップ6: 既存コードとの統合（テスト保護下）
- [ ] 既存LevelLoader機能のテストカバレッジ確認
- [ ] Factory導入によるリファクタリング
- [ ] 統合テスト実行と回帰テスト
- [ ] 最終的なクリーンアップ

### 採用する設計パターン

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

### テストファースト設計原則

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

### データ構造統一の設計方針

**現在の問題**:
```typescript
// 一貫性がない
walls: Set<string>    // "col,row" 形式
dots: GridPos[]       // {col, row} 形式
powers: GridPos[]     // {col, row} 形式
```

**統一後の設計**:
```typescript
// 全て GridPos[] に統一
walls: GridPos[]
dots: GridPos[]  
powers: GridPos[]

// Factory内で高速lookup用Setを必要に応じて生成
class LevelSpriteFactory {
  private createLookupSet(positions: GridPos[]): Set<string> {
    return new Set(positions.map(pos => `${pos.col},${pos.row}`));
  }
}
```

**利点**:
- 型安全性の向上
- データ構造の一貫性
- 必要な場面でのみlookup Setを生成（効率性と柔軟性の両立）