import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Dna, User, Activity, Microscope, X, Loader2, AlertCircle, ExternalLink } from 'lucide-react'
import axios from 'axios'
import token from '../utils/token'

interface MutationInfo {
    mutationId: string
    tumourId: string
    sampleId: string
    sampleName: string
    sampleType: string
    cosmicPhenotypeId: string
    msi: string
    wholeExomeScreen: string
    wholeGenomeScreen: string
    tumourSource: string
    tumourStage: string
    tumourGrade: string
    drugResponse: string
    metastaticSite: string
    // Mutation fields from spread
    GENE_SYMBOL: string
    GENE_CDS_LENGTH: string
    MUTATION_AA: string
    MUTATION_CDS: string
    MUTATION_DESCRIPTION: string
    GENOMIC_MUTATION_ID: string
    MUTATION_SOMATIC_STATUS: string
    MUTATION_GENOME_POSITION: string
    MUTATION_STRAND: string
    MUTATION_ZYGOSITY: string
    HGVSC: string
    HGVSG: string
    HGVSP: string
    HGNC_ID: string
    GRCH: string
    LEGACY_MUTATION_ID: string
    PUBMED_PMID: string
    TUMOUR_ORIGIN: string
    RESISTANCE_MUTATION: string
    TRANSCRIPT_ACCESSION: string
    AGE: string
    [key: string]: any
}

interface MutationResponse {
    success: boolean
    individualId: string
    organType: string
    individual: {
        class: string
        ethnicity: string
        gender: string
        isAsian: string
    }
    tumours: any
    totalMutations: number
    mutations: MutationInfo[]
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aicancer.io.vn/api'

export default function MutationInfoPage() {
    const { sampleId, organType, individualId } = useParams<{
        sampleId: string
        organType: string
        individualId: string
    }>()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<MutationResponse | null>(null)
    const [selectedMutation, setSelectedMutation] = useState<MutationInfo | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!organType || !individualId) return

            setLoading(true)
            setError(null)

            try {
                const tokenObj = token.getTokenObject()
                const response = await axios.get(
                    `${BASE_URL}/cosmic-sample/mutations/${organType}/${individualId}`,
                    {
                        headers: tokenObj.accessToken ? { Authorization: `Bearer ${tokenObj.accessToken}` } : {}
                    }
                )

                if (response.data?.success) {
                    setData(response.data)
                } else {
                    setError(response.data?.error || 'Không tìm thấy thông tin đột biến')
                }
            } catch (err: any) {
                console.error('Error fetching mutations:', err)
                setError(err.response?.data?.error || 'Lỗi khi tải thông tin đột biến')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [organType, individualId])

    const formatGender = (gender: string) => {
        switch (gender?.toLowerCase()) {
            case 'm': return 'Nam'
            case 'f': return 'Nữ'
            case 'u': return 'Không xác định'
            default: return gender || 'N/A'
        }
    }

    const formatValue = (value: any) => {
        if (value === null || value === undefined || value === '' || value === 'NS') return 'N/A'
        return String(value)
    }

    if (loading) {
        return (
            <div className="w-full animate-fade-in space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                        <span className="ml-3 text-gray-600">Đang tải thông tin đột biến gen...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="w-full animate-fade-in space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                        <AlertCircle className="w-16 h-16 text-red-400" />
                        <p className="text-gray-600">{error || 'Không tìm thấy dữ liệu'}</p>
                        <button
                            onClick={() => navigate(`/cosmic-samples/${sampleId}`)}
                            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                        >
                            Quay lại chi tiết mẫu
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/cosmic-samples/${sampleId}`)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Quay lại"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-teal-900 flex items-center gap-3">
                            <Dna className="w-7 h-7 text-teal-500" />
                            Thông tin đột biến gen
                        </h1>
                        <p className="text-slate-500">
                            Individual ID: {data.individualId} | Loại: {data.organType}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-teal-600">{data.totalMutations}</p>
                        <p className="text-sm text-slate-500">đột biến</p>
                    </div>
                </div>
            </div>

            {/* Individual Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-teal-100 rounded-lg">
                            <User className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Giới tính</p>
                            <p className="font-semibold text-slate-800">{formatGender(data.individual.gender)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-100 rounded-lg">
                            <Activity className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Dân tộc</p>
                            <p className="font-semibold text-slate-800">{formatValue(data.individual.ethnicity)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-purple-100 rounded-lg">
                            <Microscope className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Loại ung thư</p>
                            <p className="font-semibold text-slate-800 capitalize">{data.individual.class || data.organType}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-amber-100 rounded-lg">
                            <Dna className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Asian</p>
                            <p className="font-semibold text-slate-800">{data.individual.isAsian === '1' ? 'Có' : 'Không'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mutations Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                    <h2 className="text-lg font-bold text-teal-900 flex items-center gap-2">
                        <Dna className="w-5 h-5 text-teal-500" />
                        Danh sách đột biến gen ({data.totalMutations})
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Click vào một hàng để xem chi tiết đầy đủ</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700">Gen</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700">Mutation AA</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700">Mutation CDS</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700">Mô tả</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700">Trạng thái</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700">COSMIC ID</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700">Sample</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.mutations.map((mutation, idx) => (
                                <tr
                                    key={idx}
                                    onClick={() => setSelectedMutation(mutation)}
                                    className="hover:bg-teal-50 cursor-pointer transition-colors"
                                >
                                    <td className="px-4 py-3 font-medium text-teal-700">{mutation.GENE_SYMBOL}</td>
                                    <td className="px-4 py-3 font-mono text-xs">{mutation.MUTATION_AA}</td>
                                    <td className="px-4 py-3 font-mono text-xs">{mutation.MUTATION_CDS}</td>
                                    <td className="px-4 py-3">{mutation.MUTATION_DESCRIPTION}</td>
                                    <td className="px-4 py-3 text-xs">{mutation.MUTATION_SOMATIC_STATUS}</td>
                                    <td className="px-4 py-3 text-xs text-slate-500">{mutation.GENOMIC_MUTATION_ID}</td>
                                    <td className="px-4 py-3 text-xs text-slate-500">{mutation.sampleName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mutation Detail Modal */}
            {selectedMutation && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-200">
                            <div>
                                <h2 className="text-xl font-bold text-teal-900">
                                    Chi tiết đột biến: {selectedMutation.GENE_SYMBOL}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Mutation ID: {selectedMutation.mutationId}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedMutation(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-auto p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Gene Info */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-teal-800 border-b pb-2">Thông tin Gen</h3>
                                    <DetailRow label="Gene Symbol" value={selectedMutation.GENE_SYMBOL} />
                                    <DetailRow label="HGNC ID" value={selectedMutation.HGNC_ID} />
                                    <DetailRow label="Gene CDS Length" value={selectedMutation.GENE_CDS_LENGTH} />
                                    <DetailRow label="Transcript Accession" value={selectedMutation.TRANSCRIPT_ACCESSION} />
                                </div>

                                {/* Mutation Info */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-teal-800 border-b pb-2">Thông tin Đột biến</h3>
                                    <DetailRow label="Mutation AA" value={selectedMutation.MUTATION_AA} mono />
                                    <DetailRow label="Mutation CDS" value={selectedMutation.MUTATION_CDS} mono />
                                    <DetailRow label="Description" value={selectedMutation.MUTATION_DESCRIPTION} />
                                    <DetailRow label="Somatic Status" value={selectedMutation.MUTATION_SOMATIC_STATUS} />
                                    <DetailRow label="Zygosity" value={selectedMutation.MUTATION_ZYGOSITY} />
                                </div>

                                {/* Genomic Info */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-teal-800 border-b pb-2">Thông tin Genomic</h3>
                                    <DetailRow label="Genome Position" value={selectedMutation.MUTATION_GENOME_POSITION} mono />
                                    <DetailRow label="Strand" value={selectedMutation.MUTATION_STRAND} />
                                    <DetailRow label="GRCh" value={selectedMutation.GRCH} />
                                    <DetailRow label="HGVSC" value={selectedMutation.HGVSC} mono />
                                    <DetailRow label="HGVSG" value={selectedMutation.HGVSG} mono />
                                    <DetailRow label="HGVSP" value={selectedMutation.HGVSP} mono />
                                </div>

                                {/* IDs & References */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-teal-800 border-b pb-2">IDs & Tham khảo</h3>
                                    <DetailRow label="Genomic Mutation ID" value={selectedMutation.GENOMIC_MUTATION_ID} />
                                    <DetailRow label="Legacy Mutation ID" value={selectedMutation.LEGACY_MUTATION_ID} />
                                    <DetailRow label="Resistance Mutation" value={selectedMutation.RESISTANCE_MUTATION} />
                                    {selectedMutation.PUBMED_PMID && (
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-sm text-slate-600">PubMed PMID</span>
                                            <a
                                                href={`https://pubmed.ncbi.nlm.nih.gov/${selectedMutation.PUBMED_PMID}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-teal-600 hover:text-teal-800 flex items-center gap-1"
                                            >
                                                {selectedMutation.PUBMED_PMID}
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Sample/Tumour Info */}
                                <div className="space-y-4 md:col-span-2">
                                    <h3 className="font-semibold text-teal-800 border-b pb-2">Thông tin Mẫu & Khối u</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <DetailRow label="Sample ID" value={selectedMutation.sampleId} />
                                        <DetailRow label="Sample Type" value={selectedMutation.sampleType} />
                                        <DetailRow label="Tumour ID" value={selectedMutation.tumourId} />
                                        <DetailRow label="Tumour Origin" value={selectedMutation.TUMOUR_ORIGIN} />
                                        <DetailRow label="Tumour Source" value={selectedMutation.tumourSource} />
                                        <DetailRow label="Stage" value={selectedMutation.tumourStage} />
                                        <DetailRow label="Grade" value={selectedMutation.tumourGrade} />
                                        <DetailRow label="MSI" value={selectedMutation.msi} />
                                        <DetailRow label="Drug Response" value={selectedMutation.drugResponse} />
                                        <DetailRow label="Metastatic Site" value={selectedMutation.metastaticSite} />
                                        <DetailRow label="Age" value={selectedMutation.AGE} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function DetailRow({ label, value, mono = false }: { label: string; value: any; mono?: boolean }) {
    const displayValue = value === null || value === undefined || value === '' || value === 'NS' ? 'N/A' : String(value)
    return (
        <div className="flex justify-between items-start py-1">
            <span className="text-sm text-slate-600">{label}</span>
            <span className={`text-sm text-right max-w-[60%] ${mono ? 'font-mono text-xs' : ''} ${displayValue === 'N/A' ? 'text-slate-400' : 'text-slate-800'}`}>
                {displayValue}
            </span>
        </div>
    )
}
