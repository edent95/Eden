export type PwaManifestChoice = {
  file: string;
  icon: string;
  themeColor: string;
};

export const SITE_MANIFEST: PwaManifestChoice = {
  file: 'site.webmanifest',
  icon: 'eden-home-app-icon.svg',
  themeColor: '#1c1917',
};

export const FILM_GALLERY_MANIFEST: PwaManifestChoice = {
  file: 'film-gallery.webmanifest',
  icon: 'film-gallery-app-icon.svg',
  themeColor: '#171411',
};

export const CONWAY_MANIFEST: PwaManifestChoice = {
  file: 'conway.webmanifest',
  icon: 'conway-app-icon.svg',
  themeColor: '#176b87',
};

export function pwaManifestForPath(pathname: string): PwaManifestChoice {
  const normalized = `/${pathname.replace(/^\/+|\/+$/g, '')}`;
  if (normalized.endsWith('/film-gallery')) return FILM_GALLERY_MANIFEST;
  if (normalized.endsWith('/conways-game-of-life')) return CONWAY_MANIFEST;
  return SITE_MANIFEST;
}

export function createPwaManifestInjectionScript(base: string): string {
  const serializedBase = JSON.stringify(base);
  return `<script>(function(){var p=window.location.pathname.replace(/\\/+$/,'')||'/';var app=p.endsWith('/film-gallery')?{f:'film-gallery.webmanifest',i:'film-gallery-app-icon.svg',c:'#171411'}:p.endsWith('/conways-game-of-life')?{f:'conway.webmanifest',i:'conway-app-icon.svg',c:'#176b87'}:{f:'site.webmanifest',i:'eden-home-app-icon.svg',c:'#1c1917'};var b=${serializedBase};document.write('<link rel="manifest" href="'+b+app.f+'"><meta name="theme-color" content="'+app.c+'"><link rel="apple-touch-icon" href="'+b+app.i+'">');})();</script>`;
}
