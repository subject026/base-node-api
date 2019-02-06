// Generic methods available for all models

const createOne = model => async (req, res) => {
  // If user on req we'll attach id to new record
  const createdBy = req.user ? req.user._id : false;
  try {
    const doc = await model.create({ ...req.body, createdBy });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Could not create document' });
  }
};

const getAll = model => async (req, res) => {
  // TO DO -
  // Add ability to get records based on document owner if arg passed in (id)
  try {
    const docs = await model.find();
    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// Export fn that takes model and produces
// obj containing all generic crud controllers
const generateControllers = model => ({
  createOne: createOne(model),
  getAll: getAll(model),
});


module.exports = generateControllers;
