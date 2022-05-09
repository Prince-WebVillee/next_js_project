import initDB from "../../helpers/initDB";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
initDB();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "please add all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User Doesn't Exist with this email" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });
      const { email, role, phone } = user;
      res.status(201).json({ token, user: { email, role, phone } });
    } else {
      return res.status(401).json({ error: "email or password doesnot match" });
    }
  } catch (err) {
    console.log("internal server error", err);
  }
};
