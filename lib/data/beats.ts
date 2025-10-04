export interface MusicSample {
  id: number;
  title: string;
  genre: string;
  bpm: number;
  key: string;
  url: string;
  category: string;
  gumroadUrl: string;
  producer: string;
  publishedDate: string;
  plays: number;
  artwork: string;
  price: number;
  discount?: string;
}

export const musicSamples: MusicSample[] = [
  { id: 16, title: 'Travis Scott Type beat "Take Over"', genre: 'Hip Hop', bpm: 120, key: 'C min', url: '/api/audio-proxy?id=1sH-pGNGCd8V5AMXHUlWJEbPOaO_SNV5N', category: 'Beats', gumroadUrl: 'https://gumroad.com/l/sample16', producer: 'R_JXY', publishedDate: '2023-10-10', plays: 5000, artwork: '/poster/music_poster4.png', price: 3499 },
];