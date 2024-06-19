const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const classes = ['apple1', 'tShirt', 'butterflies', 'car', 'book', 'rainbow', 'basketball', 'sun1', 'watermelons', 'house', 'sun2', 'stars', 'apple2', 'face'];

let currentStoryKeyword = null; // Menyimpan keyword cerita saat ini

const keywordsMapping = {
  apel: ['apple1', 'apple2'], // ini kalau ada keyword line double buat kek gini
  kaos: 'tShirt',
  'kupu-kupu': 'butterflies', // karena ada - makanya harus dikasih ''
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

// Daftar urutan kata yang diharapkan
const expectedOrder = [
  'apple1', 'tShirt', 'butterflies', 'car', 'book', 'rainbow', 'basketball',
  'sun1', 'watermelons', 'house', 'sun2', 'stars', 'apple2', 'face'
];

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
    if (storySequence.length > 0) {
      const lastKeyword = storySequence[storySequence.length - 1];
      const lastIndex = expectedOrder.indexOf(lastKeyword);
      const nextExpectedKeyword = expectedOrder[lastIndex + 1];

      if (keyword !== nextExpectedKeyword) {
        throw new InputError(`Keyword "${keyword}" is not in the expected order. Expected: "${nextExpectedKeyword}"`);
      }
    }

    storySequence.push(keyword);

    // Generate the story based on the sequence of keywords
    let story = generateStory(storySequence);

     // Perbaiki logika untuk mengupdate keywordsMapping jika currentStoryKeyword adalah array
     if (Array.isArray(keywordsMapping[currentStoryKeyword])) {
      const currentIndex = keywordsMapping[currentStoryKeyword].indexOf(keyword);
      if (currentIndex !== -1) {
        if (currentIndex < keywordsMapping[currentStoryKeyword].length - 1) {
          // Move to the next element in the array
          keywordsMapping[currentStoryKeyword] = keywordsMapping[currentStoryKeyword].slice(currentIndex + 1).concat(keywordsMapping[currentStoryKeyword].slice(0, currentIndex + 1));
        }
      }
    }

    return { keyword, story, storySequence };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

function generateStory(sequence) {
  const storyParts = {
    apple1: "Fajar mengenakan <span style='color:red'>(kaos)</span> favoritnya, saat dia menjelajahi hutan.",
    tShirt: "Fajar membawa sebuah buku tentang <span style='color:red'>(kupu-kupu)</span>, berharap bisa melihat beberapa kupu-kupu selama perjalanannya.",
    butterflies: "Saat berjalan, Fajar melihat seekor kupu-kupu yang indah hinggap di sebuah <span style='color:red'>(mobil)</span> tua berkarat yang ditinggalkan di hutan.",
    car: "Melanjutkan perjalanannya, Fajar menemukan padang rumput di mana dia memutuskan untuk beristirahat. Fajar duduk di atas rumput yang lembut dan mulai membaca <span style='color:red'>(buku)</span> yang ia bawa.",
    book: "Tiba-tiba, Fajar melihat ke atas dan melihat <span style='color:red'>(pelangi)</span> membentang di langit, pemandangan yang menakjubkan yang membuatnya tersenyum.",
    rainbow: "Di dekatnya, sekelompok anak-anak sedang bermain <span style='color:red'>(bola basket)</span>. Fajar bergabung dengan mereka untuk bermain sebentar, menikmati kesenangan dan tawa.",
    basketball: "Saat <span style='color:red'>(matahari)</span> mulai terbenam, Fajar menyadari sudah waktunya pulang.",
    sun1: "Dalam perjalanan pulang, Fajar melewati sebuah toko yang menjual <span style='color:red'>(buah semangka)</span>.",
    watermelons: "Ketika Fajar sampai di <span style='color:red'>(rumah)</span>, ayah dan ibunya sedang menyiapkan makan malam.",
    house: "Setelah makan, keluarga Fajar berkumpul di ruang tamu. Ibunya menceritakan kisah tentang <span style='color:red'>(matahari)</span> dan bagaimana matahari selalu terbit lagi, tidak peduli seberapa gelap malamnya.",
    sun2: "Kemudian, Fajar pergi tidur dengan perasaan senang. Dia melihat keluar jendela kamarnya ke langit malam, di mana <span style='color:red'>(bintang)</span> berkelap-kelip dengan terang.",
    stars: "Dia tahu bahwa harinya telah dipenuhi dengan harta kecil—sebuah <span style='color:red'>(apel)</span>, kupu-kupu, pelangi, dan kebahagiaan bermain dengan teman-teman.",
    apple2: "Kesederhanaan ini mengingatkannya akan keindahan dalam kehidupan sehari-hari, dan dia tertidur dengan senyum di <span style='color:red'>(wajah)</span> nya, bermimpi tentang petualangan berikutnya.",
    face: "Greet Jobs",
  };

  // Memastikan urutan story sesuai dengan sequence
  const story = sequence.map(keyword => storyParts[keyword]).join(' ');

  return story;
}

module.exports = predictClassification;
