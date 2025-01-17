import createApp from "./src/app.js";
import pool from "./src/pool.js";

const app = createApp();

pool
  .connect({
    host: "localhost",
    port: 5432,
    database: "social_api_access",
    user: "leodaniels",
    password: "",
  })
  .then(() => {
    app.listen(3005, () => {
      console.log("Listening on port 3005");
    });
  })
  .catch((err) => {
    console.error(err);
  });
