const prisma = require('../prisma/client');

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({ include: { orderItems: true } });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { userId, totalAmount, status, orderItems } = req.body;
    if(!userId || !totalAmount || !status || !orderItems){ 
        res.status(400).json({ error : "body parameters missing"});
    }
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status,
        orderItems: {
          create: orderItems,
        },
      },
    });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    next(error);
  }
};
