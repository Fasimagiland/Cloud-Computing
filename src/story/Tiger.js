const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const classes = ['tiger','monkeys','giraffes','lions','owl','ducks','snake','wolf','tiger'];

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
    // const keyword = 'monkeys';

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
        tiger: "A tiger walks through a dense forest, sneaking among the lush trees.",
        monkeys: "Along a calm river, he meets a group of carefree monkeys.",
        giraffes: "Flashing, the tiger crossed the savanna, passing a family of giraffes towering against the blue sky.",
        lions: "In a dark cave, he shares space with a clever fox. In the vast grasslands, he hunted with a pack of mighty lions.",
        owl: "On top of a shady tree, he found a wise owl.",
        ducks: "On a calm lake, he frolics with a flock of cheerful ducks.",
        wolf: "In a barren desert, he encountered an agile snake. Under the bright stars, he meets his loyal wolf family.",
        tiger: "At the end of the day, the tiger returns to its den, grateful for the encounters with the various animals that graced its adventure.",
    };

    return sequence.map(keyword => storyParts[keyword]).join(' ');
}

module.exports = predictClassification;
