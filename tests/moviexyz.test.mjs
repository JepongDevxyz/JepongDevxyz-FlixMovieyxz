import assert from 'node:assert/strict';
import {
  MOVIES,
  LIVE_CHANNELS,
  searchCatalog,
  filterCatalog,
  buildPlaybackUrl,
  buildWatchUrl,
  isAuthorizedSource
} from '../app.js';

assert.ok(MOVIES.length >= 15, 'catalog should contain at least 15 verified/open movies');
assert.ok(LIVE_CHANNELS.length >= 4, 'catalog should contain at least four official live-channel entries');
assert.equal(new Set([...MOVIES, ...LIVE_CHANNELS].map(item => item.id)).size, MOVIES.length + LIVE_CHANNELS.length, 'catalog ids must be unique');

assert.deepEqual(searchCatalog(MOVIES, 'singularity 2026').map(item => item.id), ['singularity']);
assert.deepEqual(searchCatalog(MOVIES, 'dragon fantasy').map(item => item.id), ['sintel']);
assert.deepEqual(searchCatalog(LIVE_CHANNELS, 'ptv philippines').map(item => item.id), ['ptv-ph']);
assert.deepEqual(searchCatalog(LIVE_CHANNELS, 'gma breaking news').map(item => item.id), ['gma-news']);
assert.deepEqual(searchCatalog(LIVE_CHANNELS, 'tv5').map(item => item.id), ['news5']);

assert.ok(filterCatalog({ mode: 'movies' }).every(item => item.kind === 'movie'));
assert.ok(filterCatalog({ mode: 'live' }).every(item => item.kind === 'live'));
assert.deepEqual(filterCatalog({ mode: 'saved', savedIds: new Set(['singularity', 'ptv-ph']) }).map(item => item.id).sort(), ['ptv-ph', 'singularity']);

for (const movie of MOVIES) {
  assert.equal(isAuthorizedSource(movie), true, `${movie.id} source must be authorized`);
  const embed = buildPlaybackUrl(movie);
  const watch = buildWatchUrl(movie);
  assert.ok(embed.startsWith('https://video.blender.org/videos/embed/') || embed.startsWith('https://www.youtube-nocookie.com/embed/'));
  assert.ok(watch.startsWith('https://video.blender.org/w/') || watch.startsWith('https://www.youtube.com/watch?v='));
  assert.ok(!embed.toLowerCase().includes('moviepire'));
  assert.ok(!watch.toLowerCase().includes('moviepire'));
}

for (const channel of LIVE_CHANNELS) {
  assert.equal(isAuthorizedSource(channel), true, `${channel.id} live source must be authorized`);
  assert.match(buildPlaybackUrl(channel), /^https:\/\/www\.youtube\.com\/embed\/live_stream\?channel=/);
  assert.match(buildWatchUrl(channel), /^https:\/\/www\.youtube\.com\/channel\/.+\/live$/);
  assert.match(channel.channelId, /^UC[\w-]{20,}$/);
}

console.log(`MovieXYZ tests passed: ${MOVIES.length} movies, ${LIVE_CHANNELS.length} live channels`);
