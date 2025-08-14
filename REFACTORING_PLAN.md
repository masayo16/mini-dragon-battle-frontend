# リファクタリング計画

## フェーズ2: LevelSpriteFactory分離（🔄進行中）

### 目標
- LevelLoaderからSprite生成ロジックを分離
- 依存注入を活用した疎結合な設計
- Composition Rootパターンの採用

### 段階的なステップ

#### ステップ1: LevelSpriteFactory基盤作成（✅完了）
- [x] `src/game/level/LevelSpriteFactory.ts`作成
- [x] 基本的な型定義とインターフェース定義

#### ステップ2: テクスチャ管理設計（🔄次のタスク）
- [ ] LevelTextures型の詳細設計
- [ ] PIXIテクスチャのロード戦略決定
- [ ] アセット管理のパターン策定

#### ステップ3: Factory実装
- [ ] createWallSprite実装
- [ ] createDotSprite実装  
- [ ] createPowerSprite実装
- [ ] 単体テスト作成

#### ステップ4: Composition Root実装
- [ ] `src/game/composition/Boot.ts`作成
- [ ] 依存注入設定
- [ ] Stage追加ロジック移植

#### ステップ5: 既存コード統合
- [ ] LevelLoaderからSprite生成コード削除
- [ ] GameEngineの呼び出し修正
- [ ]統合テスト実行

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

**設計原則**:
- Factory は Sprite 作成のみに限定
- Stage追加やアセットロードは Composition Root に集約
- 依存注入による疎結合化