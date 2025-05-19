import mongoose from "mongoose";
import app from "./app";

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/portfolioDB");

    app.listen(5000, () => {
      console.log(`app is listening on port 5000`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
