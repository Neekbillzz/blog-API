const Joi = require("joi");

const ArticleModel = require("../models/article.model");

// Inside your createArticle controller
const postArticle = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newArticle = new ArticleModel({
      title,
      content,
      author: req.user.userId, // This comes from your requireAuth middleware!
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllArticle = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find({});

    return res.status(200).json({
      message: "Articles fetched",
      data: articles,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const article = await ArticleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: `Article with ${req.params.id} not found`,
      });
    }
    return res.status(200).json({
      message: "article found",
      data: article,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateArticleById = async (req, res, next) => {
  const articleSchema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(5).required(),
    author: Joi.string().default("Guest"),
    category: Joi.string().default("General"),
    readTime: Joi.number().min(1).default(5),
    status: Joi.string().valid("draft", "published").default("draft"),
  });

  const result = articleSchema.validate(req.body);
  const error = result.error;
  const value = result.value;

  console.log(value);

  if (error) {
    return res.status(400).json("Please provide article title and content");
  }
  try {
    const updateArticle = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      value,

      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateArticle) {
      return res.status(404).json({
        message: "article updated",
        data: updateArticle,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updatedArticle = async (req, res, next) => {
  try {
    // 1. Joi Validation (Checking for all required fields)
    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      content: Joi.string().min(5).required(),
      author: Joi.string().default("Guest"),
      category: Joi.string().default("General"),
      readTime: Joi.number().min(1).default(5),
      status: Joi.string().valid("draft", "published").default("draft"),
    });

    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // 2. Update database
    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, overwrite: true }, // overwrite: true enforces PUT behavior
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteArticleById = async (req, res, next) => {
  try {
    const deletedArticle = await ArticleModel.findByIdAndDelete(req.params.id);

    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    return res.status(200).json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    console.error(error);
    next(NativeError);
  }
};

const searchArticles = async (req, res, next) => {
  try {
    const { q } = req.query; // query keyword

    if (!q) {
      return res.status(400).json({ message: "Search query 'q' is required" });
    }

    const results = await ArticleModel.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } },
    ).sort({ score: { $meta: "textScore" } });

    res.status(200).json({
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postArticle,
  getAllArticle,
  getArticleById,
  updateArticleById,
  updatedArticle,
  deleteArticleById,
  searchArticles,
};
