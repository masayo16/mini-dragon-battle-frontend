# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Linting
pnpm lint
pnpm lint:fix

# Testing
pnpm test
```

## Architecture Overview

This is a Nuxt 3 application for a Mini Dragon Battle game frontend with the following key technologies:

- **Framework**: Nuxt 3 with TypeScript, Vue 3 Composition API
- **Styling**: Tailwind CSS v4 with custom utility classes
- **Game Engine**: PIXI.js for 2D graphics and game rendering
- **State Management**: Pinia stores
- **Authentication**: Firebase Auth with Google OAuth
- **Testing**: Vitest for unit tests, Playwright for e2e

### Project Structure

```
src/
├── pages/           # Nuxt auto-routed pages (index, login, play)
├── components/      # Reusable Vue components
├── composables/     # Vue composables (useGame, useGoogleAuth)
├── game/           # Game-specific logic (entities, grid system)
├── stores/         # Pinia stores for state management
├── assets/         # Static assets (images, CSS, levels)
├── middleware/     # Route middleware (auth.global.ts)
└── plugins/        # Nuxt plugins (Firebase client)
```

### Game Architecture

- **Grid System**: `game/grid/Grid.ts` - Handles game world coordinate system and collision detection
- **Level Loading**: `game/grid/LevelLoadar.ts` - Loads level data from text files
- **Entities**: `game/entities/Player.ts` - Game entity classes with PIXI.js integration
- **Game Loop**: Managed through `composables/useGame.ts`

### Authentication Flow

1. Firebase is initialized client-side via `plugins/firebase.client.ts`
2. Google Auth is handled through `composables/useGoogleAuth.ts` 
3. Auth middleware `middleware/auth.global.ts` protects routes
4. Loading states managed via `stores/loading.ts`

### UI Components

- Custom Tailwind utilities defined in `assets/css/tailwind.css`
- `.btn-primary` class for consistent button styling
- `LoadingIndicator.vue` for async operation feedback

### Testing Setup

- Unit tests for game logic in `tests/unit/game/`
- Nuxt-specific tests in `tests/nuxt/`
- Mocks for Firebase and PIXI.js in `__mocks__/` and `tests/mocks/`