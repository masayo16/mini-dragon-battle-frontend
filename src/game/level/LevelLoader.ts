import type { Container, Sprite } from 'pixi.js';
import { LevelAssetManager } from './LevelAssetManager';
import { LevelSpriteFactory } from './LevelSpriteFactory';
import { parseLevel } from './LevelDataLoader';

export async function loadLevel(
  file: string,
  stage: Container,
): Promise<{ walls: Set<string>; dots: Set<Sprite>; powers: Set<Sprite> }> {
  // 1. LevelAssetManagerでテクスチャ読み込み
  const assetManager = new LevelAssetManager();
  const textures = await assetManager.loadTextures();
  
  // 2. LevelDataLoaderでレベルデータ解析
  const levelText = await (await fetch(file)).text();
  const levelData = parseLevel(levelText);
  
  // 3. LevelSpriteFactoryでSprite作成
  const factory = new LevelSpriteFactory();
  const sprites = factory.createSprites(levelData, textures);
  
  // 4. StageにSprite追加（zIndexで描画順序を制御）
  sprites.walls.forEach(sprite => {
    sprite.zIndex = 0; // NOTE: 壁は最背面
    stage.addChild(sprite);
  });
  sprites.dots.forEach(sprite => {
    sprite.zIndex = 10; // NOTE: ドットは敵キャラより下
    stage.addChild(sprite);
  });
  sprites.powers.forEach(sprite => {
    sprite.zIndex = 10; // NOTE: パワーアップも敵キャラより下
    stage.addChild(sprite);
  });
  
  return { 
    walls: levelData.walls, 
    dots: sprites.dots, 
    powers: sprites.powers 
  };
}