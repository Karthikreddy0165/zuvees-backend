const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/client');

exports.register = async (req, res, next) => {
  try {
    const { email, password, role, firstName, lastName, address } = req.body;
    if(!email || !password || !role || !firstName || !lastName || !address){
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role, firstName, lastName, address },
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};
