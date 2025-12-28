import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Eye, X, Save, Loader2, Search, FileText, User } from 'lucide-react';
import collectionsService, { Collection } from '../services/collections';
import request from '../utils/request';

interface TestCaseItem {
    Id?: string;
    _id?: string;
    testCaseId?: string;
    patientID?: string | number;
    patientName?: string;
    testName?: string;
    primaryTissue?: string;
    note?: string;
    addedAt?: string;
    createAt?: string;
}

interface GeneDetail {
    RS_ID: string;
    Nucleotide: string;
    Protein: string;
    VariationType: string;
    Position: string;
    Chromosome: string;
    DrugResponse: string;
    VariantRate: number;
    ReadDepth: number;
}

interface GeneData {
    Gene: string;
    details: GeneDetail[];
}

interface VariantRow {
    key: string;
    CHR: string;
    POS: string;
    GENE: string;
    NOMENCLATURE: string;
    QUAL: string;
    TYPE: string;
    ALLELE_FREQUENCY: string;
    DrugResponse: string;
    priority: number;
    rawData: GeneDetail & { Gene: string };
}

const formatDate = (iso?: string) => {
    if (!iso) return '-';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleString('vi-VN');
};

const tissueMap: Record<string, { name: string; bgColor: string; textColor: string }> = {
    lung: { name: 'Phổi', bgColor: 'bg-red-100', textColor: 'text-red-700' },
    breast: { name: 'Vú', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
    hepatocellular_carcinoma: { name: 'Gan', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
    large_intestine: { name: 'Đại tràng', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
    thyroid: { name: 'Tuyến giáp', bgColor: 'bg-green-100', textColor: 'text-green-700' },
};

const translateDrugResponse = (response: string): { text: string; color: string; priority: number } => {
    const translations: Record<string, { text: string; color: string; priority: number }> = {
        'Pathogenic': { text: 'Pathogenic', color: 'bg-red-100 text-red-700 border-red-200', priority: 1 },
        'Pathogenic/Likely pathogenic': { text: 'Pathogenic/Likely pathogenic', color: 'bg-orange-100 text-orange-700 border-orange-200', priority: 2 },
        'Likely pathogenic': { text: 'Likely pathogenic', color: 'bg-orange-100 text-orange-700 border-orange-200', priority: 3 },
        'Conflicting classifications of pathogenicity': { text: 'Conflicting classifications', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', priority: 4 },
        'drug response': { text: 'Drug response', color: 'bg-lime-100 text-lime-700 border-lime-200', priority: 5 },
        'risk factor': { text: 'Risk factor', color: 'bg-amber-100 text-amber-700 border-amber-200', priority: 6 },
        'other': { text: 'Other', color: 'bg-gray-100 text-gray-700 border-gray-200', priority: 7 },
        'not found': { text: 'Not found', color: 'bg-gray-100 text-gray-700 border-gray-200', priority: 8 },
        'Uncertain significance': { text: 'Uncertain significance', color: 'bg-gray-100 text-gray-700 border-gray-200', priority: 8 },
        'VUS': { text: 'VUS', color: 'bg-gray-100 text-gray-700 border-gray-200', priority: 9 },
        'Benign': { text: 'Benign', color: 'bg-green-100 text-green-700 border-green-200', priority: 10 },
        'Benign/Likely benign': { text: 'Benign/Likely benign', color: 'bg-cyan-100 text-cyan-700 border-cyan-200', priority: 11 },
        'Likely benign': { text: 'Likely benign', color: 'bg-cyan-100 text-cyan-700 border-cyan-200', priority: 12 },
    };
    return translations[response] || { text: response || 'Unknown', color: 'bg-gray-100 text-gray-700 border-gray-200', priority: 13 };
};

const getTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
        'synonymous_variant': 'bg-blue-100 text-blue-700 border-blue-200',
        'frameshift_variant': 'bg-red-100 text-red-700 border-red-200',
        'missense_variant': 'bg-orange-100 text-orange-700 border-orange-200',
        'stop_gained': 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200';
};

const CollectionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState<Collection | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Edit modal state
    const [editOpen, setEditOpen] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', description: '', tags: '' });
    const [saving, setSaving] = useState(false);

    // Note modal state
    const [noteOpen, setNoteOpen] = useState(false);
    const [noteValue, setNoteValue] = useState('');
    const [noteCaseId, setNoteCaseId] = useState<string | null>(null);

    // Delete confirmation
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    // Selected test case for detail view
    const [selectedTestCase, setSelectedTestCase] = useState<TestCaseItem | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [geneData, setGeneData] = useState<GeneData[]>([]);
    const [searchText, setSearchText] = useState('');

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const fetchData = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const res = await collectionsService.getOne(id);
            if (res?.success && res.data) {
                setCollection(res.data);
            }
        } catch (e) {
            showMessage('error', 'Không thể tải chi tiết bộ sưu tập');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    // Fetch test case detail when selected
    const fetchTestCaseDetail = async (tc: TestCaseItem) => {
        setSelectedTestCase(tc);
        setDetailLoading(true);
        setGeneData([]);
        setSearchText('');

        try {
            const detailRes = await request.get(`/test-case/detail/${tc.patientID}`);
            const rawData = detailRes.data || [];

            // Group by gene
            const grouped: Record<string, GeneData> = {};
            rawData.forEach((item: any) => {
                const gene = item.Gene;
                if (!grouped[gene]) {
                    grouped[gene] = { Gene: gene, details: [] };
                }
                grouped[gene].details.push({
                    RS_ID: item.RS_ID || '-',
                    Nucleotide: item.Nucleotide,
                    Protein: item.Protein,
                    VariationType: item.VariationType,
                    Position: item.Position,
                    Chromosome: item.Chromosome,
                    DrugResponse: item.DrugResponse,
                    VariantRate: item.VariantRate,
                    ReadDepth: item.ReadDepth,
                });
            });
            setGeneData(Object.values(grouped).sort((a, b) => a.Gene.localeCompare(b.Gene)));
        } catch (error) {
            console.error('Error fetching test case detail:', error);
            showMessage('error', 'Không thể tải chi tiết xét nghiệm');
        } finally {
            setDetailLoading(false);
        }
    };

    const openEditModal = () => {
        if (!collection) return;
        setEditForm({
            name: collection.collectionName || '',
            description: collection.description || '',
            tags: (collection.tags || []).join(', '),
        });
        setEditOpen(true);
    };

    const handleSaveEdit = async () => {
        if (!id || !editForm.name.trim()) return;
        setSaving(true);
        try {
            const res = await collectionsService.update(id, {
                collectionName: editForm.name.trim(),
                description: editForm.description.trim() || undefined,
                tags: editForm.tags.split(',').map(t => t.trim()).filter(Boolean),
            });
            if (res?.success) {
                showMessage('success', 'Đã cập nhật bộ sưu tập');
                setEditOpen(false);
                fetchData();
            } else {
                showMessage('error', res?.message || 'Không thể cập nhật');
            }
        } catch (e) {
            showMessage('error', 'Không thể cập nhật');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteCollection = async () => {
        if (!id) return;
        try {
            await collectionsService.delete(id);
            showMessage('success', 'Đã xóa bộ sưu tập');
            navigate('/tests/collections');
        } catch (e) {
            showMessage('error', 'Không thể xóa');
        }
    };

    const openNoteModal = (caseId: string, currentNote: string) => {
        setNoteCaseId(caseId);
        setNoteValue(currentNote || '');
        setNoteOpen(true);
    };

    const handleSaveNote = async () => {
        if (!id || !noteCaseId) return;
        try {
            await collectionsService.updateNote(id, noteCaseId, noteValue);
            showMessage('success', 'Đã cập nhật ghi chú');
            setNoteOpen(false);
            setNoteCaseId(null);
            fetchData();
        } catch (e) {
            showMessage('error', 'Không thể cập nhật ghi chú');
        }
    };

    const handleRemoveCase = async (caseId: string) => {
        if (!id) return;
        try {
            await collectionsService.removeCase(id, caseId);
            showMessage('success', 'Đã xóa ca xét nghiệm');
            setDeleteConfirmId(null);
            fetchData();
        } catch (e) {
            showMessage('error', 'Không thể xóa');
        }
    };

    const getTissueInfo = (tissue: string) => {
        return tissueMap[tissue] || { name: 'Không xác định', bgColor: 'bg-gray-100', textColor: 'text-gray-700' };
    };

    const getTestCaseId = (tc: TestCaseItem) => tc.Id || tc._id || tc.testCaseId || '';

    const inputClass = "w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent";

    // Build table data for variants
    const tableData: VariantRow[] = useMemo(() => {
        const rows: VariantRow[] = [];
        geneData.forEach(gene => {
            gene.details.forEach(detail => {
                const drugInfo = translateDrugResponse(detail.DrugResponse);
                if (drugInfo.priority >= 10) return; // Skip benign
                rows.push({
                    key: `${gene.Gene}-${detail.Nucleotide}-${detail.Position}`,
                    CHR: detail.Chromosome,
                    POS: detail.Position,
                    GENE: gene.Gene,
                    NOMENCLATURE: detail.Nucleotide,
                    QUAL: detail.ReadDepth ? `${detail.ReadDepth}x` : 'N/A',
                    TYPE: detail.VariationType,
                    ALLELE_FREQUENCY: detail.VariantRate ? `${detail.VariantRate}` : 'N/A',
                    DrugResponse: drugInfo.text,
                    priority: drugInfo.priority,
                    rawData: { ...detail, Gene: gene.Gene },
                });
            });
        });
        return rows.sort((a, b) => a.priority - b.priority);
    }, [geneData]);

    // Filter by search
    const filteredData = useMemo(() => {
        if (!searchText.trim()) return tableData;
        const search = searchText.toLowerCase();
        return tableData.filter(row =>
            row.GENE.toLowerCase().includes(search) ||
            row.NOMENCLATURE.toLowerCase().includes(search) ||
            row.TYPE.toLowerCase().includes(search) ||
            row.DrugResponse.toLowerCase().includes(search)
        );
    }, [tableData, searchText]);

    const pathogenicCount = tableData.filter(v => v.priority <= 3).length;
    const uncertainCount = tableData.filter(v => v.priority >= 4 && v.priority <= 9).length;

    // Build nucleotide list for drug prediction
    const nucleotideList = useMemo(() => {
        return geneData.flatMap(gene => gene.details.map(detail => detail.Nucleotide));
    }, [geneData]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
            </div>
        );
    }

    if (!collection) {
        return (
            <div className="p-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
                    <p className="text-slate-500 mb-4">Không tìm thấy bộ sưu tập</p>
                    <button
                        onClick={() => navigate('/tests/collections')}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }

    const testCases = (collection as any).testCases || [];

    // ============== DETAIL VIEW (when a test case is selected) ==============
    if (selectedTestCase) {
        const tissueInfo = getTissueInfo(selectedTestCase.primaryTissue || '');

        return (
            <div className="p-4 md:p-6 min-h-screen bg-slate-50">
                <div className="animate-fade-in space-y-6">
                    {/* Message */}
                    {message && (
                        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Header with back button */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <button
                            onClick={() => setSelectedTestCase(null)}
                            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Quay lại bộ sưu tập: {collection.collectionName}
                        </button>
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-teal-900 uppercase">KẾT QUẢ GIẢI TRÌNH TỰ GEN</h1>
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-slate-700">{pathogenicCount} biến thể gây bệnh</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span className="text-slate-700">{uncertainCount} biến thể chưa rõ</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Patient Info */}
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-sm p-4 text-white">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                <h2 className="text-lg font-semibold">Thông tin bệnh nhân</h2>
                            </div>
                            <button
                                onClick={() => {
                                    const cancerMap: Record<string, string> = {
                                        'hepatocellular_carcinoma': 'liver',
                                        'large_intestine': 'colorectal',
                                        'lung': 'lung',
                                        'breast': 'breast',
                                        'thyroid': 'thyroid'
                                    };
                                    const cancerType = cancerMap[selectedTestCase.primaryTissue || 'lung'] || 'lung';
                                    navigate(
                                        `/tests/prediction-drug/${selectedTestCase.patientID}?typeCancer=${cancerType}`,
                                        { state: { variants: nucleotideList } }
                                    );
                                }}
                                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                            >
                                Xem thuốc điều trị
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                                <p className="text-teal-100 text-xs">Mã xét nghiệm</p>
                                <p className="font-semibold">{selectedTestCase.patientID}</p>
                            </div>
                            <div>
                                <p className="text-teal-100 text-xs">Tên bệnh nhân</p>
                                <p className="font-semibold">{selectedTestCase.patientName || '-'}</p>
                            </div>
                            <div>
                                <p className="text-teal-100 text-xs">Mẫu mô</p>
                                <p className="font-semibold">{selectedTestCase.testName || '-'}</p>
                            </div>
                            <div>
                                <p className="text-teal-100 text-xs">Loại bệnh phẩm</p>
                                <p className="font-semibold">{tissueInfo.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Variants Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="font-semibold text-teal-900">Danh sách biến thể</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm gen, biến thể..."
                                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-80"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                {searchText && (
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                                        {filteredData.length}/{tableData.length}
                                    </span>
                                )}
                            </div>
                        </div>

                        {detailLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-teal-50 border-b border-slate-200">
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">Gene</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">Classification</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">CHR</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">Position</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">Nomenclature</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">Depth</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">Type</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-teal-900">Rate</th>
                                            <th className="text-center py-3 px-4 text-sm font-semibold text-teal-900">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.length === 0 ? (
                                            <tr>
                                                <td colSpan={9} className="text-center py-12">
                                                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                                                    <p className="text-slate-500">Không có biến thể nào</p>
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredData.map(row => {
                                                const drugInfo = translateDrugResponse(row.rawData.DrugResponse);
                                                return (
                                                    <tr key={row.key} className="border-b border-slate-100 hover:bg-teal-50/30 transition-colors">
                                                        <td className="py-3 px-4">
                                                            <span className="font-semibold text-teal-600">{row.GENE}</span>
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${drugInfo.color}`}>
                                                                {row.DrugResponse}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-sm text-slate-700">{row.CHR}</td>
                                                        <td className="py-3 px-4 text-sm text-slate-700">{row.POS}</td>
                                                        <td className="py-3 px-4">
                                                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{row.NOMENCLATURE}</code>
                                                        </td>
                                                        <td className="py-3 px-4 text-sm text-slate-700">{row.QUAL}</td>
                                                        <td className="py-3 px-4">
                                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(row.TYPE)}`}>
                                                                {row.TYPE}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-sm text-slate-700">{row.ALLELE_FREQUENCY}</td>
                                                        <td className="py-3 px-4">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Link
                                                                    to={`/tests/variant-detail/${selectedTestCase.patientID}/${row.rawData.RS_ID || row.key}`}
                                                                    className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm font-medium"
                                                                >
                                                                    Xem
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // ============== COLLECTION LIST VIEW ==============
    return (
        <div className="p-4 md:p-6 min-h-screen bg-slate-50">
            <div>
                {/* Message */}
                {message && (
                    <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/tests/collections')}
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-2xl font-bold text-teal-900">{collection.collectionName}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={openEditModal}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50"
                        >
                            <Edit2 className="w-4 h-4" />
                            Chỉnh sửa
                        </button>
                        <button
                            onClick={handleDeleteCollection}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            <Trash2 className="w-4 h-4" />
                            Xóa
                        </button>
                    </div>
                </div>

                {/* Collection Info Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-slate-500">Mô tả</label>
                            <p className="text-slate-700">{collection.description || '-'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-500">Số ca xét nghiệm</label>
                            <p className="text-slate-700">{collection.testCasesCount ?? testCases.length ?? 0}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-500">Tags</label>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {(collection.tags || []).length > 0 ? (
                                    collection.tags!.map((tag, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-teal-50 text-teal-700 text-sm rounded-full">
                                            {tag}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-slate-400">-</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-500">Cập nhật lần cuối</label>
                            <p className="text-slate-700">{formatDate(collection.updateAt || collection.createAt)}</p>
                        </div>
                    </div>
                </div>

                {/* Test Cases Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-teal-900">Danh sách ca xét nghiệm</h2>
                    </div>

                    {testCases.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            Chưa có ca xét nghiệm nào trong bộ sưu tập này
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Mã hồ sơ</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Tên bệnh nhân</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Mẫu bệnh phẩm</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Mẫu mô</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Ghi chú</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Thời điểm thêm</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {testCases.map((tc: TestCaseItem) => {
                                        const caseId = getTestCaseId(tc);
                                        const tissueInfo = getTissueInfo(tc.primaryTissue || '');
                                        return (
                                            <tr key={caseId} className="hover:bg-slate-50">
                                                <td className="px-4 py-3">
                                                    <button
                                                        onClick={() => fetchTestCaseDetail(tc)}
                                                        className="text-teal-600 hover:text-teal-800 font-medium"
                                                    >
                                                        {tc.patientID || '-'}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3 text-slate-700">{tc.patientName || '-'}</td>
                                                <td className="px-4 py-3 text-slate-700">{tc.testName || '-'}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${tissueInfo.bgColor} ${tissueInfo.textColor}`}>
                                                        {tissueInfo.name}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-slate-700 text-sm">{tc.note || '-'}</span>
                                                        <button
                                                            onClick={() => openNoteModal(caseId, tc.note || '')}
                                                            className="text-teal-600 hover:text-teal-800 text-sm"
                                                        >
                                                            Sửa
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-slate-600 text-sm">{formatDate(tc.addedAt)}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => fetchTestCaseDetail(tc)}
                                                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md"
                                                            title="Xem chi tiết"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        {deleteConfirmId === caseId ? (
                                                            <div className="flex items-center gap-1">
                                                                <button
                                                                    onClick={() => handleRemoveCase(caseId)}
                                                                    className="px-2 py-1 bg-red-500 text-white text-xs rounded"
                                                                >
                                                                    Xác nhận
                                                                </button>
                                                                <button
                                                                    onClick={() => setDeleteConfirmId(null)}
                                                                    className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded"
                                                                >
                                                                    Hủy
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => setDeleteConfirmId(caseId)}
                                                                className="p-1.5 text-red-600 hover:bg-red-100 rounded-md"
                                                                title="Xóa khỏi bộ sưu tập"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Edit Collection Modal */}
                {editOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                                <h3 className="text-lg font-semibold text-teal-900">Chỉnh sửa bộ sưu tập</h3>
                                <button onClick={() => setEditOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tên bộ sưu tập *</label>
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className={inputClass}
                                        maxLength={100}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                                    <textarea
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                        className={inputClass}
                                        rows={3}
                                        maxLength={300}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tags (phân tách bởi dấu phẩy)</label>
                                    <input
                                        type="text"
                                        value={editForm.tags}
                                        onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                                        className={inputClass}
                                        placeholder="vd: phổi, ưu tiên cao"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200">
                                <button
                                    onClick={() => setEditOpen(false)}
                                    className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSaveEdit}
                                    disabled={saving || !editForm.name.trim()}
                                    className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Note Modal */}
                {noteOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                                <h3 className="text-lg font-semibold text-teal-900">Cập nhật ghi chú</h3>
                                <button onClick={() => { setNoteOpen(false); setNoteCaseId(null); }} className="text-slate-400 hover:text-slate-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6">
                                <textarea
                                    value={noteValue}
                                    onChange={(e) => setNoteValue(e.target.value)}
                                    className={inputClass}
                                    rows={4}
                                    placeholder="Nhập ghi chú..."
                                />
                            </div>
                            <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200">
                                <button
                                    onClick={() => { setNoteOpen(false); setNoteCaseId(null); }}
                                    className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSaveNote}
                                    className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                                >
                                    <Save className="w-4 h-4" />
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectionDetail;
