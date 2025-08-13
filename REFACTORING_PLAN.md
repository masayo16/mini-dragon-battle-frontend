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

### 型定義
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

## フェーズ3: GameEngine分離 ⏳

### 予定作業
- [ ] CollisionDetector分離
- [ ] ScoreManager分離  
- [ ] InputHandler分離
- [ ] GameEngine簡素化

---

**参照**: 基本方針は `REFACTORING_BASICS.md`、完了履歴は `REFACTORING_ARCHIVE.md`