import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as app from '../app.js';

assert.equal('MOVIES' in app, false, 'movie catalog export must be removed');
assert.ok(Array.isArray(app.LIVE_CHANNELS), 'LIVE_CHANNELS must be an array');
assert.ok(app.LIVE_CHANNELS.length >= 4, 'should have at least four official live channels');
assert.ok(app.LIVE_CHANNELS.every(channel => channel.kind === 'live'), 'every catalog item must be live');
assert.equal(new Set(app.LIVE_CHANNELS.map(channel => channel.id)).size, app.LIVE_CHANNELS.length, 'channel ids must be unique');
assert.equal(new Set(app.LIVE_CHANNELS.map(channel => channel.channelId)).size, app.LIVE_CHANNELS.length, 'YouTube channel ids must be unique');
assert.deepEqual(app.searchChannels(app.LIVE_CHANNELS, 'kapamilya').map(channel => channel.id), ['kapamilya-online-live']);
assert.ok(app.searchChannels(app.LIVE_CHANNELS, 'tv5').some(channel => channel.id === 'tv5-kapatid'), 'TV5 search must include TV5 Kapatid');
assert.deepEqual(app.searchChannels(app.LIVE_CHANNELS, 'government').map(channel => channel.id), ['ptv-ph']);
for (const channel of app.LIVE_CHANNELS) {
  assert.equal(app.isAuthorizedChannel(channel), true, `${channel.id} must use only authorized hosts`);
  assert.match(app.buildLiveEmbedUrl(channel), /^https:\/\/www\.youtube\.com\/embed\/live_stream\?channel=/);
  assert.match(app.buildOfficialUrl(channel), /^https:\/\//);
}
const source = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8').toLowerCase();
for (const blocked of ['moviepire', 'vidsrc', '2embed', 'workers.dev', '.m3u8', 'akamaized']) {
  assert.equal(source.includes(blocked), false, `blocked/restream source must not appear: ${blocked}`);
}
console.log(`Live-only contract passed: ${app.LIVE_CHANNELS.length} official channels`);
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8').toLowerCase();
assert.ok(html.includes('philippine live tv'), 'live TV hero must be present');
assert.ok(html.includes('search live channels'), 'channel search must be present');
assert.equal(html.includes('my list'), false, 'My List UI must be removed');
assert.equal(html.includes('open movie collection'), false, 'movie collection UI must be removed');
