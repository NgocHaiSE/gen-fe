import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, FileText, ArrowLeft, X, User, Pill, ExternalLink } from 'lucide-react';
import request from '../utils/request';

// ==================== TYPES ====================
interface TestCase {
    _id: string;
    patientID: string;
    patientName: string;
    primaryTissue: string;
    testName: string;
    status?: string;
    createdAt?: string;
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

interface DrugInfo {
    _id: string;
    gene: string;
    position: string;
    aa_mutation: string;
    mutation: string;
    cds: string;
    disease: string;
    drug: string;
    priority: number;
    responsive: string;
    documents: string;
    nomenclature: string;
    description: string;
}

// ==================== CONSTANTS ====================
const tissueLabels: Record<string, { name: string; color: string }> = {
    lung: { name: 'Phổi', color: 'bg-red-100 text-red-700 border-red-200' },
    breast: { name: 'Vú', color: 'bg-pink-100 text-pink-700 border-pink-200' },
    hepatocellular_carcinoma: { name: 'Gan', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    large_intestine: { name: 'Đại tràng', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    thyroid: { name: 'Tuyến giáp', color: 'bg-green-100 text-green-700 border-green-200' },
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

// ==================== DRUG MODAL COMPONENT ====================
interface DrugModalProps {
    visible: boolean;
    onClose: () => void;
    gene: string;
    variant: string;
    cancerType: string;
}

const DrugModal = ({ visible, onClose, gene, variant, cancerType }: DrugModalProps) => {
    const [drugs, setDrugs] = useState<DrugInfo[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible && (gene || variant)) {
            fetchDrugs();
        }
    }, [visible, gene, variant]);

    const fetchDrugs = async () => {
        setLoading(true);
        try {
            const response = await request.post(`/drugs-information/search-drug-by-variant?typeCancer=${cancerType}`, {
                gene, variant
            });
            setDrugs(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching drugs:', error);
            setDrugs([]);
        } finally {
            setLoading(false);
        }
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                <div className="p-4 border-b border-slate-light flex items-center justify-between bg-teal-50">
                    <div className="flex items-center gap-3">
                        <Pill className="w-5 h-5 text-teal-600" />
                        <h2 className="text-lg font-bold text-teal-900">Thuốc điều trị cho {gene} - {variant}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-teal-100 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[70vh]">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-2"></div>
                            <p className="text-slate-medium">Đang tìm kiếm thuốc...</p>
                        </div>
                    ) : drugs.length === 0 ? (
                        <div className="text-center py-12">
                            <Pill className="w-12 h-12 text-slate-light mx-auto mb-3" />
                            <p className="text-slate-medium">Không tìm thấy thuốc điều trị phù hợp</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                                <p className="text-teal-800 font-medium">Tìm thấy {drugs.length} thuốc phù hợp</p>
                            </div>
                            {drugs.map((drug, idx) => (
                                <div key={drug._id || idx} className="border border-slate-light rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">{drug.gene}</span>
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Priority: {drug.priority}</span>
                                        </div>
                                        {drug.documents && (
                                            <a href={drug.documents} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm">
                                                <ExternalLink className="w-4 h-4" />
                                                Tài liệu
                                            </a>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-green-50 border border-green-200 rounded p-3">
                                            <p className="text-sm font-medium text-green-800 mb-1">Thuốc điều trị</p>
                                            <p className="text-lg font-bold text-green-900">{drug.drug || 'Chưa có'}</p>
                                            <p className="text-sm text-green-700 mt-1">Bệnh: {drug.disease || 'N/A'}</p>
                                            <p className="text-sm text-green-600">Phản ứng: {drug.responsive || 'N/A'}</p>
                                        </div>
                                        <div className="bg-purple-50 border border-purple-200 rounded p-3">
                                            <p className="text-sm font-medium text-purple-800 mb-1">Thông tin di truyền</p>
                                            <div className="space-y-1 text-sm">
                                                <p><span className="text-purple-600">Vị trí:</span> <code className="bg-purple-100 px-1 rounded">{drug.position || 'N/A'}</code></p>
                                                <p><span className="text-purple-600">AA Mutation:</span> <code className="bg-purple-100 px-1 rounded">{drug.aa_mutation || 'N/A'}</code></p>
                                                <p><span className="text-purple-600">CDS:</span> <code className="bg-purple-100 px-1 rounded">{drug.cds || 'N/A'}</code></p>
                                            </div>
                                        </div>
                                    </div>
                                    {drug.description && (
                                        <div className="mt-3 bg-gray-50 border border-gray-200 rounded p-3">
                                            <p className="text-sm text-gray-700">{drug.description}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="p-4 border-t border-slate-light bg-gray-50">
                    <button onClick={onClose} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

// ==================== MAIN TEST DETAIL COMPONENT ====================
const TestDetail = () => {
    const navigate = useNavigate();
    const { patientId } = useParams();

    const [geneData, setGeneData] = useState<GeneData[]>([]);
    const [patientData, setPatientData] = useState<TestCase | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [drugModal, setDrugModal] = useState<{ visible: boolean; gene: string; variant: string }>({ visible: false, gene: '', variant: '' });

    useEffect(() => {
        if (patientId) {
            fetchData();
        }
    }, [patientId]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch gene details
            const detailRes = await request.get(`/test-case/detail/${patientId}`);
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

            // Fetch patient info
            const patientRes = await request.get(`/test-case/find/${patientId}`);
            const patientInfo = Array.isArray(patientRes.data) ? patientRes.data[0] : patientRes.data;
            setPatientData(patientInfo);
        } catch (error) {
            console.error('Error fetching test detail:', error);
        } finally {
            setLoading(false);
        }
    };

    // Build table data - filter out benign variants
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

    const getCancerType = () => {
        const mapping: Record<string, string> = {
            'hepatocellular_carcinoma': 'liver',
            'large_intestine': 'colorectal',
            'lung': 'lung',
            'breast': 'breast',
            'thyroid': 'thyroid'
        };
        return mapping[patientData?.primaryTissue || 'lung'] || 'lung';
    };

    const handleBack = () => {
        navigate('/tests/add-test');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                    <p className="text-slate-medium">Đang tải kết quả xét nghiệm...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                <button onClick={handleBack} className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại danh sách
                </button>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-teal-900 uppercase">KẾT QUẢ GIẢI TRÌNH TỰ GEN</h1>
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-slate-dark">{pathogenicCount} biến thể gây bệnh</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-slate-dark">{uncertainCount} biến thể chưa rõ</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Patient Info */}
            {patientData && (
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-sm p-4 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            <h2 className="text-lg font-semibold">Thông tin bệnh nhân</h2>
                        </div>
                        <button
                            onClick={() => navigate(
                                `/tests/prediction-drug/${patientId}?typeCancer=${getCancerType()}`,
                                { state: { variants: nucleotideList } }
                            )}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                        >
                            Xem thuốc điều trị
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <p className="text-teal-100 text-xs">Mã xét nghiệm</p>
                            <p className="font-semibold">{patientData.patientID}</p>
                        </div>
                        <div>
                            <p className="text-teal-100 text-xs">Tên bệnh nhân</p>
                            <p className="font-semibold">{patientData.patientName}</p>
                        </div>
                        <div>
                            <p className="text-teal-100 text-xs">Mẫu mô</p>
                            <p className="font-semibold">{patientData.testName}</p>
                        </div>
                        <div>
                            <p className="text-teal-100 text-xs">Loại bệnh phẩm</p>
                            <p className="font-semibold">{tissueLabels[patientData.primaryTissue]?.name || patientData.primaryTissue}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Search and Table */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light overflow-hidden">
                <div className="p-4 border-b border-slate-light flex items-center justify-between">
                    <h3 className="font-semibold text-teal-900">Danh sách biến thể</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-medium" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm gen, biến thể..."
                            className="pl-10 pr-4 py-2 border border-slate-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-80"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        {searchText && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-medium">
                                {filteredData.length}/{tableData.length}
                            </span>
                        )}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-teal-50 border-b border-slate-light">
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
                                        <FileText className="w-12 h-12 text-slate-light mx-auto mb-2" />
                                        <p className="text-slate-medium">Không có biến thể nào</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map(row => {
                                    const drugInfo = translateDrugResponse(row.rawData.DrugResponse);
                                    return (
                                        <tr key={row.key} className="border-b border-slate-light hover:bg-teal-50/30 transition-colors">
                                            <td className="py-3 px-4">
                                                <span className="font-semibold text-teal-600">{row.GENE}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${drugInfo.color}`}>
                                                    {row.DrugResponse}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-dark">{row.CHR}</td>
                                            <td className="py-3 px-4 text-sm text-slate-dark">{row.POS}</td>
                                            <td className="py-3 px-4">
                                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">{row.NOMENCLATURE}</code>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-dark">{row.QUAL}</td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(row.TYPE)}`}>
                                                    {row.TYPE}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-dark">{row.ALLELE_FREQUENCY}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            navigate(`/tests/variant-detail/${patientId}/${row.rawData.RS_ID || row.key}`);
                                                        }}
                                                        className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm font-medium"
                                                    >
                                                        Xem
                                                    </button>
                                                    <button
                                                        onClick={() => setDrugModal({ visible: true, gene: row.GENE, variant: row.NOMENCLATURE })}
                                                        className="px-3 py-1 text-teal-600 hover:bg-teal-50 rounded text-sm font-medium flex items-center gap-1"
                                                    >
                                                        <Search className="w-3 h-3" />
                                                        Thuốc
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Drug Modal */}
            <DrugModal
                visible={drugModal.visible}
                onClose={() => setDrugModal({ visible: false, gene: '', variant: '' })}
                gene={drugModal.gene}
                variant={drugModal.variant}
                cancerType={getCancerType()}
            />
        </div>
    );
};

export default TestDetail;
