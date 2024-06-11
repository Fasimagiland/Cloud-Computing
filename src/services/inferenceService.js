const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
const fs = require('fs').promises; // Menggunakan fs.promises untuk async/await
const path = require('path');

const kancilStoryPath = path.join(__dirname, '..', 'story', 'kancil.txt');
const malinKundangStoryPath = path.join(__dirname, '..', 'story', 'malin-kundang.txt');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['Kancil', 'Malin-Kundang'];

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const keyword = classes[classResult];

    let explanation, story;

    // // Langsung arahkan keyword ke "Malin-Kundang" (ini kalau kamu pen coba buat story baru trs pengen arahin langsung ke sana pakai ini aja)
    // const keyword = 'Malin-Kundang';

    if (keyword === 'Kancil') {
      explanation = "Cerita Si Kancil adalah kumpulan dongeng populer di Indonesia yang menceritakan tentang petualangan dan kecerdikan seekor kancil, binatang kecil yang cerdas dan licik.";
      try {
        story = await fs.readFile(kancilStoryPath, 'utf8'); // Membaca cerita Kancil dari file
      } catch (err) {
        console.error('Error reading Kancil story:', err);
        story = 'Error reading Kancil story';
      }
    }

    if (keyword === 'Malin-Kundang') {
      explanation = "Cerita Malin Kundang adalah salah satu legenda populer dari Indonesia, khususnya dari daerah Sumatera Barat.";
      try {
        const malinKundangStory = await fs.readFile(malinKundangStoryPath, 'utf8'); // Membaca cerita Malin-Kundang dari file
        story = malinKundangStory + "\n\nAnda sehat!"; // Menambahkan cerita Malin-Kundang dengan teks tambahan
      } catch (err) {
        console.error('Error reading Malin-Kundang story:', err);
        story = 'Error reading Malin-Kundang story';
      }
    }

    return { confidenceScore, keyword, explanation, story };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;
