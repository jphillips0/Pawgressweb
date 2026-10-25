// Fictional kennel used across every marketing mockup so the screens tell one story.

export const IMG = {
  oakley: '/astro/pets/oakley.webp',
  pumpkin: '/astro/pets/pumpkin.webp',
  murphy: '/astro/pets/murphy.webp',
  maple: '/astro/pets/maple.webp',
  biscuit: '/astro/pets/biscuit.webp',
  juniper: '/astro/pets/juniper.webp',
  litter: '/astro/pets/litter.webp',
  yard: '/astro/pets/update-yard.webp',
  bath: '/astro/pets/update-bath.webp',
  weighSheet: '/astro/pets/weigh-sheet.webp',
  vetCard: '/astro/pets/vet-card.webp',
  homeBuyer: '/astro/pets/home-buyer.webp',
  chatToy: '/astro/pets/chat-pumpkin-toy.webp',
  chatVideo: '/astro/pets/chat-pumpkin-video.webp',
  chatCrate: '/astro/pets/chat-pumpkin-crate.webp',
  buyerDana: '/astro/pets/buyer-dana.webp',
  buyerPriya: '/astro/pets/buyer-priya.webp',
  buyerChidi: '/astro/pets/buyer-chidi.webp',
  buyerMegan: '/astro/pets/buyer-megan.webp',
  kennel: '/astro/pets/kennel-avatar.webp',
  astroIcon: '/astro/astro-face.webp',
  astroJetpack: '/astro/astro-jetpack.webp',
};

export const KENNEL = {
  name: 'Willow Creek Doodles',
  short: 'Willow Creek',
  location: 'Leesburg, VA',
  tagline: 'F1b Mini Goldendoodles',
  bio: 'Small family program raising health-tested mini goldendoodles in our home, one litter at a time.',
};

export type Collar = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink';

export const COLLAR_HEX: Record<Collar, string> = {
  red: '#EF4444',
  blue: '#2563EB',
  green: '#16A34A',
  yellow: '#EAB308',
  purple: '#9333EA',
  pink: '#EC4899',
};

export type Pet = {
  id: string;
  name: string;
  img: string;
  collar: Collar;
  sex: 'Male' | 'Female';
  status: 'Reserved' | 'Available';
  family?: string;
  contact?: string;
  /** Full name and photo of the reserving buyer, as shown in the breeder's chat list. */
  buyer?: string;
  buyerImg?: string;
  weight: number;
  lastWeight: number;
};

export const LITTER = {
  name: 'Summer 2026 Litter',
  breed: 'F1b Mini Goldendoodle',
  dam: 'Hazel',
  sire: 'Bentley',
  born: 'Sep 6',
  age: '7 weeks',
  pickup: 'Oct 31',
};

export const PETS: Pet[] = [
  { id: 'oakley', name: 'Oakley', img: IMG.oakley, collar: 'red', sex: 'Male', status: 'Reserved', family: 'the Riveras', contact: 'Dana', buyer: 'Dana Rivera', buyerImg: IMG.buyerDana, weight: 6.4, lastWeight: 5.5 },
  { id: 'pumpkin', name: 'Pumpkin', img: IMG.pumpkin, collar: 'blue', sex: 'Female', status: 'Reserved', family: 'the Patels', contact: 'Priya', buyer: 'Priya Patel', buyerImg: IMG.buyerPriya, weight: 5.8, lastWeight: 5.0 },
  { id: 'murphy', name: 'Murphy', img: IMG.murphy, collar: 'green', sex: 'Male', status: 'Reserved', family: 'the Okafors', contact: 'Chidi', buyer: 'Chidi Okafor', buyerImg: IMG.buyerChidi, weight: 6.9, lastWeight: 6.0 },
  { id: 'maple', name: 'Maple', img: IMG.maple, collar: 'yellow', sex: 'Female', status: 'Reserved', family: 'Megan Lee', contact: 'Megan', buyer: 'Megan Lee', buyerImg: IMG.buyerMegan, weight: 5.6, lastWeight: 4.9 },
  { id: 'biscuit', name: 'Biscuit', img: IMG.biscuit, collar: 'purple', sex: 'Male', status: 'Available', weight: 6.1, lastWeight: 5.3 },
  { id: 'juniper', name: 'Juniper', img: IMG.juniper, collar: 'pink', sex: 'Female', status: 'Available', weight: 5.2, lastWeight: 4.5 },
];

export const pet = (id: string) => PETS.find((p) => p.id === id)!;

/** Oakley's weekly weigh-ins (lbs), birth through week 7. */
export const OAKLEY_WEIGHTS = [0.9, 1.6, 2.4, 3.1, 3.9, 4.6, 5.5, 6.4];
