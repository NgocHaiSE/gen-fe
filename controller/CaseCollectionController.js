const CaseCollectionModel = require('../models/CaseCollectionModel');
const TestCaseModel = require('../models/TestCaseModel');
const authenticateToken = require('./sharedFunction/authentication');
const jwt = require('jsonwebtoken');

class CaseCollectionController {
    // POST /case-collection/create - Tạo collection mới
    createCollection = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(401).json({
                    success: false,
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            // Lấy userId từ token
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decoded.id; // decoded.id chứa user._id từ MongoDB

            const { collectionName, description, tags } = req.body;

            if (!collectionName || collectionName.trim() === '') {
                return res.status(400).json({
                    success: false,
                    errorCode: '1005',
                    message: 'Tên bộ sưu tập không được để trống',
                });
            }

            // Kiểm tra trùng tên
            const existingCollection = await CaseCollectionModel.findOne({
                userId: userId,
                collectionName: collectionName.trim()
            });

            if (existingCollection) {
                return res.status(400).json({
                    success: false,
                    errorCode: '1006',
                    message: 'Bộ sưu tập với tên này đã tồn tại',
                });
            }

            const newCollection = new CaseCollectionModel({
                collectionName: collectionName.trim(),
                description: description || '',
                userId: userId,
                tags: tags || [],
                testCases: []
            });

            const savedCollection = await newCollection.save();

            return res.status(201).json({
                success: true,
                data: savedCollection,
                errorCode: '1001',
                message: 'Tạo bộ sưu tập thành công',
            });
        } catch (error) {
            console.error('Error creating collection:', error);
            return res.status(500).json({
                success: false,
                errorCode: '1003',
                message: 'Có lỗi xảy ra khi tạo bộ sưu tập',
                error: error.message
            });
        }
    };

    // GET /case-collection/my-collections - Lấy tất cả collections của user
    getMyCollections = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(401).json({
                    success: false,
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decoded.id;

            const collections = await CaseCollectionModel.find({ userId: userId })
                .sort({ updateAt: -1 })
                .lean();

            // Thêm thông tin số lượng test cases
            const collectionsWithCount = collections.map(collection => ({
                ...collection,
                testCasesCount: collection.testCases.length
            }));

            return res.status(200).json({
                success: true,
                data: collectionsWithCount,
                total: collectionsWithCount.length,
                errorCode: '1001',
                message: 'Lấy danh sách bộ sưu tập thành công',
            });
        } catch (error) {
            console.error('Error getting collections:', error);
            return res.status(500).json({
                success: false,
                errorCode: '1003',
                message: 'Có lỗi xảy ra khi lấy danh sách bộ sưu tập',
                error: error.message
            });
        }
    };

    // GET /case-collection/:id - Lấy chi tiết một collection
    getCollectionById = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(401).json({
                    success: false,
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decoded.id;

            const { id } = req.params;

            const collection = await CaseCollectionModel.findOne({
                _id: id,
                userId: userId
            }).lean();

            if (!collection) {
                return res.status(404).json({
                    success: false,
                    errorCode: '1004',
                    message: 'Không tìm thấy bộ sưu tập',
                });
            }

            // Populate test cases details
            const testCaseIds = collection.testCases.map(tc => tc.testCaseId);
            const testCasesDetails = await TestCaseModel.find({
                _id: { $in: testCaseIds }
            }).lean();

            // Map test cases với note từ collection
            const testCasesWithNotes = collection.testCases.map(tc => {
                const testCaseDetail = testCasesDetails.find(
                    detail => detail._id.toString() === tc.testCaseId.toString()
                );
                return {
                    ...testCaseDetail,
                    collectionNote: tc.note,
                    addedAt: tc.addedAt
                };
            }).filter(tc => tc._id); // Lọc bỏ các test case đã bị xóa

            return res.status(200).json({
                success: true,
                data: {
                    ...collection,
                    testCases: testCasesWithNotes,
                    testCasesCount: testCasesWithNotes.length
                },
                errorCode: '1001',
                message: 'Lấy thông tin bộ sưu tập thành công',
            });
        } catch (error) {
            console.error('Error getting collection:', error);
            return res.status(500).json({
                success: false,
                errorCode: '1003',
                message: 'Có lỗi xảy ra khi lấy thông tin bộ sưu tập',
                error: error.message
            });
        }
    };

    // PUT /case-collection/:id - Cập nhật thông tin collection
    updateCollection = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(401).json({
                    success: false,
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decoded.id;

            const { id } = req.params;
            const { collectionName, description, tags } = req.body;

            const collection = await CaseCollectionModel.findOne({
                _id: id,
                userId: userId
            });

            if (!collection) {
                return res.status(404).json({
                    success: false,
                    errorCode: '1004',
                    message: 'Không tìm thấy bộ sưu tập',
                });
            }

            // Cập nhật các trường
            if (collectionName) collection.collectionName = collectionName.trim();
            if (description !== undefined) collection.description = description;
            if (tags) collection.tags = tags;

            const updatedCollection = await collection.save();

            return res.status(200).json({
                success: true,
                data: updatedCollection,
                errorCode: '1001',
                message: 'Cập nhật bộ sưu tập thành công',
            });
        } catch (error) {
            console.error('Error updating collection:', error);
            return res.status(500).json({
                success: false,
                errorCode: '1003',
                message: 'Có lỗi xảy ra khi cập nhật bộ sưu tập',
                error: error.message
            });
        }
    };

    // DELETE /case-collection/:id - Xóa collection
    deleteCollection = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(401).json({
                    success: false,
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decoded.id;

            const { id } = req.params;

            const result = await CaseCollectionModel.deleteOne({
                _id: id,
                userId: userId
            });

            if (result.deletedCount === 0) {
                return res.status(404).json({
                    success: false,
                    errorCode: '1004',
                    message: 'Không tìm thấy bộ sưu tập',
                });
            }

            return res.status(200).json({
                success: true,
                errorCode: '1001',
                message: 'Xóa bộ sưu tập thành công',
            });
        } catch (error) {
            console.error('Error deleting collection:', error);
            return res.status(500).json({
                success: false,
                errorCode: '1003',
                message: 'Có lỗi xảy ra khi xóa bộ sưu tập',
                error: error.message
            });
        }
    };

    // POST /case-collection/:id/add-case - Thêm test case vào collection
    addTestCaseToCollection = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(401).json({
                    success: false,
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decoded.id;

            const { id } = req.params;
            const { testCaseId, note } = req.body;

            if (!testCaseId) {
                return res.status(400).json({
                    success: false,
                    errorCode: '1005',
                    message: 'Test case ID không được để trống',
                });
            }

            // Kiểm tra test case có tồn tại không
            const testCase = await TestCaseModel.findById(testCaseId);
            if (!testCase) {
                return res.status(404).json({
                    success: false,
                    errorCode: '1004',
                    message: 'Không tìm thấy test case',
                });
            }

            const collection = await CaseCollectionModel.findOne({
                _id: id,
                userId: userId
            });

            if (!collection) {
                return res.status(404).json({
                    success: false,
                    errorCode: '1004',
                    message: 'Không tìm thấy bộ sưu tập',
                });
            }

            // Kiểm tra test case đã có trong collection chưa
            const exists = collection.testCases.some(
                tc => tc.testCaseId.toString() === testCaseId
            );

            if (exists) {
                return res.status(400).json({
                    success: false,
                    errorCode: '1006',
                    message: 'Test case đã có trong bộ sưu tập',
                });
            }

            // Thêm test case
            collection.testCases.push({
                testCaseId: testCaseId,
                note: note || '',
                addedAt: new Date()
            });

            const updatedCollection = await collection.save();

            return res.status(200).json({
                success: true,
                data: updatedCollection,
                errorCode: '1001',
                message: 'Thêm test case vào bộ sưu tập thành công',
            });
        } catch (error) {
            console.error('Error adding test case to collection:', error);
            return res.status(500).json({
                success: false,
                errorCode: '1003',
                message: 'Có lỗi xảy ra khi thêm test case',
                error: error.message
            });
        }
    };

    // DELETE /case-collection/:id/remove-case/:testCaseId - Xóa test case khỏi collection
    removeTestCaseFromCollection = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(401).json({
                    success: false,
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decoded.id;

            const { id, testCaseId } = req.params;

            const collection = await CaseCollectionModel.findOne({
                _id: id,
                userId: userId
            });

            if (!collection) {
                return res.status(404).json({
                    success: false,
                    errorCode: '1004',
                    message: 'Không tìm thấy bộ sưu tập',
                });
            }

            // Xóa test case
            collection.testCases = collection.testCases.filter(
                tc => tc.testCaseId.toString() !== testCaseId
            );

            const updatedCollection = await collection.save();

            return res.status(200).json({
                success: true,
                data: updatedCollection,
                errorCode: '1001',
                message: 'Xóa test case khỏi bộ sưu tập thành công',
            });
        } catch (error) {
            console.error('Error removing test case from collection:', error);
            return res.status(500).json({
                success: false,
                errorCode: '1003',
                message: 'Có lỗi xảy ra khi xóa test case',
                error: error.message
            });
        }
    };

    // PUT /case-collection/:id/update-note/:testCaseId - Cập nhật ghi chú cho test case
    updateTestCaseNote = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(401).json({
                    success: false,
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decoded.id;

            const { id, testCaseId } = req.params;
            const { note } = req.body;

            const collection = await CaseCollectionModel.findOne({
                _id: id,
                userId: userId
            });

            if (!collection) {
                return res.status(404).json({
                    success: false,
                    errorCode: '1004',
                    message: 'Không tìm thấy bộ sưu tập',
                });
            }

            // Tìm và cập nhật note
            const testCase = collection.testCases.find(
                tc => tc.testCaseId.toString() === testCaseId
            );

            if (!testCase) {
                return res.status(404).json({
                    success: false,
                    errorCode: '1004',
                    message: 'Không tìm thấy test case trong bộ sưu tập',
                });
            }

            testCase.note = note || '';

            const updatedCollection = await collection.save();

            return res.status(200).json({
                success: true,
                data: updatedCollection,
                errorCode: '1001',
                message: 'Cập nhật ghi chú thành công',
            });
        } catch (error) {
            console.error('Error updating test case note:', error);
            return res.status(500).json({
                success: false,
                errorCode: '1003',
                message: 'Có lỗi xảy ra khi cập nhật ghi chú',
                error: error.message
            });
        }
    };

    // POST /case-collection/batch-add - Thêm nhiều test cases vào collection
    batchAddTestCases = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(401).json({
                    success: false,
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decoded.id;

            const { collectionId, testCaseIds } = req.body;

            if (!collectionId || !testCaseIds || !Array.isArray(testCaseIds)) {
                return res.status(400).json({
                    success: false,
                    errorCode: '1005',
                    message: 'Dữ liệu không hợp lệ',
                });
            }

            const collection = await CaseCollectionModel.findOne({
                _id: collectionId,
                userId: userId
            });

            if (!collection) {
                return res.status(404).json({
                    success: false,
                    errorCode: '1004',
                    message: 'Không tìm thấy bộ sưu tập',
                });
            }

            let addedCount = 0;
            let skippedCount = 0;

            for (const testCaseId of testCaseIds) {
                // Kiểm tra test case có tồn tại không
                const testCase = await TestCaseModel.findById(testCaseId);
                if (!testCase) {
                    skippedCount++;
                    continue;
                }

                // Kiểm tra đã tồn tại chưa
                const exists = collection.testCases.some(
                    tc => tc.testCaseId.toString() === testCaseId
                );

                if (!exists) {
                    collection.testCases.push({
                        testCaseId: testCaseId,
                        note: '',
                        addedAt: new Date()
                    });
                    addedCount++;
                } else {
                    skippedCount++;
                }
            }

            const updatedCollection = await collection.save();

            return res.status(200).json({
                success: true,
                data: updatedCollection,
                addedCount: addedCount,
                skippedCount: skippedCount,
                errorCode: '1001',
                message: `Đã thêm ${addedCount} test case, bỏ qua ${skippedCount} test case`,
            });
        } catch (error) {
            console.error('Error batch adding test cases:', error);
            return res.status(500).json({
                success: false,
                errorCode: '1003',
                message: 'Có lỗi xảy ra khi thêm test cases',
                error: error.message
            });
        }
    };

    // GET /case-collection/search - Tìm kiếm collections
    searchCollections = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(401).json({
                    success: false,
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decoded.id;

            const { keyword, tag } = req.query;

            let query = { userId: userId };

            if (keyword) {
                query.$or = [
                    { collectionName: new RegExp(keyword, 'i') },
                    { description: new RegExp(keyword, 'i') }
                ];
            }

            if (tag) {
                query.tags = tag;
            }

            const collections = await CaseCollectionModel.find(query)
                .sort({ updateAt: -1 })
                .lean();

            const collectionsWithCount = collections.map(collection => ({
                ...collection,
                testCasesCount: collection.testCases.length
            }));

            return res.status(200).json({
                success: true,
                data: collectionsWithCount,
                total: collectionsWithCount.length,
                errorCode: '1001',
                message: 'Tìm kiếm thành công',
            });
        } catch (error) {
            console.error('Error searching collections:', error);
            return res.status(500).json({
                success: false,
                errorCode: '1003',
                message: 'Có lỗi xảy ra khi tìm kiếm',
                error: error.message
            });
        }
    };
}

module.exports = new CaseCollectionController();
