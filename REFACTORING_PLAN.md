# リファクタリング計画

## フェーズ2: LevelSpriteFactory分離（🔄進行中 - ステップ4）

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

**タスク**:
- [ ] InputHandler.ts のTDD作成（キーボード処理分離）
- [ ] CollisionDetector.ts のTDD作成（アイテム取得ロジック分離）
- [ ] GameLoop.ts のTDD作成（ticker管理分離）
- [ ] GameEngine.ts をオーケストレーターに変更

#### ステップ6: 既存コードとの統合（テスト保護下）
- [ ] 既存LevelLoader機能のテストカバレッジ確認
- [ ] 新しいlevel/アーキテクチャへの移行
- [ ] 統合テスト実行と回帰テスト
- [ ] 最終的なクリーンアップ

### 採用する設計パターン

**最終構造** (REFACTORING_BASICS.md準拠):
```
src/game/
├── level/
│   ├── LevelDataLoader.ts      # Level データ解析（純粋ロジック）
│   ├── LevelSpriteFactory.ts   # Sprite作成のみ
│   └── LevelAssetManager.ts    # テクスチャ読み込み・管理
├── composition/
│   └── Boot.ts                 # 依存注入と Stage への追加
└── entities/
    └── Player.ts               # 既存
```

**TDD原則**: Red → Green → Refactor サイクル厳守