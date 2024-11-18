const prisma = require('../prisma/client');

exports.getRawMaterials = async (req, res, next) => {
  try {
    const rawMaterials = await prisma.rawMaterial.findMany();
    res.status(200).json(rawMaterials);
  } catch (error) {
    next(error);
  }
};

exports.createRawMaterial = async (req, res, next) => {
  try {
    const { name, description, quantity, unitPrice, productId } = req.body;
    if(!name || !description || !quantity || !unitPrice || !productId){
        res.status(400).json({ error : "body parameters missing"});
    }
    const rawMaterial = await prisma.rawMaterial.create({
      data: { name, description, quantity, unitPrice, productId },
    });

    res.status(201).json({ message: 'Raw material created successfully', rawMaterial });
  } catch (error) {
    next(error);
  }
};