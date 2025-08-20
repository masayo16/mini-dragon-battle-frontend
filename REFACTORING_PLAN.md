# リファクタリング計画

## フェーズ2: LevelSpriteFactory分離（🔄進行中 - ステップ4）

### 目標
- LevelLoaderからSprite生成ロジックを分離
- 依存注入を活用した疎結合な設計
- Composition Rootパターンの採用

### テストファースト開発ステップ

#### ステップ3: LevelAssetManager実装（✅完了 - 2025/08/20）

**3.1 LevelAssetManager基本実装**
- [x] LevelAssetManager.tsファイル作成
- [x] テクスチャ読み込みインターフェース設計（LevelTexturesインターフェース）
- [x] 基本的なloadTextures()メソッドの実装
- [x] テスト作成（TDD）

**3.2 PIXIアセット統合**
- [x] PIXI.Assets.load()の統合
- [x] async/await対応
- [x] テクスチャパス管理（wall.png, dot.png, power.png）

**3.3 基本エラーハンドリング**
- [x] 基本的な例外処理実装
- [ ] ファイル読み込み失敗時の詳細な例外処理（次フェーズ）
- [ ] 無効なテクスチャ検証の強化（次フェーズ）
- [ ] ログ出力機能（次フェーズ）

**3.4 基本キャッシュ機能**
- [x] 基本的なテクスチャ管理
- [ ] 高度なキャッシュ機能（次フェーズ）
- [ ] メモリ効率の最適化（次フェーズ）

#### ステップ4: level/ディレクトリ統合（🔄次のフェーズ）

**4.1 LevelSpriteFactory強化**
- [ ] LevelAssetManagerとの完全連携
- [ ] 詳細なエラーハンドリング追加（無効テクスチャ対応）
- [ ] パフォーマンステスト（大量データ処理）

**4.2 LevelDataLoader強化**
- [ ] 堅牢なエラーハンドリング（不正なレベルデータ）
- [ ] データバリデーション機能の実装
- [ ] ログ機能の追加

**4.3 レベル読み込み統合テスト**
- [ ] AssetManager + DataLoader + SpriteFactory の統合テスト
- [ ] エンドツーエンドテスト
- [ ] 実ゲームシナリオでの動作テスト

**4.4 新しいLevelLoader統合**
- [x] 新しいLevelLoader.ts実装（統合レベル読み込み）
- [ ] 既存GameEngineとの完全統合
- [ ] 旧LevelLoader削除後の動作確認

#### ステップ5: データ構造統一（walls型の一貫性）
- [ ] LevelData型の統一（walls: Set<string> → GridPos[]）
- [ ] Factory内でlookup用Set生成機能の実装
- [ ] 衝突判定への影響確認とテスト
- [ ] parseLevel関数の修正

#### ステップ6: 既存コードとの統合（テスト保護下）
- [ ] 既存LevelLoader機能のテストカバレッジ確認
- [ ] 新しいlevel/アーキテクチャへの移行
- [ ] 統合テスト実行と回帰テスト
- [ ] 最終的なクリーンアップ

### 採用する設計パターン

```
src/game/
├── level/
│   ├── LevelDataLoader.ts      # Level データ解析（純粋ロジック）
│   ├── LevelSpriteFactory.ts   # Sprite作成のみ
│   └── LevelAssetManager.ts    # テクスチャ読み込み・管理
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