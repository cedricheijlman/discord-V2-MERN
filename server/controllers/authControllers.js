const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      const accessToken = sign(
        { email, id: findUser._id, username: findUser.username },
        process.env.SECRET_CODE,
        {
          expiresIn: "1h",
        }
      );

      return res
        .status(200)
        .json({ message: "Logged In", accessToken, id: findUser._id });
    }

    return res.status(200).json({ message: "Invalid Email or Password" });
  } catch {
    return res.status(400).json({ message: "something went wrong" });
  }
};

const validateUser = async (req, res) => {
  try {
    const { accessTokenKey } = req.body;
    const payload = verify(accessTokenKey, process.env.SECRET_CODE);
    res.status(200).json({ payload });
  } catch (error) {
    res.status(401).json({ message: "error" });
  }
};

const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const UserEmailExists = await User.exists({ email: email.toLowerCase() });

    if (UserEmailExists) {
      return res.status(200).json({ message: "Email already in use" });
    }

    const UsernameExists = await User.exists({
      username: username.toLowerCase(),
    });

    if (UsernameExists) {
      return res.status(200).json({ message: "Username already in use" });
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const accessToken = sign(
      { email, id: newUser._id, username },
      process.env.SECRET_CODE,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({
      userDetails: {
        email,
        username,
      },
      accessToken,
    });
  } catch (error) {
    return res.status(404).send({ error: "error" });
  }
};

module.exports = {
  postLogin,
  postRegister,
  validateUser,
};
