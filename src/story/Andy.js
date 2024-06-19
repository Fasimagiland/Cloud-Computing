const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const classes =['suitcase','airplane','clouds','beach','dog','butterfly1','ice cream','dolphin','cookie','bus','leaves','tree','grass','basketball','butterfly2','sun', 'house'];


let currentStoryKeyword = null; // Menyimpan keyword cerita saat ini

const keywordsMapping = {
  koper: 'suitcase',
  pesawat: 'airplane',
  awan: 'clouds',
  pantai: 'beach',
  anjing: 'dog',
  'kupu-kupu': ['butterfly1', 'butterfly2'],
  eskrim: 'icecream',
  'lumba-lumba': 'dolphin',
  kukis: 'cookie',
  bus: 'bus',
  daun: 'leaves',
  pohon: 'tree',
  rumput: 'grass',
  'bola basket': 'basketball',
  matahari: 'sun',
  rumah: 'house'
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

function generateStory(sequence, keyword) {
  const storyParts = {
    suitcase: "Liburan kali ini, Adi dan keluarganya naik <span style='color:red'>(pesawat)</span>.",
    airplane: "Adi melihat keluar jendela dan melihat <span style='color:red'>(awan)</span> yang lembut.",
    clouds: "Di <span style='color:red'>(pantai)</span>, Adi bermain dengan bola pantai yang berwarna-warni.",
    beach: "Di Sekitar pantai, Adi melihat seekor <span style='color:red'>(anjing)</span> jinak yang berlari dan mengibaskan ekornya.",
    dog: "Adi melihat <span style='color:red'>(kupu-kupu)</span> yang berterbangan di sekitar bunga-bunga.",
    butterfly1: "Adi menikmati <span style='color:red'>(es krim)</span> yang lezat dengan taburan.",
    icecream: "Di air, Adi melihat <span style='color:red'>(lumba-lumba)</span> yang melompat-lompat.",
    dolphin: "Ibu Adi memberinya <span style='color:red'>(kukis)</span> yang lezat sebagai camilan.",
    cookie: "Hari berikutnya, Adi naik <span style='color:red'>(bus)</span> ke kebun binatang terdekat.",
    bus: "Di kebun binatang, Adi melihat jerapah tinggi yang sedang makan <span style='color:red'>(daun)</span>.",
    leaves: "Seekor monyet yang suka bermain berayun dari <span style='color:red'>(pohon)</span> ke pohon, membuat Andy tertawa.",
    tree: "Adi melihat zebra bergaris yang sedang memakan <span style='color:red'>(rumput)</span>.",
    grass: "Setelah dari kebun binatang, Adi pergi ke taman dan bermain <span style='color:red'>(bola basket)</span>.",
    basketball: "Adi menemukan <span style='color:red'>(kupu-kupu)</span> dan melihatnya terbang pergi.",
    butterfly2: "Saat <span style='color:red'>(matahari)</span> terbenam.",
    sun: "Adi merasa lelah tapi bahagia dan dia pun kembali ke <span style='color:red'>(rumah)</span>.",
    house: "Greet Jobs",
  };


  // Memastikan urutan story sesuai dengan sequence
  const story = sequence.map(keyword => storyParts[keyword]).join(' ');

  return story;
}

module.exports = predictClassification;