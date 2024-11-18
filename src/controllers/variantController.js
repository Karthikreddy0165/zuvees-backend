const prisma = require('../prisma/client');

exports.getVariants = async (req, res, next) => {
  try {
    const variants = await prisma.variant.findMany();
    res.status(200).json(variants);
  } catch (error) {
    next(error);
  }
};

exports.createVariant = async (req, res, next) => {
  try {
    const { productId, size, color, price, stock, imageUrl } = req.body;
    if(!productId || !size || !color || !price || !stock ||imageUrl){ 
        res.status(400).json({ error : "body parameters missing"});
    }
    const variant = await prisma.variant.create({
      data: { productId, size, color, price, stock, imageUrl },
    });

    res.status(201).json({ message: 'Variant created successfully', variant });
  } catch (error) {
    next(error);
  }
};
