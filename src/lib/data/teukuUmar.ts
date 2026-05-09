import type { HeroData } from "@/types";
import portrait from "@/assets/teukuumar.jpg";
import heroBg from "@/assets/bgteukuumar.png";
import g1 from "@/assets/teukuumarteman.jpg";
import g2 from "@/assets/makamteukuumar.jpeg";
import g3 from "@/assets/Tugu tempat gugurnya Teuku Umar di Meulaboh, Aceh 1916.jpg";
import g4 from "@/assets/gallery-tomb.jpg";

export const teukuUmarData: HeroData = {
  slug: "teuku umar",
  name: "Teuku Umar",
  title: "Panglima Perang",
  subtitle: "Panglima Strategi yang Tak Tertandingi",
  birthYear: 1854,
  deathYear: 1899,
  birthPlace: "Meulaboh, Aceh Barat",
  fightingStyle: "Perang Gerilya & Intelijen",
  mainWeapon: "Strategi & Kecerdikan",
  quote: "Beungoh singoh geutanyoe jep kupi di keude Meulaboh atawa ulon akan syahid",
  colorTheme: "maroon",
  portrait,
  heroBg,
  stats: [
    { label: "Kecerdikan Strategi", value: 99 },
    { label: "Kemampuan Tempur", value: 97 },
    { label: "Kepemimpinan", value: 96 },
    { label: "Taktik Intelijen", value: 100 },
  ],
  shortBio:
    "Teuku Umar (1854 – 1 Februari 1899) adalah seorang pemimpin gerilya melawan Belanda di Aceh selama Perang Aceh. Ia meninggal saat pasukan Belanda melancarkan serangan mendadak di Meulaboh. Jenazahnya dimakamkan di daerah Mugo Cut. ",
  longBio: [
    "Teuku Umar adalah pahlawan nasional asal Meulaboh, Aceh, yang dikenal karena kecerdasan dan keberaniannya dalam melawan penjajah Belanda sejak usia muda. Meskipun tidak mengenyam pendidikan formal, ia memiliki kemampuan kepemimpinan yang luar biasa dan strategi perang yang mumpuni. Perjuangannya semakin kuat setelah ia menikah dengan Cut Nyak Dhien pada tahun 1880, di mana keduanya bahu-membahu menggerakkan perlawanan rakyat Aceh untuk menyerang pos-pos pertahanan Belanda.",
    "Ciri khas perjuangan Teuku Umar terletak pada taktik \"pura-pura menyerah\" yang ia lakukan berkali-kali untuk mengelabui musuh. Ia sempat bergabung dengan dinas militer Belanda dan mendapatkan gelar Teuku Johan Pahlawan demi memperoleh logistik, senjata, dan kepercayaan dari pihak kolonial. Namun, setelah berhasil mengumpulkan kekuatan dan persenjataan yang cukup, ia selalu kembali memihak rakyat Aceh. Salah satu aksi heroiknya adalah membawa lari ratusan pucuk senjata dan amunisi milik Belanda pada tahun 1896 untuk memperkuat tentara Aceh di bawah satu komando.",
    "Perjuangan gigih Teuku Umar berakhir pada 11 Februari 1899 dalam sebuah pertempuran sengit di pinggiran kota Meulaboh. Beliau gugur setelah terkena tembakan pasukan Marsose Belanda yang telah mengintai kedatangannya melalui informasi dari mata-mata. Meski telah tiada, semangat perlawanannya diteruskan oleh Cut Nyak Dhien. Atas jasa-jasanya yang besar bagi kemerdekaan Indonesia, namanya kini diabadikan sebagai Pahlawan Nasional, nama jalan di berbagai kota, hingga nama universitas dan kapal perang TNI AL.",
    
  ],
  uniqueFacts: [
    { icon: "Eye", title: "Master Intelijen", desc: "Berpura-pura menyerah ke Belanda selama bertahun-tahun untuk mengumpulkan informasi dan senjata." },
    { icon: "Sword", title: "Penakluk Senjata", desc: "Berhasil dapatkan 800 senapan dan 17 meriam dari Belanda salah satu pencurian senjata terbesar dalam sejarah perang kolonial." },
    { icon: "Skull", title: "Gugur di Meulaboh", desc: "Gugur secara heroik dalam pertempuran di Meulaboh pada 11 Februari 1899 di tanah kelahirannya sendiri." },
    { icon: "Building", title: "Nama Abadi", desc: "Namanya diabadikan di jalan utama Jakarta dan kota-kota besar di seluruh Indonesia." },
    { icon: "Award", title: "Pahlawan Nasional", desc: "Ditetapkan sebagai Pahlawan Nasional Republik Indonesia atas jasa-jasa besarnya melawan penjajah." },
    { icon: "Shield", title: "Inspirasi TNI", desc: "Taktik gerilya dan intelijennya menjadi inspirasi strategi militer Indonesia hingga kini." },
  ],
  timeline: [
    { year: 1854, side: "left", title: "Kelahiran di Meulaboh", desc: "Lahir di Meulaboh, Aceh Barat dari keluarga uleebalang yang dihormati. Sejak kecil dikenal cerdas dan pemberani." },
    { year: 1873, side: "right", title: "Bergabung Perlawanan", desc: "Aktif berjuang sejak pecah Perang Aceh, memimpin pasukan kecil dan memenangkan banyak pertempuran." },
    { year: 1880, side: "left", title: "Menikahi Cut nyak dhien", desc: "Bersatu dengan Cut nyak dhien membentuk pasangan legendaris yang menjadi simbol perlawanan rakyat Aceh." },
    { year: 1883, side: "right", title: "Pura-pura Menyerah", desc: "Strategi genius: berpura-pura menyerah ke Belanda untuk memperoleh kepercayaan, pangkat, dan akses senjata." },
    { year: 1884, side: "left", title: "Berhasil Dapatkan Senjata", desc: "Berhasil kumpulkan 800 senapan dan 17 meriam dari Belanda dalam strategi 'Het Verraad van Teukoe Oemar'." },
    { year: 1896, side: "right", title: "Kembali ke Perlawanan", desc: "Balik melawan Belanda dengan senjata curian, melancarkan serangan-serangan dahsyat di seluruh Aceh." },
    { year: 1899, side: "left", title: "Gugur di Pertempuran Meulaboh", desc: "Gugur secara heroik pada 11 Februari 1899 di tanah kelahirannya, dalam pertempuran melawan pasukan Letnan Veltman." },
  ],
  legacy: [
    { icon: "Map", category: "Jalan Teuku Umar Jakarta", title: "Jalan Ibu Kota", desc: "Jalan utama di Jakarta diabadikan dengan namanya, menghubungkan kawasan Menteng dan menjadi salah satu jalan paling bersejarah." },
    { icon: "Award", category: "Pahlawan Nasional", title: "Pahlawan Nasional", desc: "Ditetapkan sebagai Pahlawan Nasional Indonesia atas jasa luar biasanya dalam memimpin perlawanan rakyat Aceh." },
    { icon: "Building2", category: "Nama Institusi", title: "Nama Institusi", desc: "Diabadikan dalam berbagai nama universitas, sekolah, rumah sakit, dan institusi militer di seluruh Indonesia." },
    { icon: "BookOpen", category: "Kurikulum Sejarah", title: "Kurikulum Sejarah", desc: "Kisah strateginya yang brilian dipelajari di seluruh Indonesia sebagai contoh kecerdikan dan keberanian pemimpin." },
    { icon: "Landmark", category: "Museum Aceh", title: "Koleksi Museum", desc: "Artefak, senjata, dan kisah perjuangannya tersimpan di Museum Aceh sebagai warisan bangsa yang tak ternilai." },
    { icon: "Shield", category: "Inspirasi Militer", title: "Inspirasi TNI", desc: "Taktik gerilya dan intelijennya menjadi inspirasi strategi militer modern Indonesia, dipelajari di akademi militer." },
  ],
  strategies: [
    { title: "Infiltrasi & Intelijen", desc: "Menyusup ke dalam tubuh musuh untuk mendapatkan informasi vital dan akses ke senjata.", effectiveness: 100 },
    { title: "Tipu Daya Penyerahan", desc: "Pura-pura menyerah untuk memperoleh kepercayaan dan senjata Belanda — strategi paling cerdik dalam sejarah.", effectiveness: 99 },
    { title: "Perang Gerilya Adaptif", desc: "Taktik gerilya yang terus berkembang sesuai medan dan situasi musuh.", effectiveness: 97 },
    { title: "Mobilisasi Rakyat", desc: "Menggerakkan seluruh lapisan masyarakat Aceh untuk berjuang bersama-sama.", effectiveness: 93 },
  ],
  gallery: [
    { title: "Teuku Umar Bersama Pengikutnya", category: "Foto Dokumenter", image: g1 },
    { title: "Makam Teuku Umar", category: "Situs Bersejarah", image: g2 },
    { title: "Tugu Tempat Gugurnya Teuku Umar", category: "Situs Bersejarah", image: g3 },
    { title: "Warisan Sejarah", category: "Peninggalan Abadi", image: g4 },
  ],
  heroStats: [
    { value: "45", label: "Tahun Usia Berjuang" },
    { value: "800+", label: "Senjata Direbut" },
    { value: "17", label: "Meriam Direbut" },
    { value: "10+", label: "Daerah Terpadu" },
  ],
};
