const express = require("express");

const {
    postArticle,
    getAllArticle,
    getArticleById,
    updateArticleById,
    updatedArticle,
    deleteArticleById,
    searchArticles,
 } = require("../controllers/article.controller");
const requireAuth = require("../validations/requireAuth");

const router = express.Router();

router.use(requireAuth);


router.post("/articles", postArticle);

router.get("/articles", getAllArticle);

router.get("/articles/search", searchArticles);

router.get("/articles/:id", getArticleById);

router.patch("/articles/:id", updateArticleById);

router.put("/articles/:id", updatedArticle);

router.delete("/articles/:id", deleteArticleById);

module.exports = router;
