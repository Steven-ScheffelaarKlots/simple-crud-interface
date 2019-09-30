const db = require('../queries')

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', db.getAllArticles)

router.get('/:id', db.getArticle)

router.post('/', db.createArticle)

router.put("/:id", db.updateArticle)

router.delete("/:id", db.deleteArticle)

module.exports = router;
