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
    rabbit: "Setiap pagi, kelinci ini melompat-lompat di antara <span style='color:red'>(rumput)</span> yang hijau untuk mencari makanan favoritnya.",
    grass: "Di dekat situ, seekor <span style='color:red'>(burung)</span> kecil berterbangan untuk mencari biji-bijian di antara rumput.",
    bird: "Tidak jauh dari tempat itu, terdapat sebuah <span style='color:red'>(sungai)</span> yang airnya jernih.",
    river: "<span style='color:red'>(Sungai)</span> itu banyak dihuni oleh ikan yang berenang bebas.",
    fish1: "Kelinci sering datang ke tepi sungai untuk minum air yang segar sambil melihat <span style='color:red'>(bebek)</span> berenang dan bermain di air.",
    duck: "Di tepi sungai, tumbuhlah beberapa <span style='color:red'>(pohon pisang)</span> yang sering menarik perhatian hewan-hewan lain dengan buahnya yang manis.",
    banana: "Di sisi lain dari hutan, tumbuh <span style='color:red'>(kaktus)</span> yang kuat bertahan di tanah yang kering, menjadi pemandangan kontras dengan rumput hijau di sekitar sungai.",
    cactus: "Begitulah kehidupan di hutan tersebut, di mana kelinci, burung, ikan, dan bebek hidup berdampingan.",
    fish2: "Hutan yang memiliki berbagai <span style='color:red'>(pohon)</span> lebat ini menjadi tempat yang penuh warna dan kehidupan, di mana setiap hari adalah petualangan baru bagi para penghuninya.",
    tree: "Greet Jobs",
  };



     // Memastikan urutan story sesuai dengan sequence
  const story = sequence.map(keyword => storyParts[keyword]).join(' ');

  return story;
}

module.exports = predictClassification;