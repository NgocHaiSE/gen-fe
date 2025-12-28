import { useState, useEffect, useMemo } from 'react';
import { X, Plus, FolderPlus, Tag, FileText, Loader2 } from 'lucide-react';
import collectionsService, { Collection } from '../services/collections';

export interface AddToCollectionModalProps {
    open: boolean;
    onClose: () => void;
    testCaseIds: string[];
}

const AddToCollectionModal = ({ open, onClose, testCaseIds }: AddToCollectionModalProps) => {
    const [loading, setLoading] = useState(false);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [createMode, setCreateMode] = useState(false);
    const [selectedCollectionId, setSelectedCollectionId] = useState('');
    const [formData, setFormData] = useState({
        collectionName: '',
        description: '',
        tags: ''
    });
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const canSubmit = useMemo(() => testCaseIds && testCaseIds.length > 0, [testCaseIds]);

    const loadCollections = async () => {
        try {
            const res = await collectionsService.myCollections();
            console.log('Collections API response:', res);
            console.log('Collections data:', res.data);
            if (res.success) {
                setCollections(res.data || []);
            }
        } catch (e) {
            console.error('Error loading collections:', e);
        }
    };

    useEffect(() => {
        if (open) {
            loadCollections();
            setMessage(null);
            setCreateMode(false);
            setSelectedCollectionId('');
            setFormData({ collectionName: '', description: '', tags: '' });
        }
    }, [open]);

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleCreateCollection = async () => {
        if (!formData.collectionName.trim()) {
            showMessage('error', 'Vui lòng nhập tên bộ sưu tập');
            return;
        }
        setLoading(true);
        try {
            const res = await collectionsService.create({
                collectionName: formData.collectionName,
                description: formData.description,
                tags: formData.tags?.split(',').map(t => t.trim()).filter(Boolean),
            });
            if (res?.success) {
                showMessage('success', res?.message || 'Tạo bộ sưu tập thành công');
                setCreateMode(false);
                setFormData({ collectionName: '', description: '', tags: '' });
                await loadCollections();
            } else {
                showMessage('error', res?.message || 'Không thể tạo bộ sưu tập');
            }
        } catch (error) {
            showMessage('error', 'Đã xảy ra lỗi khi tạo bộ sưu tập');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCollection = async () => {
        if (!selectedCollectionId) {
            showMessage('error', 'Vui lòng chọn một bộ sưu tập');
            return;
        }
        if (!canSubmit) {
            showMessage('error', 'Hãy chọn ít nhất 1 ca xét nghiệm');
            return;
        }
        setLoading(true);
        try {
            const res = await collectionsService.batchAdd(selectedCollectionId, testCaseIds);
            if (res?.success) {
                showMessage('success', res?.message || 'Đã thêm vào bộ sưu tập');
                setTimeout(() => onClose(), 1500);
            } else {
                showMessage('error', res?.message || 'Không thể thêm vào bộ sưu tập');
            }
        } catch (error) {
            showMessage('error', 'Đã xảy ra lỗi');
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    const inputClass = "w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm";

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-teal-900 flex items-center gap-2">
                        <FolderPlus className="w-5 h-5 text-teal-500" />
                        Thêm vào bộ sưu tập
                    </h2>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                    {/* Selected count */}
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-teal-50 px-3 py-2 rounded-lg">
                        <FileText className="w-4 h-4 text-teal-600" />
                        <span>Đã chọn: <strong className="text-teal-700">{testCaseIds?.length || 0}</strong> ca xét nghiệm</span>
                    </div>

                    {/* Message */}
                    {message && (
                        <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Select existing collection */}
                    {!createMode && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Chọn bộ sưu tập</label>
                                <select
                                    value={selectedCollectionId}
                                    onChange={(e) => setSelectedCollectionId(e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">-- Chọn bộ sưu tập --</option>
                                    {collections.map((c: any) => {
                                        // Try _id first, then id, then any other common ID patterns
                                        const collectionId = c._id || c.id || c.Id || c.ID || '';
                                        console.log('Collection item:', c, 'ID:', collectionId);
                                        if (!collectionId) {
                                            console.warn('Collection missing ID:', c);
                                            return null;
                                        }
                                        return (
                                            <option key={collectionId} value={collectionId}>
                                                {c.collectionName} {c.testCasesCount !== undefined && `(${c.testCasesCount} ca)`}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddToCollection}
                                    disabled={loading || !selectedCollectionId || !canSubmit}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                    Thêm vào bộ sưu tập
                                </button>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-slate-500">hoặc</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setCreateMode(true)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium"
                            >
                                <FolderPlus className="w-4 h-4" />
                                Tạo bộ sưu tập mới
                            </button>
                        </div>
                    )}

                    {/* Create new collection form */}
                    {createMode && (
                        <div className="space-y-4">
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
                                    rows={2}
                                    placeholder="Mô tả ngắn để dễ nhớ"
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
                                    placeholder="phổi, ưu tiên cao"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setCreateMode(false)}
                                    className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                                >
                                    Quay lại
                                </button>
                                <button
                                    onClick={handleCreateCollection}
                                    disabled={loading}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 transition-colors font-medium"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                    Tạo bộ sưu tập
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddToCollectionModal;
