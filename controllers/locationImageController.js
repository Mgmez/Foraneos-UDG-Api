const {
  locationImage,
} = require('../models');

exports.create = async (req, res) => {
  let result = await locationImage.create(req.body);

  if (result === 0) {
    result = {
      error: {
        status: 409,
        message: 'Conflict creating resource',
      },
    };
    res.status(409);
  } else {
    res.status(201);
  }

  res.send(result);
};

exports.remove = async (req, res) => {
  let result = await locationImage.remove(req.params.locationImageId);

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
