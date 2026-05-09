// lib/data/warLocations.ts — Data historis lengkap & akurat

export type HeroFilter = 'all' | 'cut-nyak-dien' | 'teuku-umar'
export type LocationType = 'ibu-kota' | 'tempat-lahir' | 'pertempuran' | 'strategi' | 'pengasingan' | 'gugur' | 'pernikahan'

export interface WarLocation {
  id: string
  name: string
  subtitle: string
  description: string
  lat: number
  lng: number
  type: LocationType
  hero: HeroFilter
  color: string
  badgeColor: string
  badgeLabel: string
  year: string
}

export const warLocations: WarLocation[] = [

  // ═══════════════════════════════════════════
  // CUT NYAK DIEN — Perjalanan Lengkap
  // ═══════════════════════════════════════════

  {
    id: 'cnd-lahir',
    name: 'Lampadang, Aceh Besar',
    subtitle: '~1848 · Tempat Lahir Cut Nyak Dien',
    description: 'Cut Nyak Dien lahir di Lampadang sekitar tahun 1848, sebagai putri Teuku Nanta Setia — uleebalang VI Mukim yang dihormati. Ia tumbuh dalam lingkungan keluarga bangsawan yang taat beragama, menerima pendidikan Islam dan adat Aceh yang kuat sejak kecil.',
    lat: 5.4833, lng: 95.4333,
    type: 'tempat-lahir', hero: 'cut-nyak-dien',
    color: '#C8922A', badgeColor: '#FFF3CD', badgeLabel: '⭐ Tempat Lahir', year: '1848',
  },
  {
    id: 'cnd-nikah-1',
    name: 'Lamnga, Aceh Besar',
    subtitle: '1862 · Pernikahan Pertama',
    description: 'Cut Nyak Dien menikah dengan Teuku Ibrahim Lamnga, putra uleebalang Lam Nga XIII. Pernikahan ini menyatukan dua keluarga bangsawan Aceh. Kehidupan rumah tangga yang harmonis ini dijalani di Lamnga, sebelum Perang Aceh pecah dan mengubah segalanya.',
    lat: 5.5700, lng: 95.5200,
    type: 'pernikahan', hero: 'cut-nyak-dien',
    color: '#C8922A', badgeColor: '#FFF3CD', badgeLabel: '💍 Pernikahan I', year: '1862',
  },
  {
    id: 'cnd-suami-gugur',
    name: 'Gle Tarum, Aceh Besar',
    subtitle: '1878 · Suami Pertama Gugur',
    description: 'Teuku Ibrahim Lamnga gugur di Gle Tarum dalam pertempuran sengit melawan Belanda. Berita duka ini menghancurkan hati Cut Nyak Dien, namun sekaligus membakar tekad baja dalam dirinya. Ia menolak berlindung di tempat aman dan bersumpah melanjutkan perjuangan suaminya.',
    lat: 5.5200, lng: 95.6000,
    type: 'pertempuran', hero: 'cut-nyak-dien',
    color: '#C8922A', badgeColor: '#FFF3CD', badgeLabel: '⚔ Suami Gugur', year: '1878',
  },
  {
    id: 'cnd-nikah-2',
    name: 'Aceh Besar',
    subtitle: '1880 · Menikah dengan Teuku Umar',
    description: 'Setelah masa iddah, Cut Nyak Dien menerima lamaran Teuku Umar — panglima perang yang disegani seluruh Aceh. Pernikahan ini bukan sekadar ikatan cinta, tetapi juga memperkuat aliansi perjuangan. Cut Nyak Dien menjadi penasehat strategis dan pemompa semangat pasukan Teuku Umar.',
    lat: 5.4700, lng: 95.4500,
    type: 'pernikahan', hero: 'cut-nyak-dien',
    color: '#C8922A', badgeColor: '#FFF3CD', badgeLabel: '💍 Pernikahan II', year: '1880',
  },
  {
    id: 'cnd-gerilya-utara',
    name: 'Paya Bakong, Aceh Utara',
    subtitle: '1884–1890 · Gerilya Hutan Utara',
    description: 'Bersama Teuku Umar, Cut Nyak Dien menjalani kehidupan gerilya berpindah-pindah di hutan Aceh Utara. Penyakit rematik mulai menyerangnya, matanya perlahan melemah — namun ia menolak mundur. Ia merawat luka pasukan dan terus memompa semangat para pejuang.',
    lat: 4.9500, lng: 97.0833,
    type: 'strategi', hero: 'cut-nyak-dien',
    color: '#C8922A', badgeColor: '#FFF3CD', badgeLabel: '🏕 Gerilya Utara', year: '1884',
  },
  {
    id: 'cnd-dukung-infiltrasi',
    name: 'Kutaraja (Banda Aceh)',
    subtitle: '1893–1896 · Mendukung Strategi Suami',
    description: 'Cut Nyak Dien mendukung penuh manuver Teuku Umar yang berpura-pura menyerah ke Belanda demi memperoleh 800 senjata dan 25.000 peluru. Bersama Teuku Umar, ia menyaksikan senjata-senjata tersebut akhirnya digunakan untuk menyerang balik Belanda pada 1896.',
    lat: 5.5477, lng: 95.3239,
    type: 'strategi', hero: 'cut-nyak-dien',
    color: '#C8922A', badgeColor: '#FFF3CD', badgeLabel: '🎯 Strategi', year: '1893',
  },
  {
    id: 'cnd-perang-barat',
    name: 'Pesisir Barat Aceh',
    subtitle: '1896–1899 · Perang di Pantai Barat',
    description: 'Cut Nyak Dien mendampingi Teuku Umar memimpin serangan di sepanjang pesisir barat Aceh. Kondisi kesehatannya semakin menurun — mata hampir buta, rematik parah — namun semangat juangnya tak pernah padam. Rakyat setempat memandangnya sebagai simbol ketangguhan Aceh.',
    lat: 4.5000, lng: 95.9000,
    type: 'pertempuran', hero: 'cut-nyak-dien',
    color: '#C8922A', badgeColor: '#FFF3CD', badgeLabel: '⚔ Pantai Barat', year: '1896',
  },
  {
    id: 'cnd-suami-2-gugur',
    name: 'Meulaboh, Aceh Barat',
    subtitle: '11 Feb 1899 · Suami Kedua Gugur',
    description: 'Teuku Umar gugur pada 11 Februari 1899 akibat pengkhianatan seorang informan. Cut Nyak Dien kehilangan suami keduanya, namun dengan kondisi sakit parah, ia tetap menolak menyerah. Selama 6 tahun berikutnya ia memimpin sisa pasukan bergerilya sendirian di pedalaman Aceh.',
    lat: 4.1300, lng: 96.1100,
    type: 'pertempuran', hero: 'cut-nyak-dien',
    color: '#C8922A', badgeColor: '#FFF3CD', badgeLabel: '💔 Suami Gugur', year: '1899',
  },
  {
    id: 'cnd-gerilya-pedalaman',
    name: 'Pegunungan Aceh Tengah',
    subtitle: '1900–1904 · Gerilya di Pegunungan',
    description: 'Selama 4 tahun Cut Nyak Dien memimpin gerilya di pegunungan terjal Aceh Tengah. Hampir buta, berjalan pun susah karena rematik — namun ia terus memimpin. Para pejuang yang tersisa tetap setia mengikutinya karena keteguhan hatinya yang luar biasa.',
    lat: 4.6000, lng: 96.8000,
    type: 'strategi', hero: 'cut-nyak-dien',
    color: '#C8922A', badgeColor: '#FFF3CD', badgeLabel: '🏔 Gerilya', year: '1900',
  },
  {
    id: 'cnd-tertangkap',
    name: 'Beutong Ateuh, Nagan Raya',
    subtitle: '1905 · Persembunyian & Penangkapan',
    description: 'Di persembunyian terakhirnya, Pang Laot — pengikut paling setia — terpaksa memberitahu lokasi Cut Nyak Dien ke Belanda karena tidak sanggup melihat kondisinya yang sangat memprihatinkan. Belanda akhirnya menangkapnya dalam kondisi lemah tak berdaya, namun jiwanya tetap perkasa.',
    lat: 4.1000, lng: 96.3333,
    type: 'pertempuran', hero: 'cut-nyak-dien',
    color: '#C8922A', badgeColor: '#FFF3CD', badgeLabel: '🔒 Tertangkap', year: '1905',
  },
  {
    id: 'cnd-pengasingan',
    name: 'Sumedang, Jawa Barat',
    subtitle: '1905–1908 · Pengasingan',
    description: 'Belanda mengasingkan Cut Nyak Dien ke Sumedang — ribuan kilometer dari Aceh. Namun bahkan dalam pengasingan, semangatnya tidak padam. Ia mengajar mengaji kepada warga Sumedang, menebarkan ilmu dan nilai-nilai Islam. Warga Sumedang mengenangnya dengan penuh hormat.',
    lat: -6.8500, lng: 107.9200,
    type: 'pengasingan', hero: 'cut-nyak-dien',
    color: '#C8922A', badgeColor: '#FFF3CD', badgeLabel: '✈ Pengasingan', year: '1905',
  },
  {
    id: 'cnd-wafat',
    name: 'Gunung Puyuh, Sumedang',
    subtitle: '6 Nov 1908 · Wafat & Dimakamkan',
    description: 'Cut Nyak Dien wafat dengan tenang pada 6 November 1908. Ia dimakamkan di Gunung Puyuh, Sumedang. Pada 2 Mei 1964, Presiden Soekarno menganugerahinya gelar Pahlawan Nasional Indonesia. Makamnya kini menjadi situs sejarah yang dikunjungi ribuan orang setiap tahun.',
    lat: -6.8600, lng: 107.9300,
    type: 'gugur', hero: 'cut-nyak-dien',
    color: '#C8922A', badgeColor: '#FFF3CD', badgeLabel: '🕊 Wafat', year: '1908',
  },

  // ═══════════════════════════════════════════
  // TEUKU UMAR — Perjalanan Lengkap
  // ═══════════════════════════════════════════

  {
    id: 'tu-lahir',
    name: 'Meulaboh, Aceh Barat',
    subtitle: '~1854 · Tempat Lahir Teuku Umar',
    description: 'Teuku Umar Johan Pahlawan lahir di Meulaboh sekitar 1854 dari keluarga bangsawan Aceh. Sejak muda ia menunjukkan jiwa kepemimpinan dan keberanian yang luar biasa. Meulaboh menjadi basis utama perjuangannya sepanjang Perang Aceh dan tempat ia akhirnya gugur.',
    lat: 4.1417, lng: 96.1283,
    type: 'tempat-lahir', hero: 'teuku-umar',
    color: '#8B1A1A', badgeColor: '#FFE4E4', badgeLabel: '⭐ Tempat Lahir', year: '1854',
  },
  {
    id: 'tu-perlawanan-awal',
    name: 'Aceh Barat — Perlawanan Awal',
    subtitle: '1873–1880 · Memimpin Gerilya Pertama',
    description: 'Sejak Perang Aceh pecah (1873), Teuku Umar langsung memimpin pasukan di wilayah Aceh Barat. Ia membuktikan diri sebagai panglima yang cerdik dan berani, menguasai medan hutan dan pesisir Aceh Barat untuk menghalau patroli Belanda.',
    lat: 4.3000, lng: 96.0000,
    type: 'pertempuran', hero: 'teuku-umar',
    color: '#8B1A1A', badgeColor: '#FFE4E4', badgeLabel: '⚔ Perlawanan Awal', year: '1873',
  },
  {
    id: 'tu-nikah-cnd',
    name: 'Aceh Besar',
    subtitle: '1880 · Menikahi Cut Nyak Dien',
    description: 'Teuku Umar menikahi Cut Nyak Dien, janda Teuku Ibrahim Lamnga yang gugur. Pernikahan ini mempersatukan dua kekuatan perjuangan — ketangkasan militer Teuku Umar dengan keteguhan moral Cut Nyak Dien. Pasangan ini menjadi simbol perlawanan paling ikonik dalam Perang Aceh.',
    lat: 5.4700, lng: 95.4500,
    type: 'pernikahan', hero: 'teuku-umar',
    color: '#8B1A1A', badgeColor: '#FFE4E4', badgeLabel: '💍 Menikah', year: '1880',
  },
  {
    id: 'tu-infiltrasi',
    name: 'Kutaraja (Banda Aceh)',
    subtitle: '1893 · Penyerahan Pura-Pura',
    description: 'Teuku Umar melancarkan strategi paling berani dalam Perang Aceh: berpura-pura menyerah ke Belanda. Ia mendapat kepercayaan Belanda dan berhasil mengumpulkan 800 senjata, 17 meriam, dan 25.000 butir peluru. Belanda menjulukinya "De Verrader" (si pengkhianat) namun rakyat Aceh menyebutnya pahlawan cerdik.',
    lat: 5.5477, lng: 95.3239,
    type: 'strategi', hero: 'teuku-umar',
    color: '#8B1A1A', badgeColor: '#FFE4E4', badgeLabel: '🎭 Infiltrasi', year: '1893',
  },
  {
    id: 'tu-balik-menyerang',
    name: 'Aceh Barat — Serangan Balik',
    subtitle: '1896 · Membalikkan Senjata Belanda',
    description: 'Pada 1896 Teuku Umar membalikkan senjata hasil infiltrasi untuk menyerang Belanda — mengejutkan Hindia Belanda. Serangan gerilya terorganisir ini membuat Belanda kewalahan. Ini dianggap sebagai salah satu manuver militer paling brillian dalam sejarah perlawanan nusantara.',
    lat: 4.5000, lng: 95.8000,
    type: 'pertempuran', hero: 'teuku-umar',
    color: '#8B1A1A', badgeColor: '#FFE4E4', badgeLabel: '⚔ Serangan Balik', year: '1896',
  },
  {
    id: 'tu-gerilya-barat',
    name: 'Pesisir Barat — Perang Gerilya',
    subtitle: '1896–1899 · Memimpin Gerilya Barat',
    description: 'Selama tiga tahun Teuku Umar memimpin perang gerilya intensif di pesisir barat Aceh. Ia menghindari pertempuran frontal, menyerang pos-pos Belanda secara mendadak lalu menghilang ke hutan. Taktik ini menginspirasi gerakan perlawanan bersenjata di seluruh Asia Tenggara.',
    lat: 4.2000, lng: 96.0500,
    type: 'strategi', hero: 'teuku-umar',
    color: '#8B1A1A', badgeColor: '#FFE4E4', badgeLabel: '🎯 Gerilya', year: '1897',
  },
  {
    id: 'tu-gugur',
    name: 'Meulaboh — Pertempuran Terakhir',
    subtitle: '11 Feb 1899 · Gugur dalam Pertempuran',
    description: 'Pada 11 Februari 1899, Teuku Umar gugur di dekat Meulaboh setelah posisinya dikhianati informan. Ia ditembak dalam penyergapan Belanda. Meski gugur, warisan strategi gerilyanya diteruskan Cut Nyak Dien. Ia diakui sebagai Pahlawan Nasional Indonesia pada tahun 1973.',
    lat: 4.1300, lng: 96.1100,
    type: 'gugur', hero: 'teuku-umar',
    color: '#8B1A1A', badgeColor: '#FFE4E4', badgeLabel: '🕊 Gugur', year: '1899',
  },

  // ═══════════════════════════════════════════
  // LOKASI BERSAMA (Semua Lokasi)
  // ═══════════════════════════════════════════

  {
    id: 'kutaraja-pusat',
    name: 'Kutaraja (Banda Aceh)',
    subtitle: '1873 · Pusat Kesultanan & Perang',
    description: 'Pusat Kesultanan Aceh dan titik awal Perang Aceh. Belanda melancarkan dua ekspedisi besar ke sini. Jenderal Köhler tewas dalam ekspedisi pertama (1873). Kota ini menjadi simbol kedaulatan Aceh yang terus dipertahankan selama lebih dari tiga dekade.',
    lat: 5.5477, lng: 95.3239,
    type: 'ibu-kota', hero: 'all',
    color: '#4A2C8B', badgeColor: '#EDE8FF', badgeLabel: '🏰 Ibu Kota', year: '1873',
  },
  {
    id: 'sigli-perlawanan',
    name: 'Sigli (Pidie)',
    subtitle: '1875–1900 · Pusat Perlawanan Gerilya',
    description: 'Pidie (Sigli) menjadi salah satu pusat perlawanan terkuat Aceh. Ulama dan uleebalang Pidie banyak bergabung dalam perlawanan. Baik Teuku Umar maupun jaringan perjuangan Cut Nyak Dien pernah berkoordinasi dengan pemimpin perlawanan di wilayah ini.',
    lat: 5.3833, lng: 95.9667,
    type: 'pertempuran', hero: 'all',
    color: '#4A7C3F', badgeColor: '#E8F5E9', badgeLabel: '🛡 Perlawanan', year: '1875',
  },
  {
    id: 'lhokseumawe-front',
    name: 'Lhokseumawe, Aceh Utara',
    subtitle: '1880–1905 · Front Pertempuran Utara',
    description: 'Lhokseumawe menjadi front pertempuran penting di utara Aceh. Belanda membangun benteng untuk mengendalikan jalur perdagangan. Para pejuang Aceh secara konsisten menyerang pos-pos Belanda di wilayah ini selama lebih dari dua dekade perlawanan.',
    lat: 5.1801, lng: 97.1507,
    type: 'pertempuran', hero: 'all',
    color: '#4A7C3F', badgeColor: '#E8F5E9', badgeLabel: '⚔ Front Utara', year: '1880',
  },
]

// Rute perjalanan perjuangan [lat, lng]
export const warRoute: [number, number][] = [
  [5.5477, 95.3239], // Kutaraja
  [5.4833, 95.4333], // Lampadang
  [5.5700, 95.5200], // Lamnga
  [5.5200, 95.6000], // Gle Tarum
  [5.3833, 95.9667], // Sigli
  [5.1801, 97.1507], // Lhokseumawe
  [4.9500, 97.0833], // Paya Bakong
  [4.6000, 96.8000], // Aceh Tengah
  [4.5000, 95.9000], // Pesisir Barat
  [4.3000, 96.0000], // Aceh Barat
  [4.1417, 96.1283], // Meulaboh
  [4.1000, 96.3333], // Beutong Ateuh
]

export const legendItems = [
  { type: 'ibu-kota',     color: '#4A2C8B', label: 'Ibu Kota / Pusat Pemerintahan' },
  { type: 'tempat-lahir', color: '#C8922A', label: 'Tempat Lahir Pahlawan' },
  { type: 'pernikahan',   color: '#E91E8C', label: 'Peristiwa Pernikahan' },
  { type: 'pertempuran',  color: '#8B1A1A', label: 'Lokasi Pertempuran' },
  { type: 'strategi',     color: '#4A7C3F', label: 'Markas / Strategi Perang' },
  { type: 'gugur',        color: '#455A64', label: 'Tempat Gugur / Wafat' },
  { type: 'pengasingan',  color: '#6B4423', label: 'Tempat Pengasingan' },
]