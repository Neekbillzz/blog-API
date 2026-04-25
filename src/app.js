const express = require("express");
const cors = require("cors");
const logRequest = require("./middlewares/logger");
const errorhandler = require("./middlewares/errHandler");
const ArticleRoutes = require("./routes/article.route");
const UserRoutes = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use(logRequest);
app.use(cors("*"));

app.use("/auth/users", UserRoutes);
app.use("/auth", ArticleRoutes);


app.use(errorhandler);

module.exports = app;
