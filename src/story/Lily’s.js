const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const classes = ['mountain', 'house', 'cake', 'strawberries', 'candle', 'necklace', 'rain', 'umbrella', 'vase', 'hat', 'lollipops', 'eyes', 'fish', 'flowers'];

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
    // const keyword = 'house';

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
    mountain: "On a sunny day at the base of a tall <b>mountain</b>, there lived a girl named Lily.",
    house: "Lily lived alone with her mother in a small <b>house</b>. When she woke up, she realized that it was her mother's birthday today.",
    cake: "She decided to bake a special <b>cake</b> for her mother's birthday, so she gathered all the ingredients and began to work.",
    strawberries: "The cake was decorated with <b>strawberries</b>, making it look absolutely delicious.",
    candle: "Lily placed a <b>candle</b> on top and stepped back to admire her work.",
    necklace: "She thought about how her mother always wore a beautiful <b>necklace</b> with a pendant shaped like a flower.",
    rain: "As Lily looked out the window, she saw that <b>rain</b> had started to fall.",
    umbrella: "She grabbed an <b>umbrella</b> and dashed outside to pick some grapes from their garden. Despite the rain, she felt happy and excited about the birthday surprise.",
    vase: "Returning inside, Lily arranged fresh flowers in a <b>vase</b> next to the cake.",
    hat: "She also prepared a special gift, a handmade <b>hat</b> she had sewn herself.",
    lollipops: "She placed the hat, along with a few <b>lollipops</b> and a scoop of ice cream, next to the cake.",
    eyes: "When her mother arrived home, her <b>eyes</b> lit up with joy. She was deeply touched by Lily's efforts.",
    fish: "Together, they enjoyed the cake and the other treats. Even their pet <b>fish</b> seemed to swim more energetically in the tank, sensing the joyous atmosphere.",
    flowers: "Lily discovered that genuine gifts bloom from within, akin to delicate <b>flowers</b>, and that even the smallest acts of kindness can blossom into immense joy."
  };

  return sequence.map(keyword => storyParts[keyword]).join(' ');
}

module.exports = predictClassification;
