const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

<<<<<<< HEAD
const classes =['suitcase','airplane','clouds','beach','dog','butterfly1','ice cream','dolphin','cookie','bus','leaves','tree','grass','basketball','butterfly2','sun', 'house'];
=======
const classes =['suitcase','airplane','clouds','beach','dog','butterfly','ice cream','dolphin','cookie','bus','leaves','tree','grass','basketball','butterfly','sun', 'house'];
>>>>>>> origin/sertaMulia-lab

let currentStoryKeyword = null; // Menyimpan keyword cerita saat ini

const keywordsMapping = {
  koper: 'suitcase',
  pesawat: 'airplane',
  awan: 'clouds',
  pantai: 'beach',
  anjing: 'dog',
<<<<<<< HEAD
  'kupu-kupu': ['butterfly1', 'butterfly2'],
=======
  'kupu-kupu': ['kupu-kupu1', 'kupu-kupu2'],
>>>>>>> origin/sertaMulia-lab
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
      if (currentIndex !== -1 && currentIndex < keywordsMapping[currentStoryKeyword].length - 1) {
        keywordsMapping[currentStoryKeyword] = keywordsMapping[currentStoryKeyword][currentIndex + 1];
      }
    }

    return { keyword, story, storySequence };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

function generateStory(sequence, keyword) {
  const storyParts = {
    suitcase:"Adi, seorang anak laki-laki, mengemas <b>koper</b> untuk liburan yang menyenangkan.",
    airplane:"Liburan kali ini, Adi dan keluarganya naik <b>pesawat</b>.",
    clouds:"Adi melihat keluar jendela dan melihat <b>awan</b> yang lembut.",
    beach:"Di <b>pantai</b>, Adi bermain dengan bola pantai yang berwarna-warni.",
    dog:"Di Sekitar pantai, Adi melihat seekor <b>anjing</b> jinak yang berlari dan mengibaskan ekornya.",
    butterfly1:"Adi melihat <b>kupu-kupu</b> yang berterbangan di sekitar bunga-bunga.",
    icecream:"Adi menikmati <b>es krim</b> yang lezat dengan taburan.",
    dolphin:"Di air, Adi melihat <b>lumba-lumba</b> yang melompat-lompat.",
    cookie:"Ibu Adi memberinya <b>kukis</b> yang lezat sebagai camilan.",
    bus:"Hari berikutnya, Adi naik <b>bus</b> ke kebun binatang terdekat.",
    leaves:"Di kebun binatang, Adi melihat jerapah tinggi yang sedang makan <b>daun</b>.",
    tree:"Seekor monyet yang suka bermain berayun dari <b>pohon</b> ke pohon, membuat Andy tertawa.",
    grass:"Adi melihat zebra bergaris yang sedang memakan <b>rumput</b>.",
    basketball:"Setelah dari kebun binatang, Adi pergi ke taman dan bermain <b>bola basket</b>.",
    butterfly2:"Adi menemukan <b>kupu-kupu</b> dan melihatnya terbang pergi.",
    sun:"Saat <b>matahari</b> terbenam.",
    house:"Adi merasa lelah tapi bahagia dan dia pun kembali ke <b>rumah</b>.",
  };

  // Memastikan urutan story sesuai dengan sequence
  const story = sequence.map(keyword => storyParts[keyword]).join(' ');

  return story;
}

module.exports = predictClassification;