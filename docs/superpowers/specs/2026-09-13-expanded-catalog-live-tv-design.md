# MovieXYZ Expanded Catalog + Live TV Design

## Goal
Expand MovieXYZ from a five-title open-movie demo into a searchable catalog with a dedicated Philippine Live TV section while preserving the authorized-source-only playback policy.

## Catalog
Movie playback remains limited to official Blender/Blender Studio releases and clearly licensed open movies. The target catalog contains at least 15 titles sourced from official Blender Studio, Blender Video/PeerTube, or Blender's official YouTube channel.

## Live TV
The Live TV section contains four Philippine broadcaster/news channels: PTV Philippines, GMA Integrated News, News5Everywhere, and One News PH. Each card uses the broadcaster's stable YouTube channel ID and the standard channel live endpoint. If the broadcaster is off-air or embedding is disabled, MovieXYZ exposes the official channel live page as a fallback instead of scraping or proxying another source.

## Navigation and Search
Top navigation becomes Home, Movies, Live TV, and My List. One search field searches titles, years, studios, broadcasters, descriptions, licenses, source labels, and tags. The current mode filters the combined catalog before search results are rendered.

## Playback
Movie items use either official Blender Video/PeerTube embeds or official YouTube embeds. Live items use `youtube.com/embed/live_stream?channel=...`. Every player modal provides an official-source/channel fallback.

## Safety / Rights Constraints
- No MoviePire scraping or proxying.
- No unauthorized re-hosting.
- No ad stripping or monetization bypass.
- Do not claim a live channel is currently on-air unless verified at that moment.

## Verification
Automated tests must cover catalog size, search across movies and broadcasters, mode filters, official-host allowlisting, and correct movie/live playback URL construction. GitHub Pages deployment must run the tests before publishing.
