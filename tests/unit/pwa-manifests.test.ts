import assert from 'node:assert/strict';
import test from 'node:test';
import {
  CONWAY_MANIFEST,
  FILM_GALLERY_MANIFEST,
  SITE_MANIFEST,
  createPwaManifestInjectionScript,
  pwaManifestForPath,
} from '../../pwa-manifests.ts';

test('route-specific apps receive their own manifests', () => {
  assert.deepEqual(pwaManifestForPath('/film-gallery'), FILM_GALLERY_MANIFEST);
  assert.deepEqual(pwaManifestForPath('/film-gallery/'), FILM_GALLERY_MANIFEST);
  assert.deepEqual(pwaManifestForPath('/Eden/film-gallery'), FILM_GALLERY_MANIFEST);
  assert.deepEqual(pwaManifestForPath('/conways-game-of-life'), CONWAY_MANIFEST);
});

test('the homepage and regular content routes use the Eden site manifest', () => {
  for (const route of ['/', '/notes', '/poker', '/life-os']) {
    assert.deepEqual(pwaManifestForPath(route), SITE_MANIFEST);
  }
});

test('the browser injection preserves an explicit base path', () => {
  const script = createPwaManifestInjectionScript('/Eden/');
  assert.match(script, /var b="\/Eden\/"/);
  assert.match(script, /film-gallery\.webmanifest/);
  assert.match(script, /conway\.webmanifest/);
  assert.match(script, /site\.webmanifest/);
});
