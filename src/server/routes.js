const postPredictHandler = require('./handler'); // Sesuaikan path jika berbeda
const homeHandler = require('./home'); // Sesuaikan path jika berbeda

const stories = {
  story1: {
    title: "Fajar dan Petualangannya",
    difficulty: "Mudah",
    content: "Ada seorang anak laki-laki bernama Fajar yang suka berpetualang. Suatu pagi yang cerah, Fajar mengambil sebuah <span style='color:red'>(apel)</span> dari meja dapur dan berangkat untuk berpetualang."
  },
  story2: {
    title: "Lili",
    difficulty: "Normal",
    content: "Pagi ini cuaca sedang mendung, dan nampaknya akan <span style='color:red'>(hujan)</span> deras."
  },
  story3: {
    title: "Liburan Adi!",
    difficulty: "Sulit",
    content: "Adi, seorang anak laki-laki, mengemas <span style='color:red'>(koper)</span> untuk liburan yang menyenangkan."
  },
  story4: {
    title: "Harmoni Alam",
    difficulty: "Sulit",
    content: "Di sebuah hutan, hiduplah seekor <span style='color:red'>(kelinci)</span> putih yang sangat menyukai wortel."
  }
};

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return homeHandler(request, h, 'home');
    }
  },
  {
    method: 'GET',
    path: '/stories',
    handler: (request, h) => {
      const storySummaries = Object.keys(stories).map(key => ({
        title: stories[key].title,
        difficulty: stories[key].difficulty,
        id: key
      }));
      
      return h.response(storySummaries).code(200);
    },
  },
  {
    method: 'GET',
    path: '/stories/{id}',
    handler: (request, h) => {
      const { id } = request.params;
      const story = stories[id];
      
      if (!story) {
        return h.response({ error: 'Story not found' }).code(404);
      }
      
      return h.response({ story: story.content }).code(200);
    }
  },
  {
    method: 'POST',
    path: '/stories/{id}',
    handler: (request, h) => {
      const { id } = request.params;
      const story = stories[id];
      
      if (!story) {
        return h.response({ error: 'Story not found' }).code(404);
      }
      
      const storyTypeMap = {
        story1: 'Jack',
        story2: 'Lily',
        story3: 'Andy',
        story4: 'Turtle'
      };

      const storyType = storyTypeMap[id];
      return postPredictHandler(request, h, storyType);
    },
    options: {
      payload: {
        allow: ['application/json'],
        parse: true
      }
    }
  }
];

module.exports = routes;
