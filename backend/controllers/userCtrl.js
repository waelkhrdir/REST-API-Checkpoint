const User = require("../models/User");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, password, phone, email } = req.body;
  try {
    //check user existance with email
    const user = await User.findOne({ email });
    if (user) return res.status(401).json({ err: "you are already registred" });

    // CRYPT PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // save user
    const newUser = new User({ name, email, password: hash, phone });
    await newUser.save();
    // add token
    const payload = {
      userId: newUser._id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

exports.login = async (req, res) => {
  const { password, email } = req.body;
  try {
    //check user existance with email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ err: "bad credentials" });

    // Check PASSWORD

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ err: "bad credentials" });
    
    // add token
    const payload = {
        userId: user._id,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY);
      res.status(200).json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          phone: user.phone,
        },
      });

    
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};


exports.getCurrentUser = (req,res) => {
    res.send(req.user)
}