const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema chung cho tất cả các loại bài báo
const articleSchema = new Schema({
    Index2: Number,
    PMID: Number,
    Article_citation: String,
    Heading_title: String,
    Authors: String,
    Affiliation: String,
    Identifiers: String,
    Abstract: String,
    Free_label: String,
    Category: Number,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

// Tạo model cho từng loại ung thư với collection khác nhau
const LungArticle = mongoose.model('lung_article', articleSchema, 'lung_article');
const BreastArticle = mongoose.model('breast_article', articleSchema, 'breast_article');
const ColorectalArticle = mongoose.model('colorectal_article', articleSchema, 'colorectal_article');
const HepatocellularArticle = mongoose.model('hepatocellular_article', articleSchema, 'hepatocellular_article');
const ThyroidArticle = mongoose.model('thyroid_article', articleSchema, 'thyroid_article');

// Mapping từ cancer type sang model tương ứng
const getModelByType = (type) => {
    const modelMap = {
        'lung-cancer': LungArticle,
        'breast-cancer': BreastArticle,
        'colorectal-cancer': ColorectalArticle,
        'liver-cancer': HepatocellularArticle,
        'thyroid-cancer': ThyroidArticle
    };
    return modelMap[type] || null;
};

module.exports = {
    LungArticle,
    BreastArticle,
    ColorectalArticle,
    HepatocellularArticle,
    ThyroidArticle,
    getModelByType,
    articleSchema
};
