const prisma = require('../prisma/client');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, variants: true, rawMaterials: true },
    });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, imageUrl, categoryId } = req.body;
    if(!name || !description || !price || !stock || !imageUrl ||  !categoryId){
        res.status(400).json({ error : "body parameters missing"});
    }
    const product = await prisma.product.create({
      data: { name, description, price, stock, imageUrl, categoryId },
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    next(error);
  }
};
