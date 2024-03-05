const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

async function register(req, res) {
  try {
    const data = req.body;
    const usr = new User(data);
    const salt = await bcrypt.genSalt(10);
    const cryptedPass = await bcrypt.hash(data.password, salt);
    usr.password = cryptedPass;
    const savedUser = await usr.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function login(req, res) {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });

    if (!user) {
      res.status(404).send("Email or password is invalid");
    } else {
      const isValidPass = bcrypt.compareSync(data.password, user.password);
      if (!isValidPass) {
        res.status(401).send("Email or password is invalid !");
      } else {
        const payload = {
          _id: user.id,
          email: user.email,
          name: user.name,
        };
        const token = jwt.sign(payload, "123456");
        res.status(200).send({ mytoken: token, user });
      }
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

async function update(req, res) {
  try {
    const userId = req.params.id;
    const newData = req.body;
    const salt = await bcrypt.genSalt(10);
    const cryptedPass = await bcrypt.hash(newData.password, salt);
    newData.password = cryptedPass;
    const updatedUser = await User.findByIdAndUpdate(userId, newData);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function generateCode(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}
async function sendEmail(userEmail, message) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ala.messaoud12@gmail.com",
        pass: "eooo rkpm irtb igsy",
      },
    });

    const mailOptions = {
      from: "ala.messaoud12@gmail.com",
      to: userEmail,
      subject: "Your New Password",
      html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Reset Your Password</title>
            </head>
            <body>
                <p>Hello,</p>
                <p>You are receiving this email because we received a password reset request for your account.</p>
                <p> Here is your Reset Token : </p>
                <h1>${message}</h1>
                <p>If you did not request a password reset, please ignore this email.</p>
            </body>
            </html>
            `,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
}
async function resetPassword(req, res) {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send("L'utilisateur n'existe pas");
    } else {
      const token = await generateCode(5);
      await sendEmail(email, ` ${token}`);
      res.status(200).send({ token: token, user });
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
  register,
  login,
  update,
  deleteUser,
  getAllUsers,
  resetPassword,
};
