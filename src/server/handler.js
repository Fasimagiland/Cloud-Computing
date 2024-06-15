const predictLilyStory = require('../story/Lily’s');
const predictJackStory = require('../story/Jack');
const predictAndyStory = require('../story/Andy');
const predictTurtleStory = require('../story/Turtle');

const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postPredictHandler(request, h, storyType) {
  const { text } = request.payload; // Updated to extract text instead of image
  const { model } = request.server.app;

  // Decide which story prediction function to use
  let predictStory;
if (storyType === 'Lily') {
    predictStory = predictLilyStory;
} else if (storyType === 'Jack') {
    predictStory = predictJackStory;
} else if (storyType === 'Andy') {
    predictStory = predictAndyStory;
} else if (storyType === 'Turtle') {
    predictStory = predictTurtleStory;
} else {
    return h.response({ status: 'fail', message: 'Invalid story type' }).code(400);
}

  const { keyword, story, storySequence } = await predictStory(text); // Updated to use text input
  
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    "id": id,
    "hasil gambar": keyword,
    "cerita": story,
    "createdAt": createdAt
  };

  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: 'Text is processed successfully.',
    data
  });
  response.code(201);
  return response;
}

module.exports = postPredictHandler;
