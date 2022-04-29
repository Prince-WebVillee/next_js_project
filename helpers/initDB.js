import mongoose from "mongoose";

const initDB = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("connect to database");
  });
  mongoose.connection.on("error", (err) => {
    console.log("error database not connected", err);
  });
};

export default initDB();
