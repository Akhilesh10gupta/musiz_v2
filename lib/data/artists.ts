// lib/data/artists.ts

export const ARTISTS = [
  {
    name: 'AD Rapstar',
    genre: 'Hip-hop, Pop',
    description: 'A visionary artist and Grammy-nominated producer, AD Rapstar blends ethereal electronic textures with raw organic sounds to craft immersive sonic experiences that defy genre boundaries',
    achievement: '500M+ Streams',
    image: '/team/ad.jpg',
    color: 'purple',
    quote: 'SoundForge transformed my artistic vision into sonic reality. The team’s expertise is unmatched.',
  },
  {
    name: 'R Jxy',
    genre: 'Hip-hop, Pop',
    description: 'Versatile Hip-hop and Pop artist blending catchy hooks with dynamic lyrical flow and high-energy performances.',
    achievement: '50M+ Streams',
    image: '/team/r_jxy.jpg',
    color: 'cyan',
    quote: 'Recording at SoundForge was a game-changer. They captured our energy perfectly.',
  },
  {
    name: 'Aun Shah',
    genre: 'Hip-hop, Pop',
    description: 'Dynamic Hip-hop and Pop performer known for blending sharp lyrical delivery with infectious pop melodies and stage charisma.',
    achievement: 'Multi-Platinum Artist',
    image: '/artist/male-avatar.jpg',
    color: 'gold',
    quote: 'The vocal booth at SoundForge brings out the best in every performance. Pure magic.',
  },
  {
    name: 'KRSH',
    genre: 'Hip-hop',
    description: 'Innovative Hip-hop duo known for experimental beats, gritty flows, and pushing the boundaries of underground sound.',
    achievement: 'Spotify Editorial',
    image: '/artist/male-avatar.jpg',
    color: 'purple',
    quote: 'SoundForge understood our retro-futuristic vision and helped us bring it to life.',
  },
  {
    name: 'Emcee Subu',
    genre: 'Hip-hop',
    description: 'Critically acclaimed Hip-hop lyricist celebrated for powerful storytelling, social commentary, and thought-provoking verses.',
    achievement: 'Emmy Winner',
    image: '/artist/male-avatar.jpg',
    color: 'cyan',
    quote: 'The orchestral recording capabilities at SoundForge are world-class. Incredible space.',
  },
  // {
  //   name: 'Neon Nights',
  //   genre: 'Pop / Dance',
  //   description: 'High-energy pop duo creating infectious dance tracks that dominate radio and streaming charts.',
  //   achievement: '300M+ Streams',
  //   image: '💫',
  //   color: 'gold',
  //   quote: 'SoundForge’s production team helped us create our biggest hits. They get our vision.',
  // },
] as const

export type Artist = (typeof ARTISTS)[number]
