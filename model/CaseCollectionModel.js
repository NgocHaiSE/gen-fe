const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseCollectionModel = new Schema({
    collectionName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    userId: {
        type: String,
        required: true,
        index: true
    },
    testCases: [{
        testCaseId: {
            type: Schema.Types.ObjectId,
            ref: 'test_cases'
        },
        addedAt: {
            type: Date,
            default: Date.now
        },
        note: {
            type: String,
            default: ''
        }
    }],
    isPublic: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String,
        trim: true
    }],
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

// Index để tìm kiếm nhanh
CaseCollectionModel.index({ userId: 1, collectionName: 1 });
CaseCollectionModel.index({ userId: 1, createAt: -1 });

// Middleware để cập nhật updateAt
CaseCollectionModel.pre('save', function (next) {
    this.updateAt = Date.now();
    next();
});

module.exports = mongoose.model('case_collection', CaseCollectionModel);
