const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const classes = ['rabbit', 'turtle', 'river', 'lions', 'flood'];

async function predictClassification(model, image, storySequence = []) {
    try {
      const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat();
  
      const prediction = model.predict(tensor);
      const score = await prediction.data();
      const confidenceScore = Math.max(...score) * 100;
  
      const classResult = tf.argMax(prediction, 1).dataSync()[0];
      const keyword = classes[classResult];

      // // Langsung arahkan keyword ke keyword diinginkan (ini kalau kamu pen coba buat story baru trs pengen arahin langsung ke sana pakai ini aja)
    // const keyword = 'rabbit';

    // Add the new keyword to the story sequence
    storySequence.push(keyword);

    // Generate the story based on the sequence of keywords
    let story = generateStory(storySequence);

    return { confidenceScore, keyword, story, storySequence };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

function generateStory(sequence) {
    const storyParts = {
        rabbit:"In a peaceful forest, a turtle and a rabbit coexist peacefully.",
        turtle:"turtle , slow but diligent, always try hard in every task.",
        river:"The hare, fast but arrogant, often underestimates the tortoise's efforts. One day, heavy rain hit the forest, causing the river to overflow.",
        lions:"The turtle patiently asked for help from other lions and managed to save many lives.",
        flood:"The arrogant rabbit laughed at the turtle's efforts, but ended up getting caught in a flood.",
    };

    return sequence.map(keyword => storyParts[keyword]).join(' ');
}

module.exports = predictClassification;