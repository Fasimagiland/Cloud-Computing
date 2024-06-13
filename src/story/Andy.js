const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const classes =['suitcase','airplane','clouds','beach ball','sandcastle','dog','butterfly','ice cream','dolphin','cookie','school bus','giraffe','monkey','elephant','zebra','basketball','sandwiches','butterfly','sun'];

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
      // const keyword = 'airplane';
  
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
        suitcase:"Andy the boy packed his suitcase for a fun vacation.",
        airplane:"He and his family boarded a big airplane to the beach.",
        clouds:"Andy looked out the window and saw fluffy clouds.",
        beachball:"At the beach, Andy played with a colorful beach ball.",
        sandcastle:"He built a sandcastle and found a pretty shell.",
        dog:"A friendly dog ran by and wagged its tail.",
        butterfly:"Andy saw a butterfly fluttering around some flowers.",
        icecream:"He enjoyed a yummy ice cream cone with sprinkles.",
        dolphin:"In the water, he saw a playful dolphin jumping.",
        cookie:"Andy's mom gave him a delicious cookie as a snack.",
        schoolbus:"He rode a school bus to the nearby zoo.",
        giraffe:"At the zoo, Andy saw a tall giraffe eating leaves.",
        monkey:" A playful monkey swung from tree to tree, making Andy laugh.",
        elephant:"He fed a gentle elephant some peanuts and smiled.",
        zebra:"Andy saw a striped zebra grazing in the grass.",
        basketball:"After the zoo, Andy went to a park. He played basketball with some new friends.",
        sandwiches:"They had a picnic with sandwiches.",
        butterfly:"Andy found a butterfly and watched it fly away.",
        sun:"As the sun set, Andy felt tired but happy. He dreamed of more fun adventures tomorrow.",
    };
  
    return sequence.map(keyword => storyParts[keyword]).join(' ');
  }

<<<<<<< HEAD
module.exports = predictClassification;
=======
module.exports = predictClassification;
>>>>>>> 6f8cb7a68c33631215aea0b9249a009fe7b5d0d5
