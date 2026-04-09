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
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();


router.post("/articles", requireAuth, postArticle);

router.get("/articles", requireAuth, getAllArticle);

router.get("/articles/search", requireAuth, searchArticles);

router.get("/articles/:id", requireAuth, getArticleById);

router.patch("/articles/:id", requireAuth, updateArticleById);

router.put("/articles/:id", requireAuth, updatedArticle);

router.delete("/articles/:id", requireAuth, deleteArticleById);

module.exports = router;
