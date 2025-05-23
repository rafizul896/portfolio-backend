import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import createAdmin from "./app/modules/user";

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URI as string);
    createAdmin();
    
    app.listen(config.PORT, () => {
      console.log(`app is listening on port ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
