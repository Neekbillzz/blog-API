require("dotenv").config();

const connectDB = require("./src/config/db");

const app = require("./src/app");


const PORT = process.env.PORT || 3020;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is listening on Port ${PORT}`);
});
