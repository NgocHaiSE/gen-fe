import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Copy, Check } from 'lucide-react';
import request from '../utils/request';

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
    Gene: string;
}

interface PatientInfo {
    patientID: string;
    patientName: string;
    testName: string;
    primaryTissue: string;
    createAt?: string;
}

interface DrugResponseInfo {
    text: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
}

const translateDrugResponse = (response: string): DrugResponseInfo => {
    switch (response) {
        case "Pathogenic":
            return { text: "Gây bệnh", bgColor: 'bg-red-100', textColor: 'text-red-700', borderColor: 'border-red-300' };
        case "Pathogenic/Likely pathogenic":
            return { text: "Gây bệnh/Có khả năng gây bệnh", bgColor: 'bg-orange-100', textColor: 'text-orange-700', borderColor: 'border-orange-300' };
        case "Likely pathogenic":
            return { text: "Có khả năng gây bệnh", bgColor: 'bg-orange-100', textColor: 'text-orange-700', borderColor: 'border-orange-300' };
        case "Conflicting classifications of pathogenicity":
            return { text: "Conflicting classifications", bgColor: 'bg-yellow-100', textColor: 'text-yellow-700', borderColor: 'border-yellow-300' };
        case "drug response":
            return { text: "Drug response", bgColor: 'bg-lime-100', textColor: 'text-lime-700', borderColor: 'border-lime-300' };
        case "risk factor":
            return { text: "Risk factor", bgColor: 'bg-amber-100', textColor: 'text-amber-700', borderColor: 'border-amber-300' };
        case "other":
            return { text: "Khác", bgColor: 'bg-gray-100', textColor: 'text-gray-700', borderColor: 'border-gray-300' };
        case "not found":
            return { text: "Không rõ", bgColor: 'bg-gray-100', textColor: 'text-gray-700', borderColor: 'border-gray-300' };
        case "Uncertain significance":
            return { text: "Không rõ ý nghĩa", bgColor: 'bg-blue-100', textColor: 'text-blue-700', borderColor: 'border-blue-300' };
        case "Likely benign":
            return { text: "Có khả năng lành tính", bgColor: 'bg-cyan-100', textColor: 'text-cyan-700', borderColor: 'border-cyan-300' };
        case "Benign/Likely benign":
            return { text: "Lành tính/Có khả năng lành tính", bgColor: 'bg-green-100', textColor: 'text-green-700', borderColor: 'border-green-300' };
        case "Benign":
            return { text: "Lành tính", bgColor: 'bg-green-100', textColor: 'text-green-700', borderColor: 'border-green-300' };
        default:
            return { text: response || '-', bgColor: 'bg-gray-100', textColor: 'text-gray-700', borderColor: 'border-gray-300' };
    }
};

const getVariantTypeInfo = (type: string) => {
    const typeMap: Record<string, { text: string; bgColor: string; textColor: string; borderColor: string }> = {
        'single nucleotide variant': { text: 'SNV', bgColor: 'bg-blue-100', textColor: 'text-blue-700', borderColor: 'border-blue-300' },
        'deletion': { text: 'Deletion', bgColor: 'bg-red-100', textColor: 'text-red-700', borderColor: 'border-red-300' },
        'insertion': { text: 'Insertion', bgColor: 'bg-green-100', textColor: 'text-green-700', borderColor: 'border-green-300' },
        'indel': { text: 'Indel', bgColor: 'bg-orange-100', textColor: 'text-orange-700', borderColor: 'border-orange-300' },
        'substitution': { text: 'Substitution', bgColor: 'bg-purple-100', textColor: 'text-purple-700', borderColor: 'border-purple-300' },
        'duplication': { text: 'Duplication', bgColor: 'bg-cyan-100', textColor: 'text-cyan-700', borderColor: 'border-cyan-300' },
    };

    const lowerType = type?.toLowerCase() || '';
    for (const key in typeMap) {
        if (lowerType.includes(key)) {
            return typeMap[key];
        }
    }
    return { text: type || '-', bgColor: 'bg-gray-100', textColor: 'text-gray-700', borderColor: 'border-gray-300' };
};

const tissueMap: Record<string, { name: string; bgColor: string; textColor: string; borderColor: string }> = {
    lung: { name: 'Phổi', bgColor: 'bg-red-100', textColor: 'text-red-700', borderColor: 'border-red-300' },
    breast: { name: 'Vú', bgColor: 'bg-pink-100', textColor: 'text-pink-700', borderColor: 'border-pink-300' },
    hepatocellular_carcinoma: { name: 'Gan', bgColor: 'bg-orange-100', textColor: 'text-orange-700', borderColor: 'border-orange-300' },
    large_intestine: { name: 'Đại tràng', bgColor: 'bg-blue-100', textColor: 'text-blue-700', borderColor: 'border-blue-300' },
    thyroid: { name: 'Tuyến giáp', bgColor: 'bg-green-100', textColor: 'text-green-700', borderColor: 'border-green-300' },
};

const VariantDetail: React.FC = () => {
    const { patientId, rsId } = useParams<{ patientId: string; rsId: string }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [variant, setVariant] = useState<GeneDetail | null>(null);
    const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!patientId || !rsId) return;

            setLoading(true);
            try {
                // Fetch variant data
                const variantRes = await request.get(`/test-case/detail/${patientId}`);
                const rawData: any[] = variantRes.data || [];

                // Find the specific variant by RS_ID
                const foundVariant = rawData.find((item: any) => item.RS_ID === rsId || item.rsId === rsId);

                if (foundVariant) {
                    setVariant({
                        RS_ID: foundVariant.RS_ID || foundVariant.rsId || '-',
                        Nucleotide: foundVariant.Nucleotide || foundVariant.nucleotide || '-',
                        Protein: foundVariant.Protein || foundVariant.protein || '-',
                        VariationType: foundVariant.VariationType || foundVariant.variationType || '-',
                        Position: foundVariant.Position || foundVariant.position || '-',
                        Chromosome: foundVariant.Chromosome || foundVariant.chromosome || '-',
                        DrugResponse: foundVariant.DrugResponse || foundVariant.drugResponse || '-',
                        VariantRate: foundVariant.VariantRate || foundVariant.variantRate || 0,
                        ReadDepth: foundVariant.ReadDepth || foundVariant.readDepth || 0,
                        Gene: foundVariant.Gene || foundVariant.gene || '-',
                    });
                }

                // Fetch patient info
                const patientRes = await request.get(`/test-case/find/${patientId}`);
                const patientData = patientRes.data;
                if (patientData && patientData.length > 0) {
                    const p = patientData[0];
                    setPatientInfo({
                        patientID: p.patientID || patientId,
                        patientName: p.patientName || '-',
                        testName: p.testName || '-',
                        primaryTissue: p.primaryTissue || '-',
                        createAt: p.createAt,
                    });
                }
            } catch (error) {
                console.error('Error fetching variant details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [patientId, rsId]);

    const copyToClipboard = async (text: string, field: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(field);
            setTimeout(() => setCopied(null), 2000);
        } catch (e) {
            console.error('Copy failed:', e);
        }
    };

    const CopyableText: React.FC<{ text: string; field: string; isCode?: boolean }> = ({ text, field, isCode }) => (
        <span className="inline-flex items-center gap-1">
            {isCode ? (
                <code className="bg-slate-100 px-2 py-0.5 rounded text-sm font-mono">{text}</code>
            ) : (
                <span className="font-semibold">{text}</span>
            )}
            <button
                onClick={() => copyToClipboard(text, field)}
                className="p-1 text-slate-400 hover:text-teal-600 transition-colors"
                title="Sao chép"
            >
                {copied === field ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
        </span>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-teal-500" />
            </div>
        );
    }

    if (!variant) {
        return (
            <div className="p-4 md:p-6">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <p className="text-slate-500 mb-4">Không tìm thấy thông tin biến thể</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }

    const drugInfo = translateDrugResponse(variant.DrugResponse);
    const typeInfo = getVariantTypeInfo(variant.VariationType);
    const tissueInfo = patientInfo?.primaryTissue
        ? tissueMap[patientInfo.primaryTissue] || { name: 'Không xác định', bgColor: 'bg-gray-100', textColor: 'text-gray-700', borderColor: 'border-gray-300' }
        : null;

    return (
        <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
            <div>
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 transition-colors shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại
                </button>

                {/* Thông tin bệnh nhân - Card with title */}
                {patientInfo && (
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-4">
                        <div className="px-6 py-4 border-b border-slate-200">
                            <h3 className="text-base font-semibold text-slate-800">Thông tin bệnh nhân</h3>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-sm">
                                <tbody>
                                    <tr className="border-b border-slate-300">
                                        <td className="px-4 py-3 bg-slate-50 font-medium text-slate-600 w-1/4 border-r border-slate-300">Mã hồ sơ</td>
                                        <td className="px-4 py-3">
                                            <CopyableText text={patientInfo.patientID} field="patientID" />
                                        </td>
                                        <td className="px-4 py-3 bg-slate-50 font-medium text-slate-600 w-1/4 border-r border-slate-300">Tên bệnh nhân</td>
                                        <td className="px-4 py-3 font-semibold">{patientInfo.patientName}</td>
                                    </tr>
                                    <tr className="border-b border-slate-300">
                                        {tissueInfo && (
                                            <>
                                                <td className="px-4 py-3 bg-slate-50 font-medium text-slate-600 border-r border-slate-300">Mẫu mô</td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-block px-3 py-1 rounded border text-sm font-medium ${tissueInfo.bgColor} ${tissueInfo.textColor} ${tissueInfo.borderColor}`}>
                                                        {tissueInfo.name}
                                                    </span>
                                                </td>
                                            </>
                                        )}
                                        <td className="px-4 py-3 bg-slate-50 font-medium text-slate-600 border-r border-slate-300">Mẫu bệnh phẩm</td>
                                        <td className="px-4 py-3">{patientInfo.testName}</td>
                                    </tr>
                                    {patientInfo.createAt && (
                                        <tr>
                                            <td className="px-4 py-3 bg-slate-50 font-medium text-slate-600 border-r border-slate-300">Ngày tạo</td>
                                            <td className="px-4 py-3" colSpan={3}>{new Date(patientInfo.createAt).toLocaleString('vi-VN')}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Chi tiết biến thể - Main Card */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-4">
                    {/* Gene Header */}
                    <div className="px-6 py-5 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-teal-600 mb-2">Gen: {variant.Gene}</h2>
                        <span className={`inline-block px-4 py-1.5 rounded border text-sm font-semibold ${drugInfo.bgColor} ${drugInfo.textColor} ${drugInfo.borderColor}`}>
                            {drugInfo.text}
                        </span>
                    </div>

                    {/* Thông tin vị trí */}
                    <div className="border-b border-slate-200">
                        <div className="px-6 py-3 bg-slate-50 border-b border-slate-300">
                            <h4 className="text-sm font-semibold text-slate-700">Thông tin vị trí</h4>
                        </div>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b border-slate-300">
                                    <td className="px-4 py-3 bg-slate-50 font-medium text-slate-600 w-1/6 border-r border-slate-300">Chromosome</td>
                                    <td className="px-4 py-3 font-semibold">{variant.Chromosome}</td>
                                    <td className="px-4 py-3 bg-slate-50 font-medium text-slate-600 w-1/6 border-r border-slate-300">Position</td>
                                    <td className="px-4 py-3">
                                        <CopyableText text={variant.Position} field="position" isCode />
                                    </td>
                                    <td className="px-4 py-3 bg-slate-50 font-medium text-slate-600 w-1/6 border-r border-slate-300">RS ID</td>
                                    <td className="px-4 py-3">
                                        <CopyableText text={variant.RS_ID} field="rsId" isCode />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Thông tin biến đổi */}
                    <div className="border-b border-slate-200">
                        <div className="px-6 py-3 bg-slate-50 border-b border-slate-300">
                            <h4 className="text-sm font-semibold text-slate-700">Thông tin biến đổi</h4>
                        </div>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b border-slate-300">
                                    <td className="px-4 py-3 bg-slate-50 font-medium text-slate-600 w-1/4 border-r border-slate-300 align-top">Nucleotide Change</td>
                                    <td className="px-4 py-3">
                                        <code className="block bg-slate-100 px-3 py-2 rounded text-sm font-mono break-all">
                                            {variant.Nucleotide}
                                        </code>
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-300">
                                    <td className="px-4 py-3 bg-slate-50 font-medium text-slate-600 border-r border-slate-300 align-top">Protein Change</td>
                                    <td className="px-4 py-3">
                                        <code className="block bg-slate-100 px-3 py-2 rounded text-sm font-mono break-all">
                                            {variant.Protein || '-'}
                                        </code>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 bg-slate-50 font-medium text-slate-600 border-r border-slate-300">Variant Type</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-block px-3 py-1 rounded border text-sm font-medium ${typeInfo.bgColor} ${typeInfo.textColor} ${typeInfo.borderColor}`}>
                                            {typeInfo.text}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Thông tin định lượng */}
                    <div>
                        <div className="px-6 py-3 bg-slate-50 border-b border-slate-300">
                            <h4 className="text-sm font-semibold text-slate-700">Thông tin định lượng</h4>
                        </div>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr>
                                    <td className="px-4 py-3 bg-slate-50 font-medium text-slate-600 w-1/4 border-r border-slate-300">Read Depth (Độ sâu đọc)</td>
                                    <td className="px-4 py-3">
                                        <span className="font-bold text-base text-teal-600">{variant.ReadDepth}x</span>
                                    </td>
                                    <td className="px-4 py-3 bg-slate-50 font-medium text-slate-600 w-1/4 border-r border-slate-300">Variant Rate</td>
                                    <td className="px-4 py-3">
                                        <span className="font-bold text-base text-green-600">
                                            {variant.VariantRate != null && !isNaN(Number(variant.VariantRate))
                                                ? Number(variant.VariantRate).toFixed(4)
                                                : '-'}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VariantDetail;
