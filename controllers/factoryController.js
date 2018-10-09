const factory = require('../factory');


exports.fillUpDB = async (req, res) => {
  let result = await factory.fillUpDB(req.query.num);

  if (result === 0) {
    result = {
      error: {
        status: 409,
        message: 'Error filling up the database',
      },
    };
    res.status(409);
  } else {
    result = {
      factory: {
        status: 201,
        message: `${result} tables filled up with ${req.query.num} elements`,
      },
    };
    res.status(201);
  }

  res.send(result);
};