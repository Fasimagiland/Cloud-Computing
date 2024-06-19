const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const classes = ['rain1', 'sun', 'book1', 'stars', 'book2', 'cake', 'strawberry', 'candle', 'necklace', 'rain2', 'umbrella', 'vase', 'hat', 'lollipop', 'eyes', 'fish', 'flower'];

let currentStoryKeyword = null; // Menyimpan keyword cerita saat ini

const keywordsMapping = {
  hujan: ['rain1', 'rain2'],
  matahari: 'sun',
  buku: ['book1', 'book2'],
  bintang: 'stars',
  kue: 'cake',
  stroberi: 'strawberry',
  lilin: 'candle',
  kalung: 'necklace',
  payung: 'umbrella',
  vas: 'vase',
  topi: 'hat',
  lolipop: 'lollipop',
  mata: 'eyes',
  ikan: 'fish',
  bunga: 'flower'
};

async function predictClassification(inputString, storySequence = []) {
  try {
    let keyword = null;
    for (const [key, value] of Object.entries(keywordsMapping)) {
      const regex = new RegExp(`\\b${key}\\b`, 'i'); // Ekspresi reguler untuk menemukan kata yang berdiri sendiri
      if (regex.test(inputString)) {
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
      console.error('No valid keyword found in the input string');
      throw new InputError('No valid keyword found in the input string');
    }

    // Add the new keyword to the story sequence
    storySequence.push(keyword);

    // Generate the story based on the sequence of keywords
    let story = generateStory(storySequence);

    // Update keywordsMapping if currentStoryKeyword is an array
    if (Array.isArray(keywordsMapping[currentStoryKeyword])) {
      const currentIndex = keywordsMapping[currentStoryKeyword].indexOf(keyword);
      if (currentIndex !== -1 && currentIndex < keywordsMapping[currentStoryKeyword].length - 1) {
        // Move to the next element in the array
        keywordsMapping[currentStoryKeyword] = keywordsMapping[currentStoryKeyword].slice(currentIndex + 1).concat(keywordsMapping[currentStoryKeyword].slice(0, currentIndex + 1));
      }
    }

    return { keyword, story, storySequence };
  } catch (error) {
    console.error(`Terjadi kesalahan input: ${error.message}`);
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

function generateStory(sequence) {
  const storyParts = {
    rain1: "Lili tinggal sendirian bersama ibunya di sebuah <span style='color:red'>(matahari)</span>. Ketika bangun, dia menyadari bahwa hari ini adalah ulang tahun ibunya.",
    sun: "Di sebuah rumah, terlihat seorang gadis sedang membaca <span style='color:red'>(buku)</span> dengan saksama, lili namanya.",
    book1: "Lili tinggal sendirian bersama ibunya di sebuah rumah kecil dengan ornamen <span style='color:red'>(bintang)</span> di dindingnya.",
    stars: "Selesai membaca <span style='color:red'>(buku)</span>, dia menyadari bahwa hari ini adalah ulang tahun ibunya.",
    book2: "Dia memutuskan untuk membuat <span style='color:red'>(kue)</span> istimewa untuk ulang tahun ibunya, jadi dia mengumpulkan semua bahan dan mulai membuatnya.",
    cake: "Kue itu dihias dengan <span style='color:red'>(stroberi)</span>, membuatnya terlihat sangat lezat.",
    strawberry: "Lili meletakkan <span style='color:red'>(lilin)</span> di atasnya dan mundur untuk mengagumi hasil kerjanya.",
    candle: "Dia teringat bagaimana ibunya selalu memakai <span style='color:red'>(kalung)</span> cantik dengan liontin berbentuk bunga.",
    necklace: "Saat Lili melihat ke luar jendela, dia melihat <span style='color:red'>(hujan)</span> sedikit reda.",
    rain2: "Dia mengambil <span style='color:red'>(payung)</span> dan berlari keluar untuk memetik beberapa anggur dari kebun mereka. Meskipun hujan, dia merasa senang dan bersemangat dengan kejutan ulang tahun itu.",
    umbrella: "Setelah kembali ke dalam, Lili menata bunga segar di dalam <span style='color:red'>(vas)</span> di samping kue.",
    vase: "Dia juga menyiapkan hadiah istimewa, sebuah <span style='color:red'>(topi)</span> buatan tangan yang dijahitnya sendiri.",
    hat: "Dia meletakkan topi itu, bersama beberapa <span style='color:red'>(lolipop)</span> dan satu sendok es krim, di samping kue.",
    lollipop: "Ketika ibunya pulang, <span style='color:red'>(mata)</span> nya berbinar-binar dengan kegembiraan. Dia sangat tersentuh oleh usaha Lili.",
    eyes: "Mereka menikmati kue dan hidangan lainnya bersama. Bahkan <span style='color:red'>(ikan)</span> peliharaan mereka tampak berenang lebih bersemangat di dalam akuarium, merasakan suasana yang penuh kegembiraan.",
    fish: "Lili menemukan bahwa hadiah yang tulus tumbuh dari dalam hati, seperti <span style='color:red'>(bunga)</span> yang lembut, dan bahwa bahkan tindakan kebaikan yang paling kecil bisa berkembang menjadi kebahagiaan yang luar biasa.",
    flower: "Greet Jobs",
  };

  // Memastikan urutan story sesuai dengan sequence
  const story = sequence.map(keyword => storyParts[keyword]).join(' ');

  return story;
}

module.exports = predictClassification;
