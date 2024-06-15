const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const classes = ['rabbit', 'grass', 'bird', 'river', 'fish', 'duck', 'banana', 'cactus', 'fish', 'tree'];

let currentStoryKeyword = null; // Menyimpan keyword cerita saat ini

const keywordsMapping = {
  kelinci: 'rabbit',
  rumput: 'grass',
  burung: 'bird',
  sungai: 'river',
  ikan: ['fish1', 'fish2'],
  bebek: 'duck',
  pisang: 'banana',
  kaktus: 'cactus',
  pohon: 'tree'
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
        rabbit:"Di sebuah hutan, hiduplah seekor kelinci putih yang sangat menyukai wortel.",
        grass:"Setiap pagi, kelinci ini melompat-lompat di antara rumput yang hijau untuk mencari makanan favoritnya.",
        bird:"Di dekat situ, seekor burung kecil berterbangan untuk mencari biji-bijian di antara rumput.",
        river:"Tidak jauh dari tempat itu, terdapat sebuah sungai yang airnya jernih.",
        fish1:"Sungai itu banyak dihuni oleh ikan yang berenang bebas.",
        duck:"Kelinci sering datang ke tepi sungai untuk minum air yang segar sambil melihat bebek berenang dan bermain di air.",
        banana:"Di tepi sungai, tumbuhlah beberapa pohon pisang yang sering menarik perhatian hewan-hewan lain dengan buahnya yang manis.",
        cactus:"Di sisi lain dari hutan, tumbuh kaktus yang kuat bertahan di tanah yang kering, menjadi pemandangan kontras dengan rumput hijau di sekitar sungai.",
        fish2:"Begitulah kehidupan di hutan tersebut, di mana kelinci, burung, ikan, dan bebek hidup berdampingan.",
        tree:"Hutan yang memiliki berbagai pohon lebat ini menjadi tempat yang penuh warna dan kehidupan, di mana setiap hari adalah petualangan baru bagi para penghuninya.",
    };

     // Memastikan urutan story sesuai dengan sequence
  const story = sequence.map(keyword => storyParts[keyword]).join(' ');

  return story;
}

module.exports = predictClassification;