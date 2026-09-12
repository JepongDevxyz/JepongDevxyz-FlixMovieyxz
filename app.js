export const MOVIES = [
  {
    id: 'wing-it',
    title: 'WING IT!',
    year: 2023,
    studio: 'Blender Studio',
    shortId: 'vrjS4NB4cwnJhrib8uEwi6',
    youtubeThumbId: 'u9lj-c29dxI',
    description: 'An uptight engineer and an enthusiastic wannabe-pilot end up airborne in an out-of-control space shuttle.',
    license: 'Blender Open Movie',
    source: 'Official Blender Video',
    tags: ['animation', 'open movie', 'space', 'comedy']
  },
  {
    id: 'sprite-fright',
    title: 'Sprite Fright',
    year: 2021,
    studio: 'Blender Studio',
    shortId: 'mziZQzmf95pGMSqk7BPZvi',
    youtubeThumbId: '_cMxraX_5RE',
    description: 'An 80s-inspired horror comedy where rowdy teenagers discover peaceful mushroom creatures that are an unexpected force of nature.',
    license: 'Creative Commons Attribution / open movie',
    source: 'Official Blender Video',
    tags: ['animation', 'open movie', 'comedy', 'forest']
  },
  {
    id: 'coffee-run',
    title: 'Coffee Run',
    year: 2020,
    studio: 'Blender Studio',
    shortId: 'xymLD6rkpHNug3fzzMyhmZ',
    youtubeThumbId: 'PVGeM40dABA',
    description: 'Fueled by caffeine, a young woman runs through the bittersweet memories of her past relationship.',
    license: 'Blender Open Movie',
    source: 'Official Blender Video',
    tags: ['animation', 'open movie', 'coffee', 'short film']
  },
  {
    id: 'spring',
    title: 'Spring',
    year: 2019,
    studio: 'Blender Animation Studio',
    shortId: '8B5QmoLSS3mWJ4fmZZu3Ye',
    youtubeThumbId: 'WhWc3b3KhnY',
    description: 'A shepherd girl and her dog face ancient spirits in order to continue the cycle of life.',
    license: 'Creative Commons Attribution 4.0 / open movie',
    source: 'Official Blender Video',
    tags: ['animation', 'open movie', 'fantasy', 'nature']
  },
  {
    id: 'big-buck-bunny',
    title: 'Big Buck Bunny',
    year: 2008,
    studio: 'Blender Foundation',
    shortId: 'dmhvQNzwBnrWy1iYzVv5g7',
    youtubeThumbId: 'YE7VzlLtp-4',
    description: 'A giant rabbit with a big heart decides to deal with three troublesome rodents in classic cartoon fashion.',
    license: 'Creative Commons Attribution',
    source: 'Official Blender Video',
    tags: ['animation', 'open movie', 'comedy', 'classic']
  }
];

const AUTHORIZED_HOSTS = new Set(['video.blender.org']);

function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function searchMovies(movies, query) {
  const tokens = normalizeText(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [...movies];

  return movies.filter(movie => {
    const haystack = normalizeText([
      movie.title,
      movie.year,
      movie.studio,
      movie.description,
      movie.license,
      movie.source,
      ...(movie.tags || [])
    ].join(' '));
    return tokens.every(token => haystack.includes(token));
  });
}

export function filterMovies(movies, { mode = 'all', query = '', savedIds = new Set() } = {}) {
  let result = searchMovies(movies, query);
  if (mode === 'saved') result = result.filter(movie => savedIds.has(movie.id));
  if (mode === 'latest') result = [...result].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  return result;
}

export function buildEmbedUrl(movie) {
  return `https://video.blender.org/videos/embed/${encodeURIComponent(movie.shortId)}?autoplay=1&warningTitle=0&peertubeLink=1&p2p=0`;
}

export function buildWatchUrl(movie) {
  return `https://video.blender.org/w/${encodeURIComponent(movie.shortId)}`;
}

export function isAuthorizedMovieSource(movie) {
  try {
    const embed = new URL(buildEmbedUrl(movie));
    const watch = new URL(buildWatchUrl(movie));
    return AUTHORIZED_HOSTS.has(embed.hostname) && AUTHORIZED_HOSTS.has(watch.hostname);
  } catch {
    return false;
  }
}

function initMovieXYZ() {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const storageKey = 'moviexyz_saved_v2';
  let mode = 'all';
  let query = '';
  let activeId = null;
  let playerTimer = null;

  const savedIds = () => {
    try {
      return new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));
    } catch {
      return new Set();
    }
  };

  const saveIds = ids => localStorage.setItem(storageKey, JSON.stringify([...ids]));

  function toast(message) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  function resultList() {
    return filterMovies(MOVIES, { mode, query, savedIds: savedIds() });
  }

  function render() {
    const items = resultList();
    const grid = $('#grid');
    const count = $('#count');
    const heading = $('#title');
    if (!grid || !count || !heading) return;

    count.textContent = `${items.length} title${items.length === 1 ? '' : 's'}`;
    if (query) heading.textContent = `Search results for “${query}”`;
    else heading.textContent = mode === 'saved' ? 'My List' : mode === 'latest' ? 'Latest Open Movies' : 'Open Movie Collection';

    if (!items.length) {
      grid.innerHTML = '<div class="empty"><strong>No movies found.</strong><span>Try another title, year, studio, keyword, or license.</span></div>';
      return;
    }

    grid.innerHTML = items.map(movie => `
      <article class="card" data-id="${movie.id}" tabindex="0" role="button" aria-label="Play ${movie.title}">
        <div class="poster">
          <img src="https://i.ytimg.com/vi/${movie.youtubeThumbId}/hqdefault.jpg" alt="${movie.title} thumbnail" loading="lazy">
          <span class="tag">✓ VERIFIED</span>
          <span class="playBadge">▶ Play</span>
        </div>
        <div class="body">
          <h3>${movie.title}</h3>
          <p>${movie.year} • ${movie.studio}</p>
          <p>${movie.license}</p>
        </div>
      </article>`).join('');
  }

  function updateFavoriteButton() {
    if (!activeId || !$('#fav')) return;
    $('#fav').textContent = savedIds().has(activeId) ? '✓ In My List' : '＋ My List';
  }

  function openMovie(id) {
    const movie = MOVIES.find(item => item.id === id);
    if (!movie || !isAuthorizedMovieSource(movie)) {
      toast('This movie does not have a verified playback source.');
      return;
    }

    activeId = id;
    $('#mt').textContent = movie.title;
    $('#md').textContent = movie.description;
    $('#mm').innerHTML = `<span>${movie.year}</span><span>• ${movie.studio}</span><span>• ${movie.license}</span>`;
    $('#official').href = buildWatchUrl(movie);
    $('#frame').src = buildEmbedUrl(movie);
    $('#playerStatus').textContent = 'Loading official Blender player…';
    $('#modal').hidden = false;
    document.body.style.overflow = 'hidden';
    updateFavoriteButton();

    clearTimeout(playerTimer);
    playerTimer = setTimeout(() => {
      if (!$('#modal').hidden) {
        $('#playerStatus').textContent = 'If playback does not start, use Open Official Source below.';
      }
    }, 7000);
  }

  function closeMovie() {
    clearTimeout(playerTimer);
    $('#frame').src = 'about:blank';
    $('#modal').hidden = true;
    document.body.style.overflow = '';
    activeId = null;
  }

  function toggleFavorite() {
    if (!activeId) return;
    const ids = savedIds();
    if (ids.has(activeId)) {
      ids.delete(activeId);
      toast('Removed from My List');
    } else {
      ids.add(activeId);
      toast('Added to My List');
    }
    saveIds(ids);
    updateFavoriteButton();
    render();
  }

  $('#grid')?.addEventListener('click', event => {
    const card = event.target.closest('[data-id]');
    if (card) openMovie(card.dataset.id);
  });

  $('#grid')?.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-id]')) {
      event.preventDefault();
      openMovie(event.target.dataset.id);
    }
  });

  $$('[data-f]').forEach(button => button.addEventListener('click', () => {
    mode = button.dataset.f;
    $$('[data-f]').forEach(item => item.classList.toggle('on', item === button));
    render();
    document.querySelector('.wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  $('#heroPlay')?.addEventListener('click', () => openMovie('wing-it'));
  $('#heroInfo')?.addEventListener('click', () => openMovie('wing-it'));
  $('#close')?.addEventListener('click', closeMovie);
  $('#modal')?.addEventListener('click', event => {
    if (event.target === $('#modal')) closeMovie();
  });
  $('#fav')?.addEventListener('click', toggleFavorite);

  $('#q')?.addEventListener('input', event => {
    query = event.target.value.trim();
    $('#clearSearch').hidden = !query;
    render();
  });

  $('#clearSearch')?.addEventListener('click', () => {
    query = '';
    $('#q').value = '';
    $('#clearSearch').hidden = true;
    $('#q').focus();
    render();
  });

  $('#searchBtn')?.addEventListener('click', () => {
    $('#q')?.focus();
    document.querySelector('.search')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  $('#frame')?.addEventListener('load', () => {
    if ($('#frame').src !== 'about:blank') $('#playerStatus').textContent = 'Official Blender player loaded.';
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !$('#modal')?.hidden) closeMovie();
    if (event.key === '/' && $('#modal')?.hidden && document.activeElement?.tagName !== 'INPUT') {
      event.preventDefault();
      $('#q')?.focus();
    }
  });

  render();
  setTimeout(() => toast('Powered by Jepong Devxyz • verified open movies only'), 450);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMovieXYZ);
  else initMovieXYZ();
}
