// Generic methods available for all models

const createOne = model => async (req, res) => {
  // If user on req we'll attach id to new record
  const createdBy = req.user ? req.user._id : false;
  try {
    const doc = await model.create({ ...req.body, createdBy });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// Export fn that takes model and produces
// obj containing all generic crud controllers
const generateControllers = model => ({
  createOne: createOne(model),
});


module.exports = generateControllers;
