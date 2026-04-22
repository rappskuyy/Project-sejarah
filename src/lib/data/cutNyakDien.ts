import type { HeroData } from "@/types";
import portrait from "@/assets/cut-nyak-dien-portrait.jpg";
import heroBg from "@/assets/aceh-panorama.jpg";
import g1 from "@/assets/gallery-village.jpg";
import g2 from "@/assets/gallery-jungle.jpg";
import g3 from "@/assets/gallery-tomb.jpg";
import g4 from "@/assets/gallery-coast.jpg";

export const cutNyakDienData: HeroData = {
  slug: "cut-nyak-dien",
  name: "Cut Nyak Dien",
  title: "Srikandi Pejuang",
  subtitle: "Srikandi Aceh yang Tak Pernah Menyerah",
  birthYear: 1848,
  deathYear: 1908,
  birthPlace: "Lampadang, Aceh Besar",
  fightingStyle: "Perlawanan Moral & Spiritual",
  mainWeapon: "Semangat & Keteguhan",
  quote: "Mati di tangan musuh lebih terhormat daripada hidup di bawah penindasan mereka.",
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
    "Cut Nyak Dien adalah pahlawan nasional Indonesia dari Aceh yang berjuang melawan penjajahan Belanda dengan penuh semangat dan keberanian. Meski mengalami berbagai kesedihan dan penyakit, ia tidak pernah menyerah dalam perjuangannya untuk kemerdekaan tanah Aceh tercinta.",
  longBio: [
    "Cut Nyak Dien lahir sekitar tahun 1848 di Lampadang, Aceh Besar, dari keluarga bangsawan yang terpandang. Ayahnya, Teuku Nanta Setia, adalah seorang uleebalang (pemimpin adat) yang disegani di wilayah VI Mukim. Sejak kecil, Cut Nyak Dien tumbuh dalam lingkungan yang menjunjung tinggi nilai keislaman, adat istiadat Aceh, dan semangat cinta tanah air yang kuat. Pendidikan agama dan budaya yang ia terima sejak dini membentuk karakter baja yang kelak menjadi pijakan perjuangannya.",
    "Pada usia muda, ia menikah dengan Teuku Ibrahim Lamnga, seorang bangsawan dan pejuang Aceh. Pernikahan itu melahirkan kebahagiaan yang singkat, karena pada tahun 1873, invasi besar-besaran Belanda ke Aceh mengubah segalanya. Teuku Ibrahim Lamnga gugur dalam pertempuran dahsyat di Gle Tarum pada 1878. Kehilangan suami tidak membuat Cut Nyak Dien patah semangat — sebaliknya, api perlawanannya semakin berkobar. Ia menolak semua tawaran Belanda untuk hidup damai dan justru memilih melanjutkan perjuangan.",
    "Dalam masa berkabung itulah Teuku Umar, panglima perang Aceh yang legendaris, melamarnya. Pada tahun 1880, Cut Nyak Dien menerima lamaran tersebut — bukan hanya karena ikatan batin, tetapi juga karena keyakinannya bahwa bersama Teuku Umar, perjuangan melawan Belanda akan semakin kuat. Pasangan ini menjadi simbol perlawanan yang paling disegani di seluruh Aceh. Mereka memimpin pasukan gerilya dari pedalaman hutan, melancarkan serangan-serangan mengejutkan yang membuat Belanda terus kewalahan selama bertahun-tahun.",
    "Namun cobaan demi cobaan terus berdatangan. Pada 1896, Teuku Umar gugur dalam pertempuran di Meulaboh. Cut Nyak Dien, yang sudah mulai mengidap rematik parah dan rabun mata akibat kehidupan keras di hutan, tetap memimpin perlawanan. Pada 1905, ia akhirnya tertangkap karena pengkhianatan dan diasingkan ke Sumedang, Jawa Barat. Di sanalah ia wafat pada tahun 1908 dengan penuh kemuliaan. Pada 2 Mei 1964, ia ditetapkan sebagai Pahlawan Nasional Indonesia oleh Presiden Soekarno.",
  ],
  uniqueFacts: [
    { icon: "Sword", title: "Pejuang Sejati", desc: "Terus berjuang meski menderita rematik & rabun mata akibat kehidupan berat di hutan selama bertahun-tahun." },
    { icon: "Heart", title: "Cinta Tanah Air", desc: "Menolak semua tawaran kehidupan nyaman oleh Belanda dan memilih hidup susah demi mempertahankan prinsip dan cinta pada Aceh." },
    { icon: "Award", title: "Pahlawan Nasional", desc: "Ditetapkan sebagai Pahlawan Nasional Indonesia pada 2 Mei 1964, menjadikannya simbol keberanian dan keteguhan wanita Indonesia." },
    { icon: "BookOpen", title: "Inspirasi Generasi", desc: "Kisah heroiknya diabadikan dalam film 'Cut Nyak Dien' (1988) yang dibintangi Christine Hakim, meraih penghargaan internasional." },
    { icon: "MapPin", title: "Makam di Sumedang", desc: "Makam Cut Nyak Dien berada di Sumedang, Jawa Barat. Kini menjadi situs bersejarah yang banyak dikunjungi untuk mengenang jasa-jasanya." },
    { icon: "Shield", title: "Strategi Gerilya", desc: "Bersama Teuku Umar, Cut Nyak Dien mengembangkan taktik perang gerilya yang sangat efektif sehingga membuat Belanda kewalahan selama puluhan tahun." },
  ],
  timeline: [
    { year: 1848, side: "left", title: "Kelahiran di Lampadang", desc: "Cut Nyak Dien lahir di Lampadang, Aceh Besar. Ia adalah putri dari keluarga bangsawan Aceh yang terpandang. Sejak kecil, ia dididik dengan nilai-nilai keislaman yang kuat dan kecintaan pada tanah air Aceh." },
    { year: 1862, side: "right", title: "Pernikahan Pertama", desc: "Menikah dengan Teuku Ibrahim Lamnga, seorang pejuang Aceh yang gagah berani. Mereka membangun rumah tangga bahagia di tengah situasi politik yang mulai memanas." },
    { year: 1873, side: "left", title: "Perang Aceh Dimulai", desc: "Invasi besar-besaran Belanda ke Aceh mengubah segalanya. Cut Nyak Dien terlibat aktif dalam perlawanan bersama suaminya, mengangkat senjata demi kedaulatan tanah Aceh." },
    { year: 1878, side: "right", title: "Suami Pertama Gugur", desc: "Teuku Ibrahim Lamnga gugur dalam pertempuran di Gle Tarum. Kehilangan ini justru memperkuat tekadnya untuk terus berjuang melawan Belanda." },
    { year: 1880, side: "left", title: "Menikah dengan Teuku Umar", desc: "Cut Nyak Dien menerima lamaran Teuku Umar, panglima perang legendaris. Mereka bersatu untuk memperkuat perlawanan rakyat Aceh." },
    { year: 1896, side: "right", title: "Teuku Umar Gugur", desc: "Teuku Umar gugur di Meulaboh — cobaan terberat. Meski tubuhnya mulai sakit, semangatnya tidak pernah padam." },
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
    { value: "60+", label: "Tahun Usia Berjuang" },
    { value: "26", label: "Tahun Perang Aceh" },
    { value: "1964", label: "Pahlawan Nasional" },
    { value: "∞", label: "Warisan Inspirasi" },
  ],
};
