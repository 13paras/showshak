import { app } from "./app.js";
import { config } from "./config/config.js";
import { connectDB } from "./db/index.js";

// connecting to mongoDB
connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.log('ERRRRRRRR: ', error);
      throw error;
    });
    app.listen(config.PORT, () => {
      console.log(`Server is running at port `, process.env.PORT);
    });
  })
  .catch((err) => {
    console.log('Mongo DB connection failed !!', err.message);
  });
