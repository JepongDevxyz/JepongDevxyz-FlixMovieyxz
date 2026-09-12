import assert from 'node:assert/strict';
import {
  MOVIES,
  searchMovies,
  filterMovies,
  buildEmbedUrl,
  buildWatchUrl,
  isAuthorizedMovieSource
} from '../app.js';

assert.equal(MOVIES.length, 5, 'catalog should contain five verified open movies');
assert.deepEqual(searchMovies(MOVIES, 'spring').map(m => m.id), ['spring']);
assert.deepEqual(searchMovies(MOVIES, '2020').map(m => m.id), ['coffee-run']);
assert.deepEqual(searchMovies(MOVIES, 'foundation').map(m => m.id), ['big-buck-bunny']);
assert.deepEqual(searchMovies(MOVIES, 'blender 2021').map(m => m.id), ['sprite-fright']);
assert.ok(searchMovies(MOVIES, 'attribution').some(m => m.id === 'spring'));
assert.deepEqual(filterMovies(MOVIES, { mode: 'saved', savedIds: new Set(['spring']) }).map(m => m.id), ['spring']);
assert.equal(filterMovies(MOVIES, { mode: 'latest' })[0].id, 'wing-it');

for (const movie of MOVIES) {
  assert.equal(isAuthorizedMovieSource(movie), true, `${movie.id} source must be authorized`);
  assert.match(buildEmbedUrl(movie), /^https:\/\/video\.blender\.org\/videos\/embed\//);
  assert.match(buildWatchUrl(movie), /^https:\/\/video\.blender\.org\/w\//);
  assert.ok(!buildEmbedUrl(movie).includes('moviepire'));
  assert.ok(!buildWatchUrl(movie).includes('moviepire'));
}

console.log('MovieXYZ tests passed');
