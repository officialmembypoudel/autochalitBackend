import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const clientOptions = {
      serverApi: { version: "1", strict: false, deprecationErrors: true },
    };
    const { connection } = await mongoose.connect(
      "mongodb+srv://memby:memby%40098@autochalit.2vrumew.mongodb.net/Autochalit?retryWrites=true&w=majority&appName=Autochalit",
      clientOptions
    );

    // const { connection } = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};
