export const LIVE_CHANNELS = [
  {
    id: 'kapamilya-online-live', kind: 'live', mode: 'embedded', category: 'entertainment',
    title: 'Kapamilya Online Live', broadcaster: 'ABS-CBN Entertainment',
    channelId: 'UCstEtN0pgOmCf02EdXsGChw', availability: '24/7 official stream',
    description: 'ABS-CBN Entertainment’s official Kapamilya Online Live service with around-the-clock programming on its verified YouTube channel.',
    source: 'Official YouTube live channel',
    officialUrl: 'https://www.youtube.com/channel/UCstEtN0pgOmCf02EdXsGChw/live',
    tags: ['philippines', 'kapamilya', 'abs-cbn', 'entertainment', '24/7', 'live tv']
  },
  {
    id: 'tv5-kapatid', kind: 'live', mode: 'embedded', category: 'general',
    title: 'TV5 Kapatid Livestream', broadcaster: 'TV5 Philippines',
    channelId: 'UCiFx0kZFjR29u0uJxTSq5MQ', availability: 'Official daily live schedule',
    description: 'TV5 Philippines’ official Kapatid Livestream. The embedded player works while TV5 exposes a public live broadcast.',
    source: 'Official TV5 / YouTube', officialUrl: 'https://tv5.com.ph/',
    tags: ['philippines', 'tv5', 'kapatid', 'entertainment', 'news', 'live tv']
  },
  {
    id: 'ptv-ph', kind: 'live', mode: 'embedded', category: 'news',
    title: 'PTV Philippines', broadcaster: "People's Television Network",
    channelId: 'UCJCUbMaY593_4SN1QPG7NFQ', availability: 'Official livestream service',
    description: 'Official government television livestream from the People’s Television Network. Availability follows PTV’s public feed.',
    source: 'Official PTV livestream', officialUrl: 'https://ptvnews.ph/livestream/',
    tags: ['philippines', 'ptv', 'government', 'public television', 'news', 'live tv']
  },
  {
    id: 'gma-news', kind: 'live', mode: 'embedded', category: 'news',
    title: 'GMA Integrated News', broadcaster: 'GMA Network',
    channelId: 'UCqYw-CTd1dU2yGI71sEyqNw', availability: 'Scheduled official livestreams',
    description: 'Official GMA News live coverage and newscast streams when GMA has an active public embeddable livestream.',
    source: 'Official YouTube channel', officialUrl: 'https://www.youtube.com/channel/UCqYw-CTd1dU2yGI71sEyqNw/live',
    tags: ['philippines', 'gma', 'news', '24 oras', 'breaking news', 'live tv']
  },
  {
    id: 'news5', kind: 'live', mode: 'embedded', category: 'news',
    title: 'News5Everywhere', broadcaster: 'TV5 / News5',
    channelId: 'UCGEbMwiX774cseKvJqF9R2g', availability: 'Scheduled official livestreams',
    description: 'Official News5 livestreams for current Philippine news and special coverage while a public stream is active.',
    source: 'Official YouTube channel', officialUrl: 'https://www.youtube.com/channel/UCGEbMwiX774cseKvJqF9R2g/live',
    tags: ['philippines', 'news5', 'tv5', 'news', 'live coverage', 'live tv']
  },
  {
    id: 'cinema-one', kind: 'live', mode: 'external', category: 'movies',
    title: 'Cinema One', broadcaster: 'Creative Programs / ABS-CBN',
    availability: 'Official Cinema One live channel on iWant',
    description: 'Official Filipino movie channel carrying blockbuster, classic, independent, and curated film blocks on iWant.',
    source: 'Official iWant service', officialUrl: 'https://iwant.ph/',
    tags: ['philippines', 'cinema one', 'movies', 'films', 'filipino movies', 'iwant']
  },
  {
    id: 'cinemo', kind: 'live', mode: 'external', category: 'movies',
    title: 'CineMo! Movies', broadcaster: 'ABS-CBN',
    availability: 'Official licensed movie uploads',
    description: 'Official ABS-CBN movie offering. CineMo and ABS-CBN digital channels carry licensed classic films and other movie releases in the Philippines.',
    source: 'Official ABS-CBN YouTube service', officialUrl: 'https://www.youtube.com/@abscbnentertainment',
    tags: ['philippines', 'cinemo', 'movies', 'films', 'sony pictures', 'abs-cbn']
  },
  {
    id: 'jeepney-tv', kind: 'live', mode: 'external', category: 'entertainment',
    title: 'Jeepney TV', broadcaster: 'ABS-CBN / Creative Programs',
    availability: 'Official YouTube channel and iWant episodes',
    description: 'Verified Jeepney TV channel with classic Filipino shows, full episodes, highlights, and links to official iWant viewing.',
    source: 'Verified Jeepney TV YouTube channel', officialUrl: 'https://www.youtube.com/@JeepneyTV',
    tags: ['philippines', 'jeepney tv', 'classic shows', 'entertainment', 'iwant']
  },
  {
    id: 'knowledge-channel', kind: 'live', mode: 'external', category: 'education',
    title: 'Knowledge Channel', broadcaster: 'Knowledge Channel Foundation',
    availability: 'Full channel online via iWant / Cignal Play',
    description: 'Official educational channel with full-channel online streaming through authorized platforms and lessons on its verified YouTube presence.',
    source: 'Official Knowledge Channel', officialUrl: 'https://www.youtube.com/@knowledgechannelorg',
    tags: ['philippines', 'knowledge channel', 'education', 'learning', 'students', 'iwant']
  },
  {
    id: 'anc', kind: 'live', mode: 'external', category: 'news',
    title: 'ANC 24/7', broadcaster: 'ABS-CBN News Channel',
    availability: 'Official live access via iWant / membership',
    description: 'Official ANC news channel. Full 24/7 livestream access may require the provider’s subscription or YouTube membership.',
    source: 'Verified ANC 24/7 YouTube channel', officialUrl: 'https://www.youtube.com/@ANCalerts',
    tags: ['philippines', 'anc', 'abs-cbn news', 'news', 'business', '24/7']
  }
];

const AUTHORIZED_EMBED_HOSTS = new Set(['www.youtube.com']);
const AUTHORIZED_OFFICIAL_HOSTS = new Set([
  'www.youtube.com', 'youtube.com',
  'tv5.com.ph', 'www.tv5.com.ph',
  'ptvnews.ph', 'www.ptvnews.ph',
  'iwant.ph', 'www.iwant.ph',
  'knowledgechannel.org', 'www.knowledgechannel.org'
]);

function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function searchChannels(channels, query) {
  const tokens = normalizeText(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [...channels];
  return channels.filter(channel => {
    const haystack = normalizeText([
      channel.title,
      channel.broadcaster,
      channel.category,
      channel.availability,
      channel.description,
      channel.source,
      ...(channel.tags || [])
    ].join(' '));
    return tokens.every(token => haystack.includes(token));
  });
}

export function buildLiveEmbedUrl(channel) {
  if (channel.mode !== 'embedded' || !channel.channelId) return null;
  return `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(channel.channelId)}&autoplay=1&playsinline=1&rel=0`;
}

export function buildOfficialUrl(channel) {
  return channel.officialUrl;
}

export function isAuthorizedChannel(channel) {
  try {
    const official = new URL(buildOfficialUrl(channel));
    if (!AUTHORIZED_OFFICIAL_HOSTS.has(official.hostname)) return false;
    const embedUrl = buildLiveEmbedUrl(channel);
    if (!embedUrl) return channel.mode === 'external';
    const embed = new URL(embedUrl);
    return channel.mode === 'embedded' && AUTHORIZED_EMBED_HOSTS.has(embed.hostname);
  } catch {
    return false;
  }
}

function initLiveXYZ() {
  const $ = selector => document.querySelector(selector);
  let query = '';
  let activeId = null;
  let statusTimer = null;

  function toast(message) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove('show'), 1900);
  }

  function filteredChannels() {
    return searchChannels(LIVE_CHANNELS, query);
  }

  function cardLabel(channel) {
    if (channel.category === 'movies') return 'MOVIES';
    if (channel.category === 'education') return 'LEARN';
    if (channel.category === 'news') return 'NEWS';
    return 'LIVE TV';
  }

  function render() {
    const channels = filteredChannels();
    const grid = $('#grid');
    const count = $('#count');
    if (!grid || !count) return;

    count.textContent = `${channels.length} official channel${channels.length === 1 ? '' : 's'}`;
    $('#title').textContent = query ? `Results for “${query}”` : 'Official Philippine Channels';

    if (!channels.length) {
      grid.innerHTML = '<div class="empty"><strong>No channel found.</strong><span>Try a broadcaster, movie, network, or keyword.</span></div>';
      return;
    }

    grid.innerHTML = channels.map(channel => {
      const initials = channel.title.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase();
      const action = channel.mode === 'embedded' ? '▶ Watch' : '↗ Open';
      return `
        <article class="card" data-id="${channel.id}" tabindex="0" role="button" aria-label="Open ${channel.title}">
          <div class="channelArt ${channel.category === 'movies' ? 'movieArt' : ''}"><span>${initials}</span><b>${cardLabel(channel)}</b><em>${action}</em></div>
          <div class="body">
            <div class="status"><i></i>${channel.availability}</div>
            <h3>${channel.title}</h3>
            <p>${channel.broadcaster}</p>
            <p>${channel.source}</p>
          </div>
        </article>`;
    }).join('');
  }

  function openChannel(id) {
    const channel = LIVE_CHANNELS.find(item => item.id === id);
    if (!channel || !isAuthorizedChannel(channel)) {
      toast('This channel does not have an approved official source.');
      return;
    }

    activeId = id;
    $('#mt').textContent = channel.title;
    $('#md').textContent = channel.description;
    $('#mm').innerHTML = `<span>${channel.broadcaster}</span><span>• ${channel.availability}</span>`;
    $('#official').href = buildOfficialUrl(channel);
    $('#official').textContent = channel.mode === 'embedded' ? 'Open Official Stream ↗' : 'Open Official Provider ↗';
    $('#modal').hidden = false;
    document.body.style.overflow = 'hidden';

    clearTimeout(statusTimer);
    if (channel.mode === 'embedded') {
      $('#externalPanel').hidden = true;
      $('#frame').hidden = false;
      $('#fullscreen').hidden = false;
      $('#retry').hidden = false;
      $('#frame').src = buildLiveEmbedUrl(channel);
      $('#playerStatus').textContent = 'Connecting to the broadcaster’s official live endpoint…';
      statusTimer = setTimeout(() => {
        if (!$('#modal').hidden) $('#playerStatus').textContent = 'If the broadcaster is off-air or blocks embedding, use Open Official Stream.';
      }, 6500);
    } else {
      $('#frame').src = 'about:blank';
      $('#frame').hidden = true;
      $('#externalPanel').hidden = false;
      $('#fullscreen').hidden = true;
      $('#retry').hidden = true;
      $('#externalTitle').textContent = channel.category === 'movies' ? 'Official movie provider' : 'Official provider';
      $('#externalText').textContent = `${channel.title} is available through its official provider. Open the verified source below to watch available programming.`;
      $('#playerStatus').textContent = 'This provider does not expose a stable public embeddable player, so LiveXYZ does not substitute an unofficial restream.';
    }
  }

  function closeChannel() {
    clearTimeout(statusTimer);
    $('#frame').src = 'about:blank';
    $('#modal').hidden = true;
    document.body.style.overflow = '';
    activeId = null;
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
    if (card) openChannel(card.dataset.id);
  });

  $('#grid')?.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-id]')) {
      event.preventDefault();
      openChannel(event.target.dataset.id);
    }
  });

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

  $('#searchBtn')?.addEventListener('click', () => $('#q')?.focus());
  $('#close')?.addEventListener('click', closeChannel);
  $('#fullscreen')?.addEventListener('click', enterFullscreen);
  $('#modal')?.addEventListener('click', event => {
    if (event.target === $('#modal')) closeChannel();
  });
  $('#retry')?.addEventListener('click', () => {
    const channel = LIVE_CHANNELS.find(item => item.id === activeId);
    if (!channel || channel.mode !== 'embedded') return;
    $('#frame').src = 'about:blank';
    setTimeout(() => { $('#frame').src = buildLiveEmbedUrl(channel); }, 80);
    $('#playerStatus').textContent = 'Retrying official live endpoint…';
  });
  $('#frame')?.addEventListener('load', () => {
    if ($('#frame').src !== 'about:blank' && !$('#frame').hidden) {
      $('#playerStatus').textContent = 'Official live player loaded. Broadcast availability is controlled by the channel.';
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !$('#modal')?.hidden) closeChannel();
    if (event.key === '/' && $('#modal')?.hidden && document.activeElement?.tagName !== 'INPUT') {
      event.preventDefault();
      $('#q')?.focus();
    }
  });

  render();
  setTimeout(() => toast('LiveXYZ • official broadcaster sources only'), 450);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLiveXYZ);
  else initLiveXYZ();
}
