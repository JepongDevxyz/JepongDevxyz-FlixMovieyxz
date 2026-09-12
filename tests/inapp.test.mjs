import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as app from '../app.js';

assert.ok(Array.isArray(app.LIVE_CHANNELS));
assert.ok(app.LIVE_CHANNELS.length >= 7, 'need at least 7 in-app live channels');
assert.ok(app.LIVE_CHANNELS.every(x => x.kind === 'live' && x.mode === 'embedded'), 'main live grid must contain only in-app live cards');
assert.ok(app.LIVE_CHANNELS.every(x => x.videoId || x.channelId), 'every live channel needs a direct YouTube embed target');

assert.ok(Array.isArray(app.MOVIES));
assert.ok(app.MOVIES.length >= 5, 'need at least 5 official full movies');
assert.ok(app.MOVIES.every(x => x.kind === 'movie' && x.provider === 'youtube' && x.videoId), 'movies must be direct official YouTube embeds');
assert.equal(new Set([...app.LIVE_CHANNELS, ...app.MOVIES].map(x => x.id)).size, app.LIVE_CHANNELS.length + app.MOVIES.length, 'ids must be unique');

assert.deepEqual(app.searchCatalog(app.MOVIES, 'nora aunor').map(x => x.id), ['himala-restored']);
assert.ok(app.searchCatalog(app.LIVE_CHANNELS, '24/7').some(x => x.id === 'untv-24-7'));
assert.deepEqual(app.filterCatalog({tab:'movies', query:'caregiver'}).map(x => x.id), ['caregiver']);
assert.ok(app.filterCatalog({tab:'live', query:'dzrh'}).some(x => x.id === 'dzrh-tv'));

for (const item of [...app.LIVE_CHANNELS, ...app.MOVIES]) {
  assert.equal(app.isAuthorizedItem(item), true, `${item.id} must have an authorized in-app source`);
  assert.match(app.buildEmbedUrl(item), /^https:\/\/www\.youtube\.com\/embed\//);
}

const source = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8').toLowerCase();
for (const blocked of ['moviepire', 'vidsrc', '2embed', '.m3u8', 'akamaized', "mode: 'external'", 'window.location', 'skipad', 'adblock']) {
  assert.equal(source.includes(blocked), false, `blocked redirect/restream/ad-bypass pattern must not appear: ${blocked}`);
}

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8').toLowerCase();
assert.ok(html.includes('data-tab="live"'));
assert.ok(html.includes('data-tab="movies"'));
assert.ok(html.includes('id="fullscreen"'));
assert.ok(html.includes('no redirect-only cards'));
assert.equal(html.includes('open official provider'), false);
assert.equal(html.includes('externalpanel'), false);

console.log(`In-app-only contract passed: ${app.LIVE_CHANNELS.length} live channels, ${app.MOVIES.length} official full movies`);
