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
          title: "Lily's Adventure",
          difficulty: "Normal",
          id: "story2"
        },
        {
          title: "Tiger Adventures in the Wild",
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
        allow: 'application/json',
        parse: true
      }
    }
  },

  {
    path: '/stories/stories2',
    method: 'POST',
    handler: (request, h) => postPredictHandler(request, h, 'Jack'),
    options: {
      payload: {
        allow: 'application/json',
        parse: true
      }
    }
  },

  {
    path: '/stories/stories3',
    method: 'POST',
    handler: (request, h) => postPredictHandler(request, h, 'Andy'),
    options: {
      payload: {
        allow: 'application/json',
        parse: true
      }
    }
  },

  {
    path: '/stories/stories4',
    method: 'POST',
    handler: (request, h) => postPredictHandler(request, h, 'Tiger'),
    options: {
      payload: {
        allow: 'application/json',
        parse: true
      }
    }
  },

  {
    path: '/stories/stories5',
    method: 'POST',
    handler: (request, h) => postPredictHandler(request, h, 'Turtle'),
    options: {
      payload: {
        allow: 'application/json',
        parse: true
      }
    }
  }
];

module.exports = routes;
