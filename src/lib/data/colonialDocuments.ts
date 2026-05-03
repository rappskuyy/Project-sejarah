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
}

export const colonialDocuments: ColonialDocument[] = [
  {
    id: 'surat-penyerahan-palsu',
    title: 'Surat Penyerahan Palsu',
    date: '30 September 1893',
    type: 'Surat Resmi',
    from: 'Teuku Umar',
    to: 'Gubernur Militer Aceh, Belanda',
    content: `Dengan segala kerendahan hati, saya Teuku Umar, menyatakan kesediaan untuk bekerja sama dengan pemerintah Hindia Belanda demi ketertiban dan kemakmuran rakyat Aceh. Saya bersedia memimpin pasukan untuk membantu operasi militer Belanda di wilayah Aceh. Sebagai tanda kesungguhan, saya memohon kepercayaan Tuan untuk mempersenjatai pasukan saya agar dapat menjalankan tugas dengan efektif. Semoga kerjasama ini membawa kedamaian bagi tanah Aceh.`,
    context: `Dokumen ini merupakan rekonstruksi berdasarkan catatan sejarah dari periode Perang Aceh (1873–1904). Surat-surat asli tersimpan di arsip nasional Belanda (Nationaal Archief) dan Arsip Nasional Republik Indonesia.`,
    historianNote: `Dokumen-dokumen era kolonial memberikan gambaran nyata tentang dinamika perang dan diplomasi antara pejuang Aceh dan pemerintah kolonial Belanda.`
  },
  {
    id: 'laporan-pengkhianatan',
    title: 'Laporan Pengkhianatan Teuku Umar',
    date: '1 Januari 1896',
    type: 'Laporan Darurat Belanda',
    from: 'Kapten Van Der Berg, Komandan Militer Aceh',
    to: 'Gubernur Jenderal Hindia Belanda, Batavia',
    content: `Dengan hormat kami laporkan bahwa Teuku Umar, yang selama ini kami percaya sebagai sekutu setia, telah melakukan pengkhianatan besar. Pada tanggal 29 Desember 1895, ia melarikan diri bersama seluruh pasukannya membawa 800 senapan dan 17 meriam milik pemerintah. Kerugian persenjataan sangat signifikan. Kami memohon instruksi segera untuk operasi penangkapan.`,
    context: `Laporan ini mencerminkan kemarahan dan kepanikan pihak Belanda setelah menyadari bahwa "penyerahan" Teuku Umar pada 1893 adalah strategi genius untuk mengumpulkan senjata demi perjuangan Aceh.`,
    historianNote: `Peristiwa ini dikenal sebagai salah satu strategi intelijen paling brillian dalam sejarah perjuangan kemerdekaan Indonesia — menipu penjajah dari dalam.`
  },
  {
    id: 'berita-gugur',
    title: 'Berita Gugurnya Teuku Umar',
    date: '12 Februari 1899',
    type: 'Laporan Militer',
    from: 'Kolonel Swart, Komandan Ekspedisi Meulaboh',
    to: 'Markas Besar Militer Belanda, Kutaraja',
    content: `Dengan ini kami laporkan bahwa pada tanggal 11 Februari 1899, dalam operasi militer di sekitar Meulaboh, pasukan kami berhasil mengepung dan menghentikan perlawanan Teuku Umar. Panglima pejuang Aceh tersebut gugur dalam pertempuran sengit. Perlawanan di wilayah Aceh Barat diharapkan dapat segera diatasi setelah jatuhnya pemimpin mereka.`,
    context: `Gugurnya Teuku Umar tidak memadamkan semangat perlawanan Aceh. Cut Nyak Dien, meskipun mengidap rematik parah dan hampir buta, terus berjuang hingga akhirnya ditangkap pada 1905 dan diasingkan ke Sumedang.`,
    historianNote: `Teuku Umar gugur sebagai syuhada pejuang bangsa. Namanya diabadikan sebagai nama jalan utama di Jakarta sebagai penghormatan atas pengorbanannya.`
  },
  {
    id: 'surat-penolakan-pengasingan',
    title: 'Surat Penolakan Pengasingan',
    date: '1905',
    type: 'Pernyataan Pribadi',
    from: 'Cut Nyak Dien',
    to: 'Gubernur Jenderal Hindia Belanda',
    content: `Saya, Cut Nyak Dien, menolak setiap tawaran damai yang hanya menjadikan Aceh hidup di bawah bayang-bayang penjajah. Kehidupan bebas di tanah kelahiran jauh lebih mulia dibandingkan hidup aman dengan pengkhianatan terhadap bangsa dan agama.`,
    context: `Surat ini merefleksikan keteguhan hati Cut Nyak Dien setelah kehilangan Teuku Umar dan menghadapi ancaman pengasingan. Ia memilih kehormatan perjuangan di atas kenyamanan yang ditawarkan Belanda.`,
    historianNote: `Dokumen seperti ini menunjukkan bahwa perlawanan Aceh bukan hanya militer, tetapi juga perang nilai: kehormatan, kebebasan, dan penolakan terhadap penindasan.`
  }
]