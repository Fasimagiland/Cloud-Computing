const predictLilyStory = require('../story/Lily’s');
const predictJackStory = require('../story/Jack');
const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postPredictHandler(request, h, storyType) {
  const { image } = request.payload;
  const { model } = request.server.app;

  // Decide which story prediction function to use
  let predictStory;
  if (storyType === 'Lily') {
    predictStory = predictLilyStory;
  } else if (storyType === 'Jack') {
    predictStory = predictJackStory;
  } else {
    return h.response({ status: 'fail', message: 'Invalid story type' }).code(400);
  }

  const { confidenceScore, keyword, story } = await predictStory(model, image);
  
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    "id": id,
    "hasil gambar": keyword,
    "cerita": story,
    "confidenceScore": confidenceScore,
    "createdAt": createdAt
  };

  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: confidenceScore > 0.0 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture',
    data
  });
  response.code(201);
  return response;
}

module.exports = postPredictHandler;
