import 'pixi.js';

/**
 * Temporary declaration‑merging for the static `Application.create` helper
 * introduced in PIXI v8 (pending upstream type PR #1091).
 *
 * ⚠️  Remove this file once the official `@pixi/app` types expose `create`.
 */
declare module 'pixi.js' {
  // `Application` is a *class*.  By adding a namespace with the same name
  // we merge a static helper onto that constructor type.
  namespace Application {
    /** Shorthand factory – identical to `new PIXI.Application(...)` */
    function create(
      options?: Partial<import('pixi.js').IApplicationOptions>,
    ): import('pixi.js').Application;
  }
}
