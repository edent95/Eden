import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { INDEXNOW_KEY, parseSitemap, selectUrls, klDate } from '../../scripts/seo/indexnow.mjs';

test('public key file matches the IndexNow key', () => {
  assert.match(INDEXNOW_KEY, /^[a-f0-9]{32}$/);
  assert.equal(readFileSync(`public/${INDEXNOW_KEY}.txt`, 'utf8').trim(), INDEXNOW_KEY);
});

test('selects recently modified sitemap URLs, or all with --all', () => {
  const xml = `<urlset>
    <url><loc>https://eden-tan.com/</loc><lastmod>2026-11-10</lastmod></url>
    <url><loc>https://eden-tan.com/zh/</loc><lastmod>2026-11-10</lastmod></url>
    <url><loc>https://eden-tan.com/old/</loc><lastmod>2026-08-01</lastmod></url>
  </urlset>`;
  const entries = parseSitemap(xml);
  assert.equal(entries.length, 3);
  assert.deepEqual(selectUrls(entries, { since: '2026-11-07' }), ['https://eden-tan.com/', 'https://eden-tan.com/zh/']);
  assert.equal(selectUrls(entries, { all: true }).length, 3);
});

test('klDate uses Kuala Lumpur calendar days', () => {
  // 2026-11-09 17:00 UTC is already 2026-11-10 01:00 in KL.
  assert.equal(klDate(new Date('2026-11-09T17:00:00Z')), '2026-11-10');
  assert.equal(klDate(new Date('2026-11-09T17:00:00Z'), 3), '2026-11-07');
});
