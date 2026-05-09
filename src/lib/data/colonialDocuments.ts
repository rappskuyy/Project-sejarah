// lib/data/colonialDocuments.ts
// ⚠️ PENTING: Seluruh dokumen di bawah adalah REKONSTRUKSI FIKSI IMAJINATIF
// yang dibuat berdasarkan fakta dan peristiwa sejarah yang terdokumentasi.
// Dokumen aslinya tidak tersedia secara publik. Ini adalah interpretasi edukatif.

export interface ColonialDocument {
  id: string
  title: string
  date: string
  type: string
  from: string
  to: string
  content: string
  context: string
  historianNote: string
  hero: 'cut-nyak-dien' | 'teuku-umar' | 'keduanya'
}

export const colonialDocuments: ColonialDocument[] = [

  // ══════════════════════════════════════
  // DOKUMEN TEUKU UMAR
  // ══════════════════════════════════════

  {
    id: 'tu-surat-penyerahan',
    hero: 'teuku-umar',
    title: 'Surat Penyerahan Diri (Palsu)',
    date: 'Maret 1893',
    type: 'Surat Resmi · Teuku Umar',
    from: 'Teuku Umar',
    to: 'Gubernur Jenderal Belanda, Batavia',
    content: `Yang Mulia Tuan Gubernur Jenderal,

Dengan segala kerendahan hati, hamba menyatakan kesediaan untuk tunduk kepada pemerintah Hindia Belanda dan berjanji tidak akan mengangkat senjata lagi. Hamba memohon perlindungan dan kepercayaan Tuan demi keselamatan rakyat di bawah naungan hamba.

Sebagai tanda itikad baik, hamba siap membantu pemerintah dalam menjaga ketertiban di Aceh Barat.

Hormat hamba,
Teuku Umar Johan Pahlawan`,
    context: `Pada Maret 1893, Teuku Umar melakukan manuver politik yang mengejutkan — ia berpura-pura menyerah kepada Belanda. Strategi ini memungkinkannya mendapatkan kepercayaan penuh dari pihak kolonial, termasuk akses ke gudang senjata. Dalam waktu tiga tahun, ia berhasil mengumpulkan 800 senjata dan 25.000 peluru sebelum akhirnya berbalik menyerang Belanda pada 1896.`,
    historianNote: `Taktik "menyerah palsu" ini dianggap sebagai salah satu manuver intelijen paling brillian dalam sejarah perlawanan nusantara. Belanda kemudian menjulukinya "De Verrader van Teuku Umar" (Pengkhianat Teuku Umar), sementara rakyat Aceh mengenangnya sebagai kecerdikan seorang pahlawan.`,
  },
  {
    id: 'tu-laporan-belanda',
    hero: 'teuku-umar',
    title: 'Laporan Intelijen Belanda',
    date: 'Februari 1896',
    type: 'Laporan Rahasia · Pemerintah Kolonial',
    from: 'Mayor Van der Wijck, Komandan Aceh',
    to: 'Gubernur Jenderal, Batavia',
    content: `Laporan Rahasia No. 47/1896

Yang Terhormat,

Dengan sangat menyesal kami laporkan bahwa Teuku Umar telah mengkhianati kepercayaan pemerintah. Ia melarikan diri bersama 800 pucuk senjata, 17 meriam, dan 25.000 butir amunisi dari gudang senjata di Kutaraja.

Pasukan marsose telah diperintahkan untuk melakukan pengejaran segera. Situasi di Aceh Barat memerlukan penanganan darurat.

Hormat kami,
Mayor Van der Wijck`,
    context: `Dokumen ini menggambarkan kepanikan pihak Belanda ketika menyadari bahwa Teuku Umar telah mengelabui mereka selama tiga tahun. Pencurian senjata besar-besaran ini menjadi berita besar di seluruh Hindia Belanda dan membuat reputasi Belanda tercoreng.`,
    historianNote: `Peristiwa ini dikenal dalam catatan Belanda sebagai "Het Verraad van Teukoe Oemar" (Pengkhianatan Teuku Umar). Senjata-senjata hasil aksi ini digunakan untuk melancarkan serangan besar di seluruh wilayah Aceh, memperlemah posisi Belanda selama bertahun-tahun.`,
  },
  {
    id: 'tu-surat-terakhir',
    hero: 'teuku-umar',
    title: 'Pesan Terakhir Teuku Umar',
    date: '10 Februari 1899',
    type: 'Surat Pribadi · Teuku Umar',
    from: 'Teuku Umar',
    to: 'Cut Nyak Dien (Istri)',
    content: `Istriku yang tercinta,

Besok pagi kita akan menyerang pos Belanda di Meulaboh. Hati saya mantap, karena perjuangan ini adalah kewajiban kita sebagai orang Aceh yang beriman.

Jika takdir menghendaki saya gugur, teruslah berjuang. Jangan biarkan api perlawanan padam. Aceh harus merdeka, walau harus dibayar dengan nyawa.

Beungoh singoh geutanyoe jep kupi di keude Meulaboh atawa ulon akan syahid.
(Besok pagi kita minum kopi di Meulaboh atau aku akan syahid.)

Suamimu,
Teuku Umar`,
    context: `Teuku Umar gugur pada 11 Februari 1899 dalam penyergapan pasukan marsose Belanda di dekat Meulaboh. Sehari sebelumnya, ia dilaporkan mengucapkan kata-kata yang kemudian menjadi kutipan legendaris tentang tekadnya menghadapi pertempuran terakhir.`,
    historianNote: `Kutipan terakhir Teuku Umar — "Besok pagi kita minum kopi di Meulaboh atau aku akan syahid" — menjadi salah satu ucapan paling ikonik dalam sejarah perlawanan Aceh. Ini mencerminkan keyakinan dan ketenangan jiwa seorang pejuang sejati menghadapi kemungkinan kematian.`,
  },

  // ══════════════════════════════════════
  // DOKUMEN CUT NYAK DIEN
  // ══════════════════════════════════════

  {
    id: 'cnd-penolakan-belanda',
    hero: 'cut-nyak-dien',
    title: 'Penolakan Tawaran Damai',
    date: 'Agustus 1901',
    type: 'Surat Balasan · Cut Nyak Dien',
    from: 'Cut Nyak Dien',
    to: 'Kapten Veltman, Komandan Belanda Meulaboh',
    content: `Tuan Kapten,

Surat tawaran damai Tuan telah hamba terima. Hamba menolak dengan tegas setiap tawaran yang datang dari penjajah tanah hamba.

Selama masih ada napas dalam dada hamba, selama itu pula hamba tidak akan menyerah. Aceh adalah tanah yang diberikan Allah — tidak ada satu kekuatan pun yang berhak merampasnya dari tangan kami.

Sampaikan kepada atasan Tuan: kami tidak membutuhkan belas kasihan Belanda.

Cut Nyak Dien
Pejuang Aceh`,
    context: `Meski dalam kondisi sakit parah — rematik yang membuatnya hampir tidak bisa berjalan dan rabun yang hampir membutakannya — Cut Nyak Dien berkali-kali menolak tawaran amnesti Belanda. Sikapnya yang tak tergoyahkan ini menjadi inspirasi bagi sisa-sisa pasukan Aceh yang masih berjuang.`,
    historianNote: `Penolakan-penolakan ini tercatat dalam berbagai laporan militer Belanda sebagai bukti betapa sulitnya "menaklukkan" semangat Cut Nyak Dien. Belanda akhirnya memilih strategi pengasingan — memindahkannya jauh dari Aceh — karena tak mampu mematahkan semangatnya lewat rayuan damai.`,
  },
  {
    id: 'cnd-laporan-penangkapan',
    hero: 'cut-nyak-dien',
    title: 'Laporan Penangkapan Cut Nyak Dien',
    date: 'November 1905',
    type: 'Laporan Resmi · Pemerintah Kolonial',
    from: 'Letnan Kolonel Van Daalen, Komandan Aceh',
    to: 'Gubernur Jenderal, Batavia',
    content: `Laporan Resmi No. 112/1905

Yang Terhormat Gubernur Jenderal,

Dengan hormat kami laporkan bahwa Cut Nyak Dien, istri almarhum Teuku Umar, berhasil diamankan pada tanggal 6 November 1905 di Beutong Ateuh, Nagan Raya.

Kondisi tertangkap: sangat lemah, menderita rematik parah, dan hampir buta. Informasi lokasi diperoleh dari Pang Laot, salah satu pengikutnya.

Kami merekomendasikan pengasingan segera ke luar Aceh untuk mencegah ia menjadi simbol perlawanan lebih lanjut.

Hormat kami,
Letnan Kolonel Van Daalen`,
    context: `Penangkapan Cut Nyak Dien pada 1905 menjadi akhir dari perlawanan bersenjata yang berlangsung lebih dari tiga dekade. Belanda mengasingkannya ke Sumedang, Jawa Barat, untuk memutus pengaruhnya terhadap rakyat Aceh.`,
    historianNote: `Keputusan Belanda untuk mengasingkan — bukan memenjarakan atau mengeksekusi — Cut Nyak Dien mencerminkan kekhawatiran mereka terhadap dampak simbol perlawanan. Ironisnya, bahkan di pengasingan, ia terus mengajar mengaji dan menjaga semangatnya hingga wafat pada 1908.`,
  },
  {
    id: 'cnd-surat-pengasingan',
    hero: 'cut-nyak-dien',
    title: 'Surat dari Pengasingan Sumedang',
    date: 'Maret 1907',
    type: 'Surat Pribadi · Cut Nyak Dien',
    from: 'Cut Nyak Dien (Sumedang)',
    to: 'Cut Gambang (Putrinya, di Aceh)',
    content: `Anakku Cut Gambang,

Ibumu menulis surat ini dari tanah asing yang jauh dari Aceh tercinta. Meski mata ibu semakin rabun dan badan semakin lemah, hati ibu tetap hangat mengingat perjuangan kita.

Jangan pernah menangisi ibu. Ibu baik-baik saja di sini — mengajar mengaji kepada orang-orang baik Sumedang. Setiap hari ibu berdoa agar Aceh bebas.

Jadilah perempuan yang kuat. Jaga tanah Aceh dengan ilmu dan keimanan.

Ibumu yang selalu merindukanmu,
Cut Nyak Dien`,
    context: `Di pengasingan Sumedang, Cut Nyak Dien dikenal warga setempat sebagai "Ibu Perbu" — sosok yang dihormati karena pengetahuan agamanya. Belanda merahasiakan identitas aslinya untuk mencegah perlawanan baru. Ia mengajar mengaji secara rutin hingga kondisinya semakin memburuk.`,
    historianNote: `Kisah Cut Nyak Dien di Sumedang menunjukkan dimensi perlawanan yang melampaui senjata — ia terus berjuang lewat ilmu dan iman. Makamnya di Gunung Puyuh, Sumedang, baru ditemukan secara resmi pada 1959, dan kini menjadi situs ziarah nasional yang dikunjungi ribuan orang setiap tahunnya.`,
  },

  // ══════════════════════════════════════
  // DOKUMEN BERSAMA
  // ══════════════════════════════════════

  {
    id: 'bersama-persatuan',
    hero: 'keduanya',
    title: 'Ikrar Perlawanan Bersama',
    date: 'Januari 1896',
    type: 'Dokumen Persatuan · Keduanya',
    from: 'Teuku Umar & Cut Nyak Dien',
    to: 'Para Panglima dan Rakyat Aceh',
    content: `Bismillahirrahmanirrahim,

Kami, Teuku Umar dan Cut Nyak Dien, menyatakan ikrar kami di hadapan Allah dan rakyat Aceh:

Selama hayat masih dikandung badan, kami tidak akan berhenti melawan penjajah yang merampas tanah dan kehormatan Aceh.

Kepada seluruh uleebalang, panglima, dan rakyat Aceh — bersatulah. Kekuatan kita ada pada persatuan. Satu jiwa, satu tujuan: Aceh Merdeka.

Semoga Allah meridhai perjuangan ini.

Teuku Umar Johan Pahlawan
Cut Nyak Dien`,
    context: `Tahun 1896 menandai puncak kerjasama Teuku Umar dan Cut Nyak Dien dalam memimpin perlawanan Aceh. Setelah Teuku Umar berhasil mendapatkan senjata dari Belanda, pasangan ini memimpin serangan besar-besaran yang menggoyang seluruh Hindia Belanda.`,
    historianNote: `Kolaborasi Teuku Umar dan Cut Nyak Dien merupakan contoh langka dalam sejarah perlawanan kolonial — pasangan suami-istri yang bersama-sama memimpin perang selama hampir dua dekade. Keduanya menjadi simbol persatuan dan keteguhan Aceh yang menginspirasi gerakan kemerdekaan Indonesia.`,
  },
]