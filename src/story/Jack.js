const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const classes = ['apple1', 'tShirt', 'butterflies', 'car', 'book', 'rainbow', 'basketball', 'sun1', 'watermelons', 'house', 'sun2', 'stars', 'apple2', 'face'];

let currentStoryKeyword = null; // Menyimpan keyword cerita saat ini

const keywordsMapping = {
  apel: ['apple1', 'apple2'],//ini kalau ada keyword line double buat kek gini
  kaos: 'tShirt',
  'kupu-kupu': 'butterflies',//karena ada - makanya harus dikasih ''
  mobil: 'car',
  buku: 'book',
  pelangi: 'rainbow',
  'bola basket': 'basketball',
  matahari: ['sun1', 'sun2'], // Ubah menjadi array untuk menunjukkan urutan cerita
  semangka: 'watermelons',
  rumah: 'house',
  bintang: 'stars',
  wajah: 'face'
};

async function predictClassification(inputString, storySequence = []) {
  try {
    let keyword = null;
    for (const [key, value] of Object.entries(keywordsMapping)) {
      if (inputString.toLowerCase().includes(key)) {
        if (Array.isArray(value)) {
          keyword = value.find(k => !storySequence.includes(k)) || value[value.length - 1];
        } else {
          keyword = value;
        }
        // Update currentStoryKeyword
        currentStoryKeyword = key;
        break;
      }
    }

    if (!keyword) {
      throw new InputError('No valid keyword found in the input string');
    }

    // Add the new keyword to the story sequence
    storySequence.push(keyword);

    // Generate the story based on the sequence of keywords
    let story = generateStory(storySequence);

    // Perbaiki logika untuk mengupdate keywordsMapping jika currentStoryKeyword adalah array
    if (Array.isArray(keywordsMapping[currentStoryKeyword])) {
      const currentIndex = keywordsMapping[currentStoryKeyword].indexOf(keyword);
      if (currentIndex !== -1 && currentIndex < keywordsMapping[currentStoryKeyword].length - 1) {
        keywordsMapping[currentStoryKeyword] = keywordsMapping[currentStoryKeyword][currentIndex + 1];
      }
    }

    return { keyword, story, storySequence };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}


function generateStory(sequence) {
  const storyParts = {
    apple1: "Ada seorang anak laki-laki bernama Fajar yang suka berpetualang. Suatu pagi yang cerah, Fajar mengambil sebuah <b>apel</b> dari meja dapur dan berangkat untuk berpetualang.",
    tShirt: "Fajar mengenakan <b>kaos</b> favoritnya, saat dia menjelajahi hutan.",
    butterflies: "Fajar membawa sebuah buku tentang <b>kupu-kupu</b>, berharap bisa melihat beberapa kupu-kupu selama perjalanannya.",
    car: "Saat berjalan, Fajar melihat seekor kupu-kupu yang indah hinggap di sebuah <b>mobil</b> tua berkarat yang ditinggalkan di hutan.",
    book: "Melanjutkan perjalanannya, Fajar menemukan padang rumput di mana dia memutuskan untuk beristirahat. Fajar duduk di atas rumput yang lembut dan mulai membaca <b>buku</b> yang ia bawa.",
    rainbow: "Tiba-tiba, Fajar melihat ke atas dan melihat <b>pelangi</b> membentang di langit, pemandangan yang menakjubkan yang membuatnya tersenyum.",
    basketball: "Di dekatnya, sekelompok anak-anak sedang bermain <b>bola basket</b>. Fajar bergabung dengan mereka untuk bermain sebentar, menikmati kesenangan dan tawa.",
    sun1: "Saat <b>matahari</b> mulai terbenam, Fajar menyadari sudah waktunya pulang.",
    watermelons: "Dalam perjalanan pulang, Fajar melewati sebuah toko yang menjual <b>buah semangka</b>.",
    house: "Ketika Fajar sampai di <b>rumah</b>, ayah dan ibunya sedang menyiapkan makan malam.",
    sun2: "Setelah makan, keluarga Fajar berkumpul di ruang tamu. Ibunya menceritakan kisah tentang <b>matahari</b> dan bagaimana matahari selalu terbit lagi, tidak peduli seberapa gelap malamnya.",
    stars: "Kemudian, Fajar pergi tidur dengan perasaan senang. Dia melihat keluar jendela kamarnya ke langit malam, di mana <b>bintang</b> berkelap-kelip dengan terang.",
    apple2: "Dia tahu bahwa harinya telah dipenuhi dengan harta kecil—sebuah <b>apel</b>, kupu-kupu, pelangi, dan kebahagiaan bermain dengan teman-teman.",
    face: "Kesederhanaan ini mengingatkannya akan keindahan dalam kehidupan sehari-hari, dan dia tertidur dengan senyum di <b>wajah</b> nya, bermimpi tentang petualangan berikutnya."
  };

  // Memastikan urutan story sesuai dengan sequence
  const story = sequence.map(keyword => storyParts[keyword]).join(' ');

  return story;
}

module.exports = predictClassification;
