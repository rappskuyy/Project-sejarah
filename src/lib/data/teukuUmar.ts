import type { HeroData } from "@/types";
import portrait from "@/assets/teuku-umar-portrait.jpg";
import heroBg from "@/assets/sunset-quote.jpg";
import g1 from "@/assets/gallery-coast.jpg";
import g2 from "@/assets/gallery-jungle.jpg";
import g3 from "@/assets/gallery-village.jpg";
import g4 from "@/assets/gallery-tomb.jpg";

export const teukuUmarData: HeroData = {
  slug: "teuku-umar",
  name: "Teuku Umar",
  title: "Panglima Perang",
  subtitle: "Panglima Strategi yang Tak Tertandingi",
  birthYear: 1854,
  deathYear: 1899,
  birthPlace: "Meulaboh, Aceh Barat",
  fightingStyle: "Perang Gerilya & Intelijen",
  mainWeapon: "Strategi & Kecerdikan",
  quote: "Biarkan mereka pikir kita menyerah, karena itulah senjata kita yang paling tajam.",
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
    "Teuku Umar adalah panglima perang legendaris Aceh yang dikenal karena kecerdikan strateginya yang luar biasa dalam melawan penjajahan Belanda. Taktik genius pura-pura menyerahnya berhasil melumpuhkan ratusan serdadu Belanda.",
  longBio: [
    "Teuku Umar lahir pada tahun 1854 di Meulaboh, Aceh Barat. Sejak muda ia dikenal sebagai pemuda cerdas, pemberani, dan memiliki naluri kepemimpinan yang kuat. Tumbuh di tengah keluarga uleebalang, ia dididik dengan nilai keislaman, kecakapan bela diri, dan strategi peperangan tradisional Aceh. Karakter dan kecerdasannya yang menonjol sejak dini menjadikannya panutan bagi para pemuda di kampungnya.",
    "Ketika Perang Aceh meletus pada 1873, Teuku Umar segera bergabung dengan barisan perlawanan. Ia memperlihatkan kecakapan luar biasa dalam memimpin pasukan kecil dan memenangkan banyak pertempuran melawan Belanda. Reputasinya melesat hingga menjadi panglima yang disegani kawan dan musuh. Pada 1880, ia menikahi Cut Nyak Dien, membentuk pasangan paling legendaris dalam sejarah Aceh.",
    "Strategi paling brilian Teuku Umar terjadi pada 1883: ia berpura-pura menyerah kepada Belanda. Selama bertahun-tahun ia 'bekerja' untuk Belanda, mendapatkan kepercayaan, pangkat, dan akses ke gudang senjata. Pada 1884, ia berhasil mengumpulkan lebih dari 800 senapan dan 17 meriam — lalu kembali ke pihak Aceh untuk melawan Belanda dengan senjata mereka sendiri. Peristiwa ini dikenal sebagai 'Het Verraad van Teukoe Oemar' (Pengkhianatan Teuku Umar) dan menjadi salah satu strategi militer paling cerdik dalam sejarah perang kolonial.",
    "Setelah kembali ke barisan perlawanan, Teuku Umar memimpin serangan demi serangan yang menghancurkan moral pasukan Belanda. Sayangnya, pada 11 Februari 1899, ia gugur secara heroik di tanah kelahirannya, Meulaboh, dalam pertempuran melawan pasukan Belanda yang dipimpin Letnan Veltman. Kepergiannya menjadi pukulan berat bagi Cut Nyak Dien, namun warisan strateginya terus hidup menginspirasi taktik militer modern Indonesia.",
  ],
  uniqueFacts: [
    { icon: "Eye", title: "Master Intelijen", desc: "Berpura-pura menyerah ke Belanda selama bertahun-tahun untuk mengumpulkan informasi dan senjata." },
    { icon: "Sword", title: "Penakluk Senjata", desc: "Berhasil dapatkan 800 senapan dan 17 meriam dari Belanda — salah satu pencurian senjata terbesar dalam sejarah perang kolonial." },
    { icon: "Skull", title: "Gugur di Meulaboh", desc: "Gugur secara heroik dalam pertempuran di Meulaboh pada 11 Februari 1899 di tanah kelahirannya sendiri." },
    { icon: "Building", title: "Nama Abadi", desc: "Namanya diabadikan di jalan utama Jakarta dan kota-kota besar di seluruh Indonesia." },
    { icon: "Award", title: "Pahlawan Nasional", desc: "Ditetapkan sebagai Pahlawan Nasional Republik Indonesia atas jasa-jasa besarnya melawan penjajah." },
    { icon: "Shield", title: "Inspirasi TNI", desc: "Taktik gerilya dan intelijennya menjadi inspirasi strategi militer Indonesia hingga kini." },
  ],
  timeline: [
    { year: 1854, side: "left", title: "Kelahiran di Meulaboh", desc: "Lahir di Meulaboh, Aceh Barat dari keluarga uleebalang yang dihormati. Sejak kecil dikenal cerdas dan pemberani." },
    { year: 1873, side: "right", title: "Bergabung Perlawanan", desc: "Aktif berjuang sejak pecah Perang Aceh, memimpin pasukan kecil dan memenangkan banyak pertempuran." },
    { year: 1880, side: "left", title: "Menikahi Cut Nyak Dien", desc: "Bersatu dengan Cut Nyak Dien membentuk pasangan legendaris yang menjadi simbol perlawanan rakyat Aceh." },
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
    { title: "Meulaboh, Aceh Barat", category: "Tanah Kelahiran", image: g1 },
    { title: "Medan Pertempuran", category: "Sejarah Perang", image: g2 },
    { title: "Strategi Gerilya", category: "Taktik Militer", image: g3 },
    { title: "Warisan Sejarah", category: "Peninggalan Abadi", image: g4 },
  ],
  heroStats: [
    { value: "45", label: "Tahun Usia Berjuang" },
    { value: "800+", label: "Senjata Direbut" },
    { value: "17", label: "Meriam Direbut" },
    { value: "∞", label: "Warisan Strategi" },
  ],
};
