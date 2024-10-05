const prisma = require('../../dbConfig/index');
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });
    console.log('new user is: ', newUser);
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.log('Error is: ', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid Email or password' });
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid Email or password' });
    }

    res.status(200).json({ message: `Login successful ${user.firstName}` });
  } catch (error) {
    console.log('Error is: ', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
};
