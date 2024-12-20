import mongoose from "mongoose";

export const mongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`database connection established`.bgCyan.white);
  } catch (error) {
    console.log(error.message.bgRed.white);
  }
};
