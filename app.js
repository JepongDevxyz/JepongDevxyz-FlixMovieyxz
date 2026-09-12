export const LIVE_CHANNELS = [
  {
    id: 'kapamilya-online-live',
    kind: 'live',
    title: 'Kapamilya Online Live',
    broadcaster: 'ABS-CBN Entertainment',
    channelId: 'UCstEtN0pgOmCf02EdXsGChw',
    availability: '24/7 official stream',
    description: 'ABS-CBN Entertainment’s official Kapamilya Online Live service, available around the clock on its verified YouTube channel.',
    source: 'Official YouTube channel',
    officialUrl: 'https://www.youtube.com/channel/UCstEtN0pgOmCf02EdXsGChw/live',
    tags: ['philippines', 'kapamilya', 'abs-cbn', 'entertainment', '24/7', 'live tv']
  },
  {
    id: 'tv5-kapatid',
    kind: 'live',
    title: 'TV5 Kapatid Livestream',
    broadcaster: 'TV5 Philippines',
    channelId: 'UCiFx0kZFjR29u0uJxTSq5MQ',
    availability: 'Official daily live schedule',
    description: 'TV5 Philippines’ official Kapatid Livestream. The live player is available while TV5 has a public embeddable broadcast active.',
    source: 'Official TV5 / YouTube',
    officialUrl: 'https://tv5.com.ph/',
    tags: ['philippines', 'tv5', 'kapatid', 'entertainment', 'news', 'live tv']
  },
  {
    id: 'ptv-ph',
    kind: 'live',
    title: 'PTV Philippines',
    broadcaster: "People's Television Network",
    channelId: 'UCJCUbMaY593_4SN1QPG7NFQ',
    availability: 'Official livestream service',
    description: 'Official government television livestream from the People’s Television Network. Availability follows PTV’s public broadcast feed.',
    source: 'Official PTV livestream',
    officialUrl: 'https://ptvnews.ph/livestream/',
    tags: ['philippines', 'ptv', 'government', 'public television', 'news', 'live tv']
  },
  {
    id: 'gma-news',
    kind: 'live',
    title: 'GMA Integrated News',
    broadcaster: 'GMA Network',
    channelId: 'UCqYw-CTd1dU2yGI71sEyqNw',
    availability: 'Scheduled official livestreams',
    description: 'Official GMA News live coverage and newscast streams. Playback is available when GMA has an active public embeddable livestream.',
    source: 'Official YouTube channel',
    officialUrl: 'https://www.youtube.com/channel/UCqYw-CTd1dU2yGI71sEyqNw/live',
    tags: ['philippines', 'gma', 'news', '24 oras', 'breaking news', 'live tv']
  },
  {
    id: 'news5',
    kind: 'live',
    title: 'News5Everywhere',
    broadcaster: 'TV5 / News5',
    channelId: 'UCGEbMwiX774cseKvJqF9R2g',
    availability: 'Scheduled official livestreams',
    description: 'Official News5 livestreams for current Philippine news and special coverage when a public stream is active.',
    source: 'Official YouTube channel',
    officialUrl: 'https://www.youtube.com/channel/UCGEbMwiX774cseKvJqF9R2g/live',
    tags: ['philippines', 'news5', 'tv5', 'news', 'live coverage', 'live tv']
  }
];

const AUTHORIZED_EMBED_HOSTS = new Set(['www.youtube.com']);
const AUTHORIZED_OFFICIAL_HOSTS = new Set([
  'www.youtube.com',
  'youtube.com',
  'tv5.com.ph',
  'www.tv5.com.ph',
  'ptvnews.ph',
  'www.ptvnews.ph'
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
      channel.availability,
      channel.description,
      channel.source,
      ...(channel.tags || [])
    ].join(' '));
    return tokens.every(token => haystack.includes(token));
  });
}

export function buildLiveEmbedUrl(channel) {
  return `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(channel.channelId)}&autoplay=1&playsinline=1&rel=0`;
}

export function buildOfficialUrl(channel) {
  return channel.officialUrl || `https://www.youtube.com/channel/${encodeURIComponent(channel.channelId)}/live`;
}

export function isAuthorizedChannel(channel) {
  try {
    const embed = new URL(buildLiveEmbedUrl(channel));
    const official = new URL(buildOfficialUrl(channel));
    return AUTHORIZED_EMBED_HOSTS.has(embed.hostname) && AUTHORIZED_OFFICIAL_HOSTS.has(official.hostname);
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
    toast.timer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  function filteredChannels() {
    return searchChannels(LIVE_CHANNELS, query);
  }

  function render() {
    const channels = filteredChannels();
    const grid = $('#grid');
    const count = $('#count');
    if (!grid || !count) return;

    count.textContent = `${channels.length} live channel${channels.length === 1 ? '' : 's'}`;
    $('#title').textContent = query ? `Results for “${query}”` : 'Official Live Channels';

    if (!channels.length) {
      grid.innerHTML = '<div class="empty"><strong>No channel found.</strong><span>Try a broadcaster, network, or keyword.</span></div>';
      return;
    }

    grid.innerHTML = channels.map(channel => {
      const initials = channel.title.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase();
      return `
        <article class="card" data-id="${channel.id}" tabindex="0" role="button" aria-label="Open ${channel.title} live player">
          <div class="channelArt"><span>${initials}</span><b>LIVE TV</b></div>
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
    $('#frame').src = buildLiveEmbedUrl(channel);
    $('#playerStatus').textContent = 'Connecting to the broadcaster’s official live endpoint…';
    $('#modal').hidden = false;
    document.body.style.overflow = 'hidden';

    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => {
      if (!$('#modal').hidden) {
        $('#playerStatus').textContent = 'If the broadcaster is currently off-air or blocks embedding, use Open Official Stream.';
      }
    }, 6500);
  }

  function closeChannel() {
    clearTimeout(statusTimer);
    $('#frame').src = 'about:blank';
    $('#modal').hidden = true;
    document.body.style.overflow = '';
    activeId = null;
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
  $('#modal')?.addEventListener('click', event => {
    if (event.target === $('#modal')) closeChannel();
  });
  $('#retry')?.addEventListener('click', () => {
    const channel = LIVE_CHANNELS.find(item => item.id === activeId);
    if (!channel) return;
    $('#frame').src = 'about:blank';
    setTimeout(() => { $('#frame').src = buildLiveEmbedUrl(channel); }, 80);
    $('#playerStatus').textContent = 'Retrying official live endpoint…';
  });
  $('#frame')?.addEventListener('load', () => {
    if ($('#frame').src !== 'about:blank') $('#playerStatus').textContent = 'Official live player loaded. Broadcast availability is controlled by the channel.';
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
