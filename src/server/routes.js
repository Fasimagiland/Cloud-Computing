const postPredictHandler = require('../server/handler');

const routes = [
  {
    path: '/lily',
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
    path: '/jack',
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
