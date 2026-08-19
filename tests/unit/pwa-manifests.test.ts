import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  CONWAY_MANIFEST,
  FILM_GALLERY_MANIFEST,
  SITE_MANIFEST,
  createPwaManifestInjectionScript,
  pwaManifestForPath,
} from '../../pwa-manifests.ts';

const readPublicManifest = (filename: string) =>
  JSON.parse(readFileSync(new URL(`../../public/${filename}`, import.meta.url), 'utf8'));

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

test('route-specific PWA scopes cannot claim the homepage', () => {
  const siteManifest = readPublicManifest('site.webmanifest');
  const conwayManifest = readPublicManifest('conway.webmanifest');
  const filmManifest = readPublicManifest('film-gallery.webmanifest');

  assert.equal(siteManifest.scope, './');
  assert.equal(siteManifest.icons[0].src, './eden-home-app-icon.svg');
  assert.equal(conwayManifest.scope, './conways-game-of-life/');
  assert.equal(filmManifest.scope, './film-gallery/');
  assert.notEqual(siteManifest.icons[0].src, conwayManifest.icons[0].src);
});

test('the browser injection preserves an explicit base path', () => {
  const script = createPwaManifestInjectionScript('/Eden/');
  assert.match(script, /var b="\/Eden\/"/);
  assert.match(script, /film-gallery\.webmanifest/);
  assert.match(script, /conway\.webmanifest/);
  assert.match(script, /site\.webmanifest/);
  assert.match(script, /eden-home-app-icon\.svg/);
});
