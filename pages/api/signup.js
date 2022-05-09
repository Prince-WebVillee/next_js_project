import initDB from "../../helpers/initDB";
import User from "../../models/User";
import bcrypt from "bcrypt";
initDB();

export default async (req, res) => {
  const { email, password, phone } = req.body;
  try {
    if (!email || !password || !phone) {
      return res.status(422).json({ error: "please add all the fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(422)
        .json({ error: "User already exist with this email" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await new User({
        email,
        password: hashedPassword,
        phone,
      }).save();

      console.log(newUser);
      res.status(201).json({ message: "signed up successfully" });
    }
  } catch (err) {
    console.log("internal server error", err);
  }
};
