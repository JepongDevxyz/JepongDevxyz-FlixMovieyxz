import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as app from '../app.js';

assert.equal('MOVIES' in app, false, 'separate movie catalog must stay removed');
assert.ok(Array.isArray(app.LIVE_CHANNELS), 'LIVE_CHANNELS must be an array');
assert.equal(app.LIVE_CHANNELS.length, 10, 'expanded channel catalog should have 10 entries');
assert.ok(app.LIVE_CHANNELS.every(channel => channel.kind === 'live'), 'every catalog item must be a channel/provider card');
assert.equal(new Set(app.LIVE_CHANNELS.map(channel => channel.id)).size, app.LIVE_CHANNELS.length, 'channel ids must be unique');

const requiredIds = ['cinema-one','cinemo','jeepney-tv','knowledge-channel','anc'];
for (const id of requiredIds) assert.ok(app.LIVE_CHANNELS.some(channel => channel.id === id), `missing ${id}`);
assert.ok(app.LIVE_CHANNELS.filter(channel => channel.category === 'movies').length >= 2, 'must include movie-focused channels');
assert.ok(app.searchChannels(app.LIVE_CHANNELS, 'cinema').some(channel => channel.id === 'cinema-one'));
assert.ok(app.searchChannels(app.LIVE_CHANNELS, 'movies').some(channel => channel.id === 'cinemo'));
assert.ok(app.searchChannels(app.LIVE_CHANNELS, 'knowledge').some(channel => channel.id === 'knowledge-channel'));
assert.ok(app.searchChannels(app.LIVE_CHANNELS, 'anc').some(channel => channel.id === 'anc'));

for (const channel of app.LIVE_CHANNELS) {
  assert.equal(app.isAuthorizedChannel(channel), true, `${channel.id} must use an approved official source`);
  assert.match(app.buildOfficialUrl(channel), /^https:\/\//);
  if (channel.mode === 'embedded') {
    assert.match(app.buildLiveEmbedUrl(channel), /^https:\/\/www\.youtube\.com\/embed\/live_stream\?channel=/);
  } else {
    assert.equal(app.buildLiveEmbedUrl(channel), null, `${channel.id} should not pretend to have a public embed`);
  }
}

const source = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
for (const blocked of ['moviepire', 'vidsrc', '2embed', 'workers.dev', '.m3u8', 'akamaized', 'skipads', 'skip-ad', 'adblock', 'contentWindow']) {
  assert.equal(source.toLowerCase().includes(blocked.toLowerCase()), false, `blocked/restream/ad-bypass integration must not appear: ${blocked}`);
}
assert.ok(source.includes('requestFullscreen'), 'fullscreen must use the browser Fullscreen API');

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8').toLowerCase();
assert.ok(html.includes('philippine tv & movies'), 'expanded hero must be present');
assert.ok(html.includes('search live channels'), 'channel search must be present');
assert.ok(html.includes('id="fullscreen"'), 'fullscreen control must exist');
assert.ok(html.includes('cinema one'), 'Cinema One must be visible in UI copy');
assert.ok(html.includes('cinemo'), 'CineMo must be visible in UI copy');
assert.equal(html.includes('my list'), false, 'My List UI must stay removed');
assert.equal(html.includes('open movie collection'), false, 'separate movie collection UI must stay removed');

console.log(`Expanded LiveXYZ contract passed: ${app.LIVE_CHANNELS.length} official channels`);
