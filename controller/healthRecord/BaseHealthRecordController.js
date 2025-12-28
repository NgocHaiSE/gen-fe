const authenticateToken = require('../sharedFunction/authentication');

/**
 * Factory function that creates a health record controller with all common CRUD methods.
 * This eliminates code duplication across different cancer type controllers.
 * 
 * @param {Object} Model - Mongoose model for the specific health record type
 * @returns {Object} Controller object with all CRUD methods
 */
const createHealthRecordController = (Model) => {
    /**
     * Helper function to escape special regex characters
     */
    const escapeRegex = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    /**
     * Save or update a health record
     */
    const save = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(500).json({
                    success: false,
                    data: {},
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            let newHealthRecord = await Model.findById(req.body?._id);

            if (!newHealthRecord) {
                console.log('Creating new record');
                newHealthRecord = new Model();
            }

            // Copy all fields from request body
            newHealthRecord.healthRecordId = req.body.healthRecordId;
            newHealthRecord.generalInfo = req.body.generalInfo;
            newHealthRecord.clinicalSymptoms = req.body.clinicalSymptoms;
            newHealthRecord.responeToTreatment = req.body.responeToTreatment;
            newHealthRecord.genTest = req.body.genTest;
            newHealthRecord.genTestResponseTreatment = req.body.genTestResponseTreatment;
            newHealthRecord.assessmentResponseTreatment = req.body.assessmentResponseTreatment;
            newHealthRecord.otherInfo = req.body.otherInfo;
            newHealthRecord.patientInfo = req.body.patientInfo;
            newHealthRecord.genTestInfo = req.body.genTestInfo;
            newHealthRecord.typeHealthRecord = req.body?.typeHealthRecord;

            await newHealthRecord.save();

            return res.status(200).json({
                success: true,
                data: '',
                errorCode: '1001',
                message: 'Lưu bệnh án thành công!',
                showType: 2,
            });
        } catch (error) {
            console.error('Error saving health record:', error);
            return res.status(500).json({
                success: false,
                data: {},
                errorCode: '1000',
                message: 'Có lỗi xảy ra khi lưu bệnh án',
            });
        }
    };

    /**
     * Get a health record by ID
     */
    const getById = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(500).json({
                    success: false,
                    data: {},
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            const record = await Model.findById(req.body.id);

            if (!record) {
                return res.status(404).json({
                    success: false,
                    data: {},
                    errorCode: '1004',
                    message: 'Không tìm thấy bệnh án',
                    showType: 2,
                });
            }

            return res.status(200).json({
                success: true,
                data: record,
                errorCode: '1001',
                errorMessage: 'success',
                showType: 2,
            });
        } catch (error) {
            console.error('Error getting health record by ID:', error);
            return res.status(400).json({
                success: false,
                data: {},
                errorCode: '1001',
                message: 'Không tìm thấy bệnh án',
                showType: 2,
            });
        }
    };

    /**
     * Delete a health record by ID
     */
    const deleteById = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(500).json({
                    success: false,
                    data: {},
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            console.log('Deleting record:', req.body.id);
            await Model.deleteOne({ _id: req.body.id });

            return res.status(200).json({
                success: true,
                message: 'Xóa bệnh án thành công',
            });
        } catch (error) {
            console.error('Error deleting health record:', error);
            return res.status(404).json({
                success: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại',
                showType: 2,
            });
        }
    };

    /**
     * Get all health records with pagination
     * Query params: page (default 1), limit (default 10)
     */
    const getAll = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(500).json({
                    success: false,
                    data: {},
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            // Pagination parameters
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            // Get total count
            const total = await Model.countDocuments({});

            // Get paginated records
            const records = await Model.find({})
                .select('patientInfo typeHealthRecord healthRecordId')
                .skip(skip)
                .limit(limit)
                .lean();

            const data = records.map((record) => ({
                fullname: record.patientInfo?.fullname,
                dob: record.patientInfo?.dob,
                typeHealthRecord: record.typeHealthRecord,
                id: record._id,
                healthRecordId: record.healthRecordId,
                PatineId: record.patientInfo?.identID,
            }));

            return res.status(200).json({
                success: true,
                data: data,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
                errorCode: '1001',
                errorMessage: 'success',
                showType: 2,
            });
        } catch (error) {
            console.error('Error getting all health records:', error);
            return res.status(500).json({
                success: false,
                data: [],
                errorCode: '1000',
                message: 'Internal Server Error',
            });
        }
    };

    /**
     * Search health records with pagination
     * Body params: healthRecordId (keyword), typeHealthRecord
     * Query params: page (default 1), limit (default 10)
     */
    const search = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const canAccess = await authenticateToken(authHeader);

            if (canAccess !== 1) {
                return res.status(500).json({
                    success: false,
                    data: {},
                    errorCode: '1002',
                    message: 'Không có quyền truy cập',
                });
            }

            // Pagination parameters
            const page = parseInt(req.query.page) || parseInt(req.body.page) || 1;
            const limit = parseInt(req.query.limit) || parseInt(req.body.limit) || 10;
            const skip = (page - 1) * limit;

            // Search parameters
            let { healthRecordId = "", typeHealthRecord = "" } = req.body || {};

            // Build query
            const query = {};

            // Filter by typeHealthRecord if provided and not "ALL"
            if (typeHealthRecord && typeHealthRecord !== "ALL") {
                query.typeHealthRecord = new RegExp(escapeRegex(typeHealthRecord.trim()), "i");
            }

            // Use healthRecordId as keyword to search across multiple fields
            if (healthRecordId && healthRecordId.trim()) {
                const kw = new RegExp(escapeRegex(healthRecordId.trim()), "i");
                query.$or = [
                    { healthRecordId: kw },
                    { "patientInfo.identID": kw },
                    { "patientInfo.fullname": kw },
                ];
            }

            // Get total count for search results
            const total = await Model.countDocuments(query);

            // Get paginated search results
            const records = await Model.find(query)
                .select("patientInfo typeHealthRecord healthRecordId")
                .skip(skip)
                .limit(limit)
                .lean();

            const data = records.map((r) => ({
                fullname: r.patientInfo?.fullname,
                dob: r.patientInfo?.dob,
                typeHealthRecord: r.typeHealthRecord,
                id: r._id,
                healthRecordId: r.healthRecordId,
                PatineId: r.patientInfo?.identID,
            }));

            return res.status(200).json({
                success: true,
                data: data,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
                errorCode: '1001',
                errorMessage: 'success',
                showType: 2,
            });
        } catch (error) {
            console.error('Error searching health records:', error);
            return res.status(500).json({
                success: false,
                data: {},
                errorCode: '1000',
                message: 'Internal Server Error',
            });
        }
    };

    /**
     * Get health record by patient identID
     */
    const getByIdentID = async (req, res) => {
        try {
            const record = await Model.findOne({
                'patientInfo.identID': req.body.identID,
            });

            if (record) {
                return res.status(200).json({
                    success: true,
                    data: record,
                });
            } else {
                return res.status(404).json({
                    success: false,
                    data: {},
                    errorCode: '404',
                    message: 'Không tìm thấy bệnh án',
                });
            }
        } catch (error) {
            console.error('Error getting by identID:', error);
            return res.status(500).json({
                success: false,
                data: {},
                errorCode: '1000',
                message: 'Internal Server Error',
            });
        }
    };

    return {
        save,
        getById,
        deleteById,
        getAll,
        search,
        getByIdentID,
    };
};

module.exports = createHealthRecordController;
