const prisma = require('../prisma/client');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if(!name){
        res.status(400).json({ error : "body parameters missing"});
    }
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    next(error);
  }
};
