import type { HeroData } from "@/types";
import portrait from "@/assets/cut-nyak-dien-portrait.jpg";
import heroBg from "@/assets/aceh-panorama.jpg";
import g1 from "@/assets/gallery-village.jpg";
import g2 from "@/assets/gallery-jungle.jpg";
import g3 from "@/assets/gallery-tomb.jpg";
import g4 from "@/assets/gallery-coast.jpg";

export const cutNyakDienData: HeroData = {
  slug: "cut nyak dien",
  name: "Cut Nyak Dien",
  title: "Srikandi Pejuang",
  subtitle: "Srikandi Aceh yang Tak Pernah Menyerah",
  birthYear: 1848,
  deathYear: 1908,
  birthPlace: "Lampadang, Aceh Besar",
  fightingStyle: "Perlawanan Moral & Spiritual",
  mainWeapon: "Semangat & Keteguhan",
  quote: "Mata uloen hitam bah jeut keu puteh kafe paleh han loen tem kalon rupa",
  colorTheme: "gold",
  portrait,
  heroBg,
  stats: [
    { label: "Keteguhan Hati", value: 98 },
    { label: "Kekuatan Moral", value: 95 },
    { label: "Daya Tahan", value: 90 },
    { label: "Semangat Juang", value: 100 },
  ],
  shortBio:
    "Cut Nyak Dien adalah seorang pemimpin pasukan gerilya Aceh selama Perang Aceh. Setelah kematian suaminya, Teuku Umar, ia memimpin aksi gerilya melawan Belanda selama 25 tahun. Ia dianugerahi gelar Pahlawan Nasional Indonesia secara anumerta pada 2 Mei 1964 oleh pemerintah Indonesia.",
  longBio: [
    "Kehidupan Awal dan Awal Mula Perlawanan\n\nCut Nyak Dhien lahir pada tahun 1848 di Aceh Besar dari keturunan keluarga bangsawan yang sangat taat beragama. Pada usia 12 tahun, ia dinikahkan dengan Teuku Cek Ibrahim Lamnga. Ketika Perang Aceh meletus pada tahun 1873 akibat agresi Belanda yang membakar Masjid Raya Baiturrahman, suaminya ikut maju ke garis depan. Gugurnya Ibrahim Lamnga pada tahun 1878 memicu kemarahan mendalam dalam diri Cut Nyak Dhien, membuatnya bersumpah untuk menghancurkan Belanda dan mendedikasikan seluruh hidupnya demi melawan penjajahan.",
    "Perjuangan Gerilya dan Penangkapan\n\nUntuk melanjutkan perjuangan, ia menikah lagi dengan tokoh pejuang Aceh, Teuku Umar, pada tahun 1880. Bersama-sama, mereka mengobarkan perang gerilya yang sangat menyulitkan Belanda, termasuk saat Teuku Umar menggunakan taktik berpura-pura menyerah untuk merampas senjata dan amunisi musuh. Setelah Teuku Umar gugur pada tahun 1899, Cut Nyak Dhien yang semakin menua tetap memimpin pasukan kecilnya di pedalaman Meulaboh. Kondisi fisiknya yang menurun, menderita rabun dan encok, membuat salah satu anak buahnya yang bernama Pang Laot merasa iba dan akhirnya melaporkan lokasi markas mereka, yang berujung pada penangkapan Cut Nyak Dhien oleh Belanda pada tahun 1901.",
    "Pengasingan, Wafat, dan Penghargaan\n\nPasca penangkapannya, Belanda mengasingkan Cut Nyak Dhien ke Sumedang, Jawa Barat, dengan tujuan memutus pengaruh dan semangat perlawanannya dari sisa-sisa pejuang di Aceh. Di tanah pengasingan, identitas aslinya ditutupi oleh Belanda, sehingga masyarakat setempat hanya mengenalnya sebagai \"Ibu Perbu\" yang dihormati karena pengetahuannya yang luas dalam agama Islam dan perannya sebagai guru mengaji. Ia wafat pada 6 November 1908 dan makamnya baru ditemukan secara resmi pada tahun 1959. Atas dedikasinya yang tak kenal lelah, Presiden Soekarno menetapkan Cut Nyak Dhien sebagai Pahlawan Nasional Indonesia pada tahun 1964, dan kisah kepahlawanannya terus dikenang hingga kini melalui berbagai karya seni seperti film dan teater.",
  ],
  uniqueFacts: [
    { icon: "Sword", title: "Memiliki Garis Keturunan Minangkabau", desc: "Meskipun dikenal sebagai simbol pahlawan perempuan Aceh, Cut Nyak Dhien rupanya masih memiliki darah keturunan Minangkabau dari pihak ayahnya." },
    { icon: "Heart", title: "Syarat Menikah Harus Berperang", desc: "Setelah suami pertamanya gugur, ia bersedia menerima lamaran Teuku Umar dengan satu syarat mutlak yang harus dipenuhi. Syarat tersebut adalah Teuku Umar harus mengizinkan dan memfasilitasinya untuk ikut bertempur langsung di medan perang melawan penjajah." },
    { icon: "Award", title: "Pantang Menangisi Syuhada", desc: "Ketika Teuku Umar gugur pada tahun 1899, putrinya yang bernama Cut Gambang menangis histeris meratapi kepergian sang ayah. Cut Nyak Dhien justru menampar putrinya tersebut dan mengingatkan bahwa perempuan Aceh pantang menangisi seseorang yang telah mati syahid." },
    { icon: "BookOpen", title: "Dikhianati Akibat Rasa Iba", desc: "Pang Laot yang merupakan anak buah kepercayaannya terpaksa membocorkan lokasi persembunyian mereka kepada Belanda karena rasa kasihan. Ia tidak tega melihat kondisi Cut Nyak Dhien yang semakin tua, menderita encok parah, rabun, dan kekurangan makanan di hutan." },
    { icon: "MapPin", title: "Misteri Makam 50 Tahun", desc: "Letak makam Cut Nyak Dhien sempat menjadi misteri selama puluhan tahun akibat identitasnya yang dirahasiakan oleh Belanda saat ia wafat pada 1908." },
    { icon: "Shield", title: 'Julukan "Ibu Perbu"', desc: "Saat diasingkan ke Jawa Barat, Belanda sengaja merahasiakan identitas aslinya dari masyarakat setempat agar tidak memicu pemberontakan baru." },
  ],
  timeline: [
    { year: 1848, side: "left", title: "Kelahiran di Lampadang", desc: "Cut Nyak Dien lahir di Lampadang, Aceh Besar. Ia adalah putri dari keluarga bangsawan Aceh yang terpandang. Sejak kecil, ia dididik dengan nilai-nilai keislaman yang kuat dan kecintaan pada tanah air Aceh." },
    { year: 1862, side: "right", title: "Pernikahan Pertama", desc: "Menikah dengan Teuku Ibrahim Lamnga, seorang pejuang Aceh yang gagah berani. Mereka membangun rumah tangga bahagia di tengah situasi politik yang mulai memanas." },
    { year: 1873, side: "left", title: "Perang Aceh Dimulai", desc: "Invasi besar-besaran Belanda ke Aceh mengubah segalanya. Cut Nyak Dien terlibat aktif dalam perlawanan bersama suaminya, mengangkat senjata demi kedaulatan tanah Aceh." },
    { year: 1878, side: "right", title: "Suami Pertama Gugur", desc: "Teuku Ibrahim Lamnga gugur dalam pertempuran di Gle Tarum. Kehilangan ini justru memperkuat tekadnya untuk terus berjuang melawan Belanda." },
    { year: 1880, side: "left", title: "Menikah dengan Teuku Umar", desc: "Cut Nyak Dien menerima lamaran Teuku Umar, panglima perang legendaris. Mereka bersatu untuk memperkuat perlawanan rakyat Aceh." },
    { year: 1899, side: "right", title: "Teuku Umar Gugur", desc: "Teuku Umar gugur tertembak dalam pertempuran di Meulaboh. Meski kembali kehilangan sosok suami, Cut Nyak Dhien pantang menyerah dan mengambil alih komando untuk terus melanjutkan perang gerilya." },
    { year: 1905, side: "left", title: "Ditangkap Belanda", desc: "Setelah perjuangan panjang, ia akhirnya tertangkap karena pengkhianatan dan diasingkan ke Sumedang, Jawa Barat." },
    { year: 1908, side: "right", title: "Wafat di Sumedang", desc: "Wafat dengan penuh kemuliaan di Sumedang. Namanya abadi sebagai simbol perlawanan dan keteguhan wanita Aceh." },
  ],
  legacy: [
    { icon: "Film", category: "Film Nasional (1988)", title: "Film Nasional", desc: 'Film epik "Cut Nyak Dien" dibintangi Christine Hakim meraih penghargaan di Festival Film Asia Pasifik dan menjadi film sejarah terbaik Indonesia.' },
    { icon: "DollarSign", category: "Uang Kertas", title: "Uang Kertas", desc: "Wajah Cut Nyak Dien pernah diabadikan dalam uang kertas Rupiah sebagai penghargaan atas pengorbanan dan jasa-jasanya untuk bangsa." },
    { icon: "MapPin", category: "Makam Bersejarah", title: "Makam Bersejarah", desc: "Makam Cut Nyak Dien di Sumedang menjadi situs ziarah nasional yang ramai dikunjungi setiap tahun, terutama pada Hari Pahlawan 10 November." },
    { icon: "Building2", category: "Nama Jalan & Institusi", title: "Nama Jalan", desc: "Nama Cut Nyak Dien diabadikan di ratusan nama jalan, sekolah, rumah sakit, dan institusi di seluruh Indonesia sebagai penghormatan abadi." },
    { icon: "Award", category: "Pahlawan Nasional 1964", title: "Pahlawan Nasional", desc: "Ditetapkan resmi oleh Presiden Soekarno melalui Keppres No. 106 Tahun 1964 sebagai Pahlawan Nasional Republik Indonesia." },
    { icon: "BookOpen", category: "Kurikulum Nasional", title: "Kurikulum Nasional", desc: "Kisah perjuangan Cut Nyak Dien masuk dalam kurikulum pendidikan nasional Indonesia, menginspirasi jutaan generasi penerus bangsa." },
  ],
  strategies: [
    { title: "Perang Gerilya Hutan", desc: "Berpindah-pindah di hutan rimba Aceh untuk menghindari kejaran Belanda dan melancarkan serangan kejutan.", effectiveness: 92 },
    { title: "Perlawanan Moral", desc: "Menginspirasi rakyat lewat keteguhan hati, menolak menyerah meski sudah sakit dan tua.", effectiveness: 98 },
    { title: "Penolakan Diplomatik", desc: "Menolak semua tawaran damai dan amnesti Belanda demi mempertahankan kedaulatan Aceh.", effectiveness: 85 },
    { title: "Jaringan Dukungan Rakyat", desc: "Membangun solidaritas dan dukungan rakyat Aceh untuk perlawanan jangka panjang.", effectiveness: 90 },
  ],
  gallery: [
    { title: "Kampung Halaman Aceh", category: "Dokumentasi Sejarah", image: g1 },
    { title: "Hutan Gerilya Aceh", category: "Medan Pertempuran", image: g2 },
    { title: "Makam Cut Nyak Dien", category: "Situs Bersejarah", image: g3 },
    { title: "Pesisir Aceh", category: "Tanah Leluhur", image: g4 },
  ],
  heroStats: [
    { value: "57", label: "Tahun Usia Berjuang" },
    { value: "31", label: "Tahun Perang Aceh" },
    { value: "1964", label: "Pahlawan Nasional" },
    { value: "6", label: "Anak yang Gugur" },
  ],
};
