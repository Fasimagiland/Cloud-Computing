const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const classes = ['apple1', 'tShirt', 'butterflies', 'car', 'book', 'rainbow', 'basketball', 'sun1', 'watermelons', 'house', 'sun2', 'stars', 'apple2', 'face'];

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

    // Langsung arahkan keyword ke keyword diinginkan (ini kalau kamu pen coba buat story baru trs pengen arahin langsung ke sana pakai ini aja)
    // const keyword = 'apple1';

    // Add the new keyword to the story sequence
    storySequence.push(keyword);

    // Generate the story based on the sequence of keywords
    let story = generateStory(storySequence);

    return { confidenceScore, keyword, story, storySequence };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

function generateStory(sequence, keyword) {
    const storyParts = {
      apple1: "There was a boy named Jack who loved exploring. One bright morning, he grabbed an apple from the kitchen table and set out on an adventure.",
      tShirt: "Jack wore his favorite t-shirt, as he wandered into the forest.",
      butterflies: "He brought along a book about butterflies, hoping to spot some during his journey.",
      car: "As he walked, he saw a beautiful butterfly land on an old, rusted car abandoned in the woods.",
      book: "Continuing his walk, Jack found himself in a meadow where he decided to take a break. He sat on soft grass and began reading his book.",
      rainbow: "Suddenly, he looked up and saw a rainbow stretching across the sky, a breathtaking sight that made him smile.",
      basketball: "Nearby, a group of children were playing basketball. Jack joined them for a quick game, enjoying the fun and laughter.",
      sun1: "As the sun began to set, casting a warm glow over everything, Jack realized it was time to head home.",
      watermelons: "On his way back, he passed by a market stall where a vendor was selling juicy watermelons. Jack bought a slice and savored its sweetness as he walked. When he reached home, his sister adjusting her eyeglasses while working on her homework.",
      house: "Their father was preparing dinner, and the aroma filled the house. After eating, Jack's family gathered in the living room. His mother told them a story about the",
      sun2: "sun and how it always rose again, no matter how dark the night had been.",
      stars: "Later, Jack went to bed, feeling content. He looked out his window at the night sky, where stars twinkled brightly.",
      apple2: "He knew that his day had been filled with little treasures—an apple, a butterfly, a rainbow, and the joy of playing with friends.",
      face: "These simple pleasures reminded him of the beauty in everyday life, and he fell asleep with a smile on his face, dreaming of his next adventure."
    };
  
    return sequence.map(keyword => storyParts[keyword]).join(' ');
  }

module.exports = predictClassification;
