import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, Search, Plus, ChevronRight, TestTube, Microscope, FileText, Trash2, Edit2, X, Loader2, Tag } from 'lucide-react';
import collectionsService, { Collection } from '../services/collections';

const Collections = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
    const [formData, setFormData] = useState({ collectionName: '', description: '', tags: '' });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const categories = ['all', 'Phổi', 'Vú', 'Gan', 'Đại trực tràng', 'Tuyến giáp'];

    // Fetch collections from API
    const fetchCollections = async () => {
        setLoading(true);
        try {
            const res = await collectionsService.myCollections();
            if (res.success) {
                setCollections(res.data || []);
            }
        } catch (error) {
            console.error('Error fetching collections:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    const filteredCollections = collections.filter(c => {
        const matchSearch = c.collectionName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description?.toLowerCase().includes(searchQuery.toLowerCase());
        // For now, no category filtering on real data since we don't have category field
        // const matchCategory = selectedCategory === 'all' || c.category === selectedCategory;
        return matchSearch;
    });

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Phổi': 'bg-blue-500',
            'Vú': 'bg-pink-500',
            'Gan': 'bg-purple-500',
            'Đại trực tràng': 'bg-green-500',
            'Tuyến giáp': 'bg-yellow-500',
        };
        return colors[category] || 'bg-teal-500';
    };

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleCreateOrEdit = async () => {
        if (!formData.collectionName.trim()) {
            showMessage('error', 'Vui lòng nhập tên bộ sưu tập');
            return;
        }
        setSubmitting(true);
        try {
            const payload = {
                collectionName: formData.collectionName,
                description: formData.description,
                tags: formData.tags?.split(',').map(t => t.trim()).filter(Boolean),
            };

            let res;
            if (editingCollection) {
                res = await collectionsService.update((editingCollection as any).Id || editingCollection._id, payload);
            } else {
                res = await collectionsService.create(payload);
            }

            if (res?.success) {
                showMessage('success', res?.message || (editingCollection ? 'Cập nhật thành công' : 'Tạo bộ sưu tập thành công'));
                setShowCreateModal(false);
                setEditingCollection(null);
                setFormData({ collectionName: '', description: '', tags: '' });
                fetchCollections();
            } else {
                showMessage('error', res?.message || 'Đã xảy ra lỗi');
            }
        } catch (error) {
            showMessage('error', 'Đã xảy ra lỗi');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (collection: Collection) => {
        if (!window.confirm(`Bạn có chắc muốn xóa bộ sưu tập "${collection.collectionName}"?`)) {
            return;
        }
        try {
            const res = await collectionsService.delete((collection as any).Id || collection._id);
            if (res?.success) {
                showMessage('success', 'Đã xóa bộ sưu tập');
                fetchCollections();
            } else {
                showMessage('error', res?.message || 'Không thể xóa bộ sưu tập');
            }
        } catch (error) {
            showMessage('error', 'Đã xảy ra lỗi');
        }
    };

    const openEditModal = (collection: Collection) => {
        setEditingCollection(collection);
        setFormData({
            collectionName: collection.collectionName || '',
            description: collection.description || '',
            tags: collection.tags?.join(', ') || ''
        });
        setShowCreateModal(true);
    };

    const closeModal = () => {
        setShowCreateModal(false);
        setEditingCollection(null);
        setFormData({ collectionName: '', description: '', tags: '' });
    };

    const inputClass = "w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm";

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-3 uppercase">
                            <FlaskConical className="w-7 h-7 text-teal-500" />
                            DANH MỤC XÉT NGHIỆM
                        </h1>
                        <p className="text-slate-medium">Các bộ xét nghiệm gen phục vụ chẩn đoán và điều trị ung thư</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Tạo bộ sưu tập mới
                    </button>
                </div>
            </div>

            {/* Message */}
            {message && (
                <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            {/* Filter Bar */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-medium w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm xét nghiệm..."
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat
                                    ? 'bg-teal-500 text-white'
                                    : 'bg-slate-100 text-slate-dark hover:bg-slate-200'
                                    }`}
                            >
                                {cat === 'all' ? 'Tất cả' : cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Collections Grid */}
            {loading ? (
                <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
                    <p className="text-slate-medium">Đang tải...</p>
                </div>
            ) : filteredCollections.length === 0 ? (
                <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-12 text-center">
                    <Microscope className="w-16 h-16 text-slate-light mx-auto mb-4" />
                    <p className="text-slate-medium mb-4">
                        {searchQuery ? 'Không tìm thấy xét nghiệm phù hợp' : 'Chưa có bộ sưu tập nào'}
                    </p>
                    {!searchQuery && (
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                        >
                            Tạo bộ sưu tập đầu tiên
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCollections.map((collection) => {
                        const collectionId = (collection as any).Id || collection._id;
                        return (
                            <div
                                key={collectionId}
                                onClick={() => navigate(`/tests/collections/${collectionId}`)}
                                className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-5 hover:shadow-lg transition-all group cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`w-12 h-12 ${getCategoryColor(collection.tags?.[0] || '')} rounded-xl flex items-center justify-center`}>
                                        <TestTube className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs font-medium text-slate-medium bg-slate-100 px-2 py-1 rounded">
                                            {collection.testCasesCount ?? 0} ca
                                        </span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); openEditModal(collection); }}
                                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                                            title="Chỉnh sửa"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(collection); }}
                                            className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                                            title="Xóa"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="font-bold text-teal-900 mb-1 group-hover:text-teal-600 transition-colors">
                                    {collection.collectionName}
                                </h3>
                                <p className="text-sm text-slate-medium mb-3 line-clamp-2">
                                    {collection.description || 'Không có mô tả'}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-1">
                                        {collection.tags?.slice(0, 3).map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs font-medium px-2 py-1 rounded-full bg-teal-50 text-teal-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-medium group-hover:text-teal-500 transition-colors" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Info Card */}
            <div className="bg-teal-50 rounded-xl border border-teal-100 p-4 flex items-start gap-3">
                <FileText className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm text-teal-900 font-medium mb-1">Hướng dẫn sử dụng</p>
                    <p className="text-sm text-teal-700">
                        Chọn bộ xét nghiệm phù hợp với loại ung thư của bệnh nhân. Mỗi panel bao gồm các gen đột biến quan trọng
                        giúp định hướng điều trị và tiên lượng bệnh.
                    </p>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-teal-900">
                                {editingCollection ? 'Chỉnh sửa bộ sưu tập' : 'Tạo bộ sưu tập mới'}
                            </h2>
                            <button onClick={closeModal} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Tên bộ sưu tập <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.collectionName}
                                    onChange={(e) => setFormData({ ...formData, collectionName: e.target.value })}
                                    className={inputClass}
                                    placeholder="Ví dụ: Ca phổi quan trọng"
                                    maxLength={100}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Mô tả</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className={inputClass}
                                    rows={3}
                                    placeholder="Mô tả ngắn về bộ sưu tập"
                                    maxLength={300}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                                    <Tag className="w-4 h-4" />
                                    Tags (phân tách bởi dấu phẩy)
                                </label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className={inputClass}
                                    placeholder="phổi, ưu tiên cao, EGFR"
                                />
                            </div>
                        </div>
                        <div className="p-5 border-t border-slate-100 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleCreateOrEdit}
                                disabled={submitting}
                                className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 transition-colors"
                            >
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                {editingCollection ? 'Cập nhật' : 'Tạo mới'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Collections;
