require("dotenv").config()
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connectDB");
const logRequest = require("./middlewares/logger");
const errorhandler = require("./middlewares/errHandler");
const ArticleRoutes = require("./routes/article.route");
const UserRoutes = require("./routes/user.route")

const app = express();
const PORT = process.env.PORT ||3017

connectDB();

app.use(express.json());
app.use(logRequest);
app.use(cors("*"));



app.use('/auth', ArticleRoutes);
app.use('/auth/users', UserRoutes)


app.use(errorhandler);






app.listen(PORT, () => {
console.log(`Server is listening on Port ${PORT}`);
});