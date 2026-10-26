import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

// Runs the real GA4 loader from index.html in a sandbox, so the host gate and the
// ?notrack owner opt-out are tested exactly as they ship.
const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
const loader = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1])
  .find((body) => body.includes('eden_ga_opt_out'));

type Run = {
  appended: string[];
  dataLayer: unknown[] | undefined;
  disabled: boolean;
  storage: Map<string, string>;
  replacedUrl: string | undefined;
};

const runLoader = (url: string, stored: Record<string, string> = {}): Run => {
  assert.ok(loader, 'GA4 loader script not found in index.html');
  const parsed = new URL(url);
  const storage = new Map(Object.entries(stored));
  const appended: string[] = [];
  let replacedUrl: string | undefined;
  const window: Record<string, unknown> = {
    location: { hostname: parsed.hostname, search: parsed.search, pathname: parsed.pathname, hash: parsed.hash },
    localStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => void storage.set(key, value),
      removeItem: (key: string) => void storage.delete(key),
    },
    history: { state: null, replaceState: (_state: unknown, _title: string, next: string) => { replacedUrl = next; } },
  };
  const document = {
    createElement: () => ({ async: false, src: '' }),
    head: { appendChild: (node: { src: string }) => appended.push(node.src) },
  };
  vm.runInNewContext(loader, { window, document, URLSearchParams, Date });
  return {
    appended,
    dataLayer: window.dataLayer as unknown[] | undefined,
    disabled: window['ga-disable-G-6QXR6LQ83T'] === true,
    storage,
    replacedUrl,
  };
};

test('eden-tan.com 正常访问会加载 gtag 并 config', () => {
  const run = runLoader('https://eden-tan.com/project/');
  assert.deepEqual(run.appended, ['https://www.googletagmanager.com/gtag/js?id=G-6QXR6LQ83T']);
  assert.equal(run.dataLayer?.length, 2);
});

test('本机开发、预览、github.io 一律不发数据', () => {
  for (const url of ['http://localhost:4180/', 'http://127.0.0.1:5199/', 'https://edent95.github.io/Eden/']) {
    const run = runLoader(url);
    assert.equal(run.appended.length, 0, url);
    assert.equal(run.dataLayer, undefined, url);
  }
});

test('?notrack=1 记住这台设备、不加载 gtag,并从网址里拿掉参数', () => {
  const run = runLoader('https://eden-tan.com/?notrack=1&lang=zh#top');
  assert.equal(run.storage.get('eden_ga_opt_out'), '1');
  assert.equal(run.appended.length, 0);
  assert.equal(run.disabled, true);
  assert.equal(run.replacedUrl, '/?lang=zh#top');
});

test('记住过的设备之后都不发数据;?notrack=0 恢复', () => {
  const opted = runLoader('https://www.eden-tan.com/notes/', { eden_ga_opt_out: '1' });
  assert.equal(opted.appended.length, 0);
  assert.equal(opted.disabled, true);

  const restored = runLoader('https://eden-tan.com/?notrack=0', { eden_ga_opt_out: '1' });
  assert.equal(restored.storage.has('eden_ga_opt_out'), false);
  assert.equal(restored.appended.length, 1);
  assert.equal(restored.replacedUrl, '/');
});
