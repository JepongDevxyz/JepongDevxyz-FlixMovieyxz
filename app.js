export const LIVE_CHANNELS = [
  {
    id: 'kapamilya-online-live', kind: 'live', mode: 'embedded', category: 'entertainment',
    title: 'Kapamilya Online Live', broadcaster: 'ABS-CBN Entertainment',
    channelId: 'UCstEtN0pgOmCf02EdXsGChw', availability: '24/7 official stream',
    description: 'ABS-CBN Entertainment’s official around-the-clock live programming on YouTube.',
    source: 'Official verified YouTube channel',
    tags: ['philippines', 'kapamilya', 'abs-cbn', 'entertainment', 'live tv', '24/7']
  },
  {
    id: 'tv5-kapatid', kind: 'live', mode: 'embedded', category: 'general',
    title: 'TV5 Kapatid Livestream', broadcaster: 'TV5 Philippines',
    channelId: 'UCiFx0kZFjR29u0uJxTSq5MQ', availability: 'Official daily live schedule',
    description: 'TV5 Philippines’ official Kapatid livestream for news and entertainment programming.',
    source: 'Official verified YouTube channel',
    tags: ['philippines', 'tv5', 'kapatid', 'entertainment', 'news', 'live tv']
  },
  {
    id: 'ptv-ph', kind: 'live', mode: 'embedded', category: 'news',
    title: 'PTV Philippines', broadcaster: "People's Television Network",
    channelId: 'UCJCUbMaY593_4SN1QPG7NFQ', availability: 'Official livestream service',
    description: 'Official public television livestream from the People’s Television Network.',
    source: 'Official PTV YouTube channel',
    tags: ['philippines', 'ptv', 'government', 'public television', 'news', 'live tv']
  },
  {
    id: 'gma-news', kind: 'live', mode: 'embedded', category: 'news',
    title: 'GMA Integrated News', broadcaster: 'GMA Network',
    channelId: 'UCqYw-CTd1dU2yGI71sEyqNw', availability: 'Scheduled official livestreams',
    description: 'Official GMA Integrated News live coverage and public livestreams.',
    source: 'Official verified YouTube channel',
    tags: ['philippines', 'gma', 'news', '24 oras', 'breaking news', 'live tv']
  },
  {
    id: 'news5', kind: 'live', mode: 'embedded', category: 'news',
    title: 'News5Everywhere', broadcaster: 'TV5 / News5',
    channelId: 'UCGEbMwiX774cseKvJqF9R2g', availability: 'Scheduled official livestreams',
    description: 'Official News5 livestreams for Philippine news and special coverage.',
    source: 'Official verified YouTube channel',
    tags: ['philippines', 'news5', 'tv5', 'news', 'live coverage', 'live tv']
  },
  {
    id: 'untv-24-7', kind: 'live', mode: 'embedded', category: 'news',
    title: 'UNTV 24/7', broadcaster: 'UNTV News and Rescue',
    videoId: 'eDZR3ggrXBs', availability: '24/7 official livestream',
    description: 'UNTV News and Rescue’s official continuous livestream for news, public service, and current affairs.',
    source: 'Official verified YouTube livestream',
    tags: ['philippines', 'untv', 'news', 'public service', '24/7', 'live tv']
  },
  {
    id: 'dzrh-tv', kind: 'live', mode: 'embedded', category: 'news',
    title: 'DZRHTV Livestream', broadcaster: 'DZRH News Television',
    videoId: 'QCMsndnFNPY', availability: 'Official continuous livestream',
    description: 'DZRH News Television’s official public livestream.',
    source: 'Official verified YouTube livestream',
    tags: ['philippines', 'dzrh', 'news', 'radio tv', 'live tv']
  }
];

export const MOVIES = [
  {
    id: 'himala-restored', kind: 'movie', provider: 'youtube',
    title: 'Himala', year: 1982, studio: 'ABS-CBN Star Cinema', videoId: '-ZdnICIr0Us',
    description: 'Digitally restored official full-movie upload starring Nora Aunor.',
    source: 'Official verified ABS-CBN Star Cinema upload',
    tags: ['filipino movie', 'classic', 'drama', 'nora aunor', 'restored']
  },
  {
    id: 'ang-tanging-ina-nyong-lahat', kind: 'movie', provider: 'youtube',
    title: "Ang Tanging Ina N'yong Lahat", year: 2008, studio: 'ABS-CBN Star Cinema', videoId: 'wQCM8rLZHDc',
    description: 'Digitally restored official full-movie upload starring Ai-Ai delas Alas.',
    source: 'Official verified ABS-CBN Star Cinema upload',
    tags: ['filipino movie', 'comedy', 'ai ai delas alas', 'restored']
  },
  {
    id: 'you-are-the-one', kind: 'movie', provider: 'youtube',
    title: 'You Are the One', year: 2006, studio: 'ABS-CBN Star Cinema', videoId: 'UauBIwUaEVA',
    description: 'Digitally restored official full-movie upload starring Toni Gonzaga and Sam Milby.',
    source: 'Official verified ABS-CBN Star Cinema upload',
    tags: ['filipino movie', 'romance', 'toni gonzaga', 'sam milby', 'restored']
  },
  {
    id: 'caregiver', kind: 'movie', provider: 'youtube',
    title: 'Caregiver', year: 2008, studio: 'ABS-CBN Star Cinema', videoId: '9-34yVYkff8',
    description: 'Digitally restored official full-movie upload starring Sharon Cuneta.',
    source: 'Official verified ABS-CBN Star Cinema upload',
    tags: ['filipino movie', 'drama', 'sharon cuneta', 'restored']
  },
  {
    id: 'ekstra', kind: 'movie', provider: 'youtube',
    title: 'Ekstra', year: 2013, studio: 'ABS-CBN Star Cinema', videoId: 'GO6F1l-L9d4',
    description: 'Official full-movie upload starring Vilma Santos.',
    source: 'Official verified ABS-CBN Star Cinema upload',
    tags: ['filipino movie', 'drama', 'vilma santos', 'full movie']
  }
];

const AUTHORIZED_EMBED_HOSTS = new Set(['www.youtube.com']);

function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function searchableText(item) {
  return normalizeText([
    item.title,
    item.broadcaster,
    item.studio,
    item.year,
    item.availability,
    item.description,
    item.source,
    item.category,
    item.kind,
    ...(item.tags || [])
  ].filter(Boolean).join(' '));
}

export function searchCatalog(items, query = '') {
  const tokens = normalizeText(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [...items];
  return items.filter(item => {
    const haystack = searchableText(item);
    return tokens.every(token => haystack.includes(token));
  });
}

export function filterCatalog({ tab = 'live', query = '' } = {}) {
  let items = tab === 'movies' ? [...MOVIES] : tab === 'all' ? [...LIVE_CHANNELS, ...MOVIES] : [...LIVE_CHANNELS];
  return searchCatalog(items, query);
}

export function buildEmbedUrl(item) {
  if (item.kind === 'movie' && item.provider === 'youtube') {
    return `https://www.youtube.com/embed/${encodeURIComponent(item.videoId)}?autoplay=1&playsinline=1&rel=0`;
  }
  if (item.kind === 'live' && item.videoId) {
    return `https://www.youtube.com/embed/${encodeURIComponent(item.videoId)}?autoplay=1&playsinline=1&rel=0`;
  }
  if (item.kind === 'live' && item.channelId) {
    return `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(item.channelId)}&autoplay=1&playsinline=1&rel=0`;
  }
  return null;
}

export function isAuthorizedItem(item) {
  try {
    const url = new URL(buildEmbedUrl(item));
    return AUTHORIZED_EMBED_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

function initLiveXYZ() {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  let tab = 'live';
  let query = '';
  let activeItem = null;
  let statusTimer = null;

  function toast(message) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  function currentItems() {
    return filterCatalog({ tab, query });
  }

  function render() {
    const items = currentItems();
    const grid = $('#grid');
    if (!grid) return;

    $('#count').textContent = `${items.length} ${tab === 'movies' ? 'movie' : tab === 'live' ? 'channel' : 'item'}${items.length === 1 ? '' : 's'}`;
    $('#title').textContent = query
      ? `Results for “${query}”`
      : tab === 'movies' ? 'Official Full Movies' : tab === 'all' ? 'All In-App Content' : 'In-App Live TV';

    if (!items.length) {
      grid.innerHTML = '<div class="empty"><strong>No result found.</strong><span>Try another title, channel, actor, or network.</span></div>';
      return;
    }

    grid.innerHTML = items.map(item => {
      if (item.kind === 'movie') {
        return `<article class="card" data-id="${item.id}" data-kind="movie" tabindex="0" role="button" aria-label="Play ${item.title}">
          <div class="thumb"><img src="https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg" alt="${item.title} thumbnail" loading="lazy"><span class="badge">FULL MOVIE</span><em>▶ Play</em></div>
          <div class="body"><h3>${item.title}</h3><p>${item.year} • ${item.studio}</p><p>${item.source}</p></div>
        </article>`;
      }
      const initials = item.title.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase();
      return `<article class="card" data-id="${item.id}" data-kind="live" tabindex="0" role="button" aria-label="Watch ${item.title}">
        <div class="liveArt"><span>${initials}</span><b>LIVE TV</b><em>▶ Watch</em></div>
        <div class="body"><div class="status"><i></i>${item.availability}</div><h3>${item.title}</h3><p>${item.broadcaster}</p><p>${item.source}</p></div>
      </article>`;
    }).join('');
  }

  function findItem(id, kind) {
    return (kind === 'movie' ? MOVIES : LIVE_CHANNELS).find(item => item.id === id);
  }

  function openItem(id, kind) {
    const item = findItem(id, kind);
    if (!item || !isAuthorizedItem(item)) {
      toast('This item does not have an approved in-app source.');
      return;
    }

    activeItem = item;
    $('#mt').textContent = item.title;
    $('#md').textContent = item.description;
    $('#mm').innerHTML = item.kind === 'movie'
      ? `<span>${item.year}</span><span>• ${item.studio}</span><span>• Full Movie</span>`
      : `<span>${item.broadcaster}</span><span>• ${item.availability}</span>`;
    $('#frame').src = buildEmbedUrl(item);
    $('#modal').hidden = false;
    document.body.style.overflow = 'hidden';
    $('#playerStatus').textContent = item.kind === 'movie'
      ? 'Loading the official full-movie player…'
      : 'Connecting to the official live player…';

    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => {
      if (!$('#modal').hidden) {
        $('#playerStatus').textContent = item.kind === 'movie'
          ? 'Playback and ads are controlled by the official YouTube upload.'
          : 'If the broadcaster is off-air, the player may show no active live stream.';
      }
    }, 5500);
  }

  function closeItem() {
    clearTimeout(statusTimer);
    $('#frame').src = 'about:blank';
    $('#modal').hidden = true;
    document.body.style.overflow = '';
    activeItem = null;
  }

  async function enterFullscreen() {
    const target = $('#videoStage');
    if (!target) return;
    try {
      if (target.requestFullscreen) await target.requestFullscreen();
      else if (target.webkitRequestFullscreen) target.webkitRequestFullscreen();
      else toast('Fullscreen is not supported by this browser.');
    } catch {
      toast('Fullscreen could not be started.');
    }
  }

  $('#grid')?.addEventListener('click', event => {
    const card = event.target.closest('[data-id]');
    if (card) openItem(card.dataset.id, card.dataset.kind);
  });

  $('#grid')?.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-id]')) {
      event.preventDefault();
      openItem(event.target.dataset.id, event.target.dataset.kind);
    }
  });

  $$('.tab').forEach(button => button.addEventListener('click', () => {
    tab = button.dataset.tab;
    $$('.tab').forEach(el => el.classList.toggle('active', el === button));
    render();
  }));

  $('#q')?.addEventListener('input', event => {
    query = event.target.value.trim();
    $('#clearSearch').hidden = !query;
    render();
  });

  $('#clearSearch')?.addEventListener('click', () => {
    query = '';
    $('#q').value = '';
    $('#clearSearch').hidden = true;
    render();
  });

  $('#close')?.addEventListener('click', closeItem);
  $('#fullscreen')?.addEventListener('click', enterFullscreen);
  $('#retry')?.addEventListener('click', () => {
    if (!activeItem) return;
    const url = buildEmbedUrl(activeItem);
    $('#frame').src = 'about:blank';
    setTimeout(() => { $('#frame').src = url; }, 70);
    $('#playerStatus').textContent = 'Retrying official in-app player…';
  });
  $('#frame')?.addEventListener('load', () => {
    if ($('#frame').src !== 'about:blank') $('#playerStatus').textContent = 'Official in-app player loaded.';
  });
  $('#modal')?.addEventListener('click', event => {
    if (event.target === $('#modal')) closeItem();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !$('#modal')?.hidden) closeItem();
    if (event.key === '/' && $('#modal')?.hidden && document.activeElement?.tagName !== 'INPUT') {
      event.preventDefault();
      $('#q')?.focus();
    }
  });

  render();
  setTimeout(() => toast('LiveXYZ • in-app official streams only'), 350);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLiveXYZ);
  else initLiveXYZ();
}
