const express = require("express");
const { getModelByType } = require("../model/ArticleModel");

const app = express();
app.use(express.json());

// Danh sách các loại ung thư hợp lệ
const validTypes = ['lung-cancer', 'breast-cancer', 'colorectal-cancer', 'liver-cancer', 'thyroid-cancer'];

class ArticleController {
    /**
     * Get articles by cancer type from MongoDB
     * Supports: pagination, search, category filter
     * 
     * Query params:
     * - page: number (default 1)
     * - limit: number (default 10)
     * - search: string (search by title, authors, abstract)
     * - category: string ('All', '1', '0')
     */
    async getArticlesByType(req, res) {
        try {
            const type = req.params.type;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const search = req.query.search || '';
            const category = req.query.category || 'All';

            // Get the appropriate model for the cancer type
            const ArticleModel = getModelByType(type);
            if (!ArticleModel) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid cancer type',
                    validTypes: validTypes
                });
            }

            // Build query
            const query = {};

            // Filter by category
            if (category !== 'All') {
                query.Category = parseInt(category, 10);
            }

            // Search by title, authors, or abstract
            if (search.trim()) {
                const searchRegex = new RegExp(search.trim(), 'i');
                query.$or = [
                    { Heading_title: searchRegex },
                    { Authors: searchRegex },
                    { Abstract: searchRegex }
                ];
            }

            // Get total count
            const total = await ArticleModel.countDocuments(query);

            // Get paginated articles
            const articles = await ArticleModel
                .find(query)
                .skip(skip)
                .limit(limit)
                .lean();

            const totalPages = Math.ceil(total / limit);

            return res.status(200).json({
                success: true,
                data: articles,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages
                }
            });
        } catch (error) {
            console.error('Error in getArticlesByType:', error);
            return res.status(500).json({
                success: false,
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }

    /**
     * Get all available cancer types
     */
    getAvailableTypes(req, res) {
        return res.status(200).json({
            success: true,
            types: validTypes
        });
    }

    /**
     * Get single article by ID
     */
    async getArticleById(req, res) {
        try {
            const type = req.params.type;
            const id = req.params.id;

            const ArticleModel = getModelByType(type);
            if (!ArticleModel) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid cancer type'
                });
            }

            const article = await ArticleModel.findById(id).lean();
            if (!article) {
                return res.status(404).json({
                    success: false,
                    error: 'Article not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: article
            });
        } catch (error) {
            console.error('Error in getArticleById:', error);
            return res.status(500).json({
                success: false,
                error: 'Internal Server Error',
                message: error.message
            });
        }
    }
}

module.exports = new ArticleController();
