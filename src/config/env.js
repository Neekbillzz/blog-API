require("dotenv").config();

// const requiredVariables = ['PORT', 'MONGODB_URI', 'JWT_SECRET']

const env = {
  port: process.env.PORT,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};

Object.entries(env).forEach(([key, value]) => {
    if (!value) {
  throw new Error(`ERROR: Environment variable "${key}" is not defined`);
    }
});

module.exports = env;
