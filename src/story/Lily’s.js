const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const classes = ['mountain', 'house', 'cake', 'strawberries', 'candle', 'necklace', 'rain', 'umbrella', 'vase', 'hat', 'lollipops', 'eyes', 'fish', 'flowers'];

let currentStoryKeyword = null; // Menyimpan keyword cerita saat ini

const keywordsMapping = {
  gunung: 'mountain',//ini kalau ada keyword line double buat kek gini
  rumah: 'house',
  kue: 'cake',
  stroberi: 'strawberries',
  lilin: 'candle',
  kalung: 'necklace',
  hujan: 'rain',
  payung: 'umbrella',
  vas: 'vase',
  topi: 'hat',
  lolipop: 'lollipops',
  mata: 'eyes',
  ikan: 'fish',
  bunga: 'flowers'
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
    mountain: "Pada suatu hari yang cerah di kaki sebuah <b>gunung</b> yang tinggi, hiduplah seorang gadis bernama Lili.",
    house: "Lili tinggal sendirian bersama ibunya di sebuah <b>rumah kecil</b>. Ketika bangun, dia menyadari bahwa hari ini adalah ulang tahun ibunya.",
    cake: "Dia memutuskan untuk membuat <b>kue</b> istimewa untuk ulang tahun ibunya, jadi dia mengumpulkan semua bahan dan mulai membuatnya.",
    strawberries: "Kue itu dihias dengan <b>stroberi</b>, membuatnya terlihat sangat lezat.",
    candle: "Lili meletakkan <b>lilin</b> di atasnya dan mundur untuk mengagumi hasil kerjanya.",
    necklace: "Dia teringat bagaimana ibunya selalu memakai <b>kalung</b> cantik dengan liontin berbentuk bunga.",
    rain: "Saat Lili melihat ke luar jendela, dia melihat <b>hujan</b> mulai turun.",
    umbrella: "Dia mengambil <b>payung</b> dan berlari keluar untuk memetik beberapa anggur dari kebun mereka. Meskipun hujan, dia merasa senang dan bersemangat dengan kejutan ulang tahun itu.",
    vase: "Setelah kembali ke dalam, Lili menata bunga segar di dalam <b>vas</b> di samping kue.",
    hat: "Dia juga menyiapkan hadiah istimewa, sebuah <b>topi</b> buatan tangan yang dijahitnya sendiri.",
    lollipops: "Dia meletakkan topi itu, bersama beberapa <b>lolipop</b> dan satu sendok es krim, di samping kue.",
    eyes: "Ketika ibunya pulang, <b>mata</b> nya berbinar-binar dengan kegembiraan. Dia sangat tersentuh oleh usaha Lili.",
    fish: "Mereka menikmati kue dan hidangan lainnya bersama. Bahkan <b>ikan</b> peliharaan mereka tampak berenang lebih bersemangat di dalam akuarium, merasakan suasana yang penuh kegembiraan.",
    flowers: "Lili menemukan bahwa hadiah yang tulus tumbuh dari dalam hati, seperti <b>bunga</b> yang lembut, dan bahwa bahkan tindakan kebaikan yang paling kecil bisa berkembang menjadi kebahagiaan yang luar biasa."
  };

  // Memastikan urutan story sesuai dengan sequence
  const story = sequence.map(keyword => storyParts[keyword]).join(' ');

  return story;
}

module.exports = predictClassification;
