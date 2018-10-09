const {
  service,
} = require('../models');

exports.showAll = async (req, res) => {
  let result = await service.getAll();

  if (result === 0) {
    result = {
      error: {
        status: 404,
        message: 'Resource not found',
      },
    };
    res.status(404);
  }

  res.send(result);
};