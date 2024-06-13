const postPredictHandler = require('../server/handler');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'success!';
    },
  },

  {
    method: 'GET',
    path: '/stories',
    handler: (request, h) => {
      const stories = [
        {
          title: "Jack and the Hidden Boys",
          difficulty: "Normal",
          id: "story1"
        },
        {
          title: "Lily's",
          difficulty: "Normal",
          id: "story2"
        },
        {
          title: "Tiger Adventures in the wild",
          difficulty: "Hard",
          id: "story3"
        },
        {
          title: "The Turtle and The Rabbit",
          difficulty: "Normal",
          id: "story4"
        }
      ];
      
      return h.response(stories).code(200);
      },
  },

  {
    path: '/stories/stories1',
    method: 'POST',
    handler: (request, h) => postPredictHandler(request, h, 'Lily'),
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  },

  {
    path: '/stories/stories2',
    method: 'POST',
    handler: (request, h) => postPredictHandler(request, h, 'Jack'),
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  }
];

module.exports = routes;
