export type HeroFilter = 'all' | 'cut nyak dien' | 'teuku umar'
export type LocationType = 'ibu-kota' | 'tempat lahir' | 'pertempuran' | 'strategi' | 'pengasingan'

export interface WarLocation {
  id: string
  name: string
  year: number
  subtitle: string
  description: string
  type: LocationType
  hero: HeroFilter
  lat: number
  lng: number
  color: string
  badgeColor: string
  badgeLabel: string
}

export const warLocations: WarLocation[] = [
  {
    id: 'banda-aceh',
    name: 'Banda Aceh (Kutaraja)',
    year: 1873,
    subtitle: '1873 · Invasi Belanda Pertama ke Aceh',
    description: 'Di sinilah invasi besar-besaran Belanda pertama kali mendarat pada 1873. Kutaraja menjadi pusat konflik antara pasukan kolonial Belanda dan pejuang Aceh selama puluhan tahun.',
    type: 'ibu-kota',
    hero: 'all',
    lat: 5.5477,
    lng: 95.3239,
    color: '#E8A020',
    badgeColor: '#FFF3CD',
    badgeLabel: 'Ibu Kota · 1873'
  },
  {
    id: 'lampadang',
    name: 'Lampadang',
    year: 1848,
    subtitle: '1848 · Tempat Lahir Cut Nyak Dien',
    description: 'Lampadang di Aceh Besar adalah tanah kelahiran Cut Nyak Dien pada tahun 1848. Di sinilah ia tumbuh dalam keluarga bangsawan Aceh yang menjunjung tinggi nilai keislaman dan cinta tanah air.',
    type: 'tempat lahir',
    hero: 'cut nyak dien',
    lat: 5.4870,
    lng: 95.3100,
    color: '#E8A020',
    badgeColor: '#FFF3CD',
    badgeLabel: 'Tempat Lahir · 1848'
  },
  {
    id: 'meulaboh',
    name: 'Meulaboh',
    year: 1854,
    subtitle: '1854 · Tempat Lahir & Gugurnya Teuku Umar',
    description: 'Meulaboh adalah tanah kelahiran sekaligus tempat gugurnya Teuku Umar pada 11 Februari 1899. Di kota inilah sang panglima berjuang hingga titik darah penghabisan melawan pasukan Belanda.',
    type: 'pertempuran',
    hero: 'teuku umar',
    lat: 4.1408,
    lng: 96.1286,
    color: '#C0392B',
    badgeColor: '#FDECEA',
    badgeLabel: 'Pertempuran · 1899'
  },
  {
    id: 'gle-tarum',
    name: 'Gle Tarum',
    year: 1878,
    subtitle: '1878 · Gugurnya Teuku Ibrahim Lamnga',
    description: 'Di Gle Tarum pada 1878, suami pertama Cut Nyak Dien yaitu  Teuku Ibrahim Lamnga  gugur dalam pertempuran dahsyat melawan Belanda. Peristiwa ini mengubah Cut Nyak Dien dari seorang istri bangsawan menjadi pejuang tangguh.',
    type: 'pertempuran',
    hero: 'cut nyak dien',
    lat: 5.4200,
    lng: 95.5800,
    color: '#C0392B',
    badgeColor: '#FDECEA',
    badgeLabel: 'Pertempuran · 1878'
  },
  {
    id: 'pidie',
    name: 'Pidie (Sigli)',
    year: 1880,
    subtitle: '1880 · Pusat Perlawanan Gerilya',
    description: 'Wilayah Pidie menjadi salah satu basis perlawanan gerilya terpenting. Dari hutan-hutan lebat di sini, Teuku Umar dan Cut Nyak Dien memimpin serangan-serangan kejutan yang membuat Belanda kewalahan selama bertahun-tahun.',
    type: 'pertempuran',
    hero: 'all',
    lat: 5.3800,
    lng: 95.9400,
    color: '#C0392B',
    badgeColor: '#FDECEA',
    badgeLabel: 'Pertempuran · 1880'
  },
  {
    id: 'aceh-besar',
    name: 'Aceh Besar',
    year: 1893,
    subtitle: '1893 · Siasat Pura-Pura Menyerah',
    description: 'Di wilayah Aceh Besar, Teuku Umar melancarkan siasat brillian: berpura-pura menyerah kepada Belanda pada 1893. Ia berhasil mengumpulkan 800 senjata dan 17 meriam sebelum berbalik melawan Belanda pada 1896.',
    type: 'strategi',
    hero: 'teuku umar',
    lat: 5.5200,
    lng: 95.6500,
    color: '#27AE60',
    badgeColor: '#E8F8F1',
    badgeLabel: 'Strategi · 1893'
  },
  {
    id: 'lhokseumawe',
    name: 'Lhokseumawe',
    year: 1896,
    subtitle: '1896 · Teuku Umar Berbalik Melawan Belanda',
    description: 'Pada 1896, setelah berhasil mengumpulkan persenjataan besar, Teuku Umar secara resmi berbalik melawan Belanda dari wilayah ini. Belanda yang terkejut menyebut ini sebagai "pengkhianatan terbesar" dalam sejarah kolonial mereka.',
    type: 'pertempuran',
    hero: 'teuku umar',
    lat: 5.1801,
    lng: 97.1500,
    color: '#C0392B',
    badgeColor: '#FDECEA',
    badgeLabel: 'Pertempuran · 1896'
  },
  {
    id: 'sumedang',
    name: 'Sumedang, Jawa Barat',
    year: 1905,
    subtitle: '1905 · Pengasingan Cut Nyak Dien',
    description: 'Setelah ditangkap Belanda pada 1905, Cut Nyak Dien diasingkan ke Sumedang, Jawa Barat. Di tanah pengasingan inilah beliau wafat pada 6 November 1908. Makamnya kini menjadi situs ziarah nasional.',
    type: 'pengasingan',
    hero: 'cut nyak dien',
    lat: -6.8500,
    lng: 107.9200,
    color: '#8E44AD',
    badgeColor: '#F3E8FD',
    badgeLabel: 'Pengasingan · 1905'
  }
]

export const legendItems = [
  { type: 'ibu-kota', color: '#E8A020', label: 'Ibu Kota' },
  { type: 'tempat lahir', color: '#E8A020', label: 'Tempat Lahir' },
  { type: 'pertempuran', color: '#C0392B', label: 'Pertempuran' },
  { type: 'strategi', color: '#27AE60', label: 'Strategi' },
  { type: 'pengasingan', color: '#8E44AD', label: 'Pengasingan' },
]

// Titik-titik rute perjalanan (untuk polyline putus-putus di peta)
export const warRoute: [number, number][] = [
  [5.5477, 95.3239], // Banda Aceh
  [5.4870, 95.3100], // Lampadang
  [5.5200, 95.6500], // Aceh Besar
  [5.3800, 95.9400], // Pidie
  [5.4200, 95.5800], // Gle Tarum
  [5.1801, 97.1500], // Lhokseumawe
  [4.1408, 96.1286], // Meulaboh
]