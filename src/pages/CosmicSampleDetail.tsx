import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Database, User, MapPin, Microscope, Pill, FileText, AlertCircle } from 'lucide-react'
import axios from 'axios'
import token from '../utils/token'

interface CosmicSampleFull {
    sample_id: number
    sample_name: string | number
    id_tumour: number
    id_individual: number
    primary_site: string
    site_subtype_1: string
    site_subtype_2: string
    site_subtype_3: string
    primary_histology: string
    histology_subtype_1: string
    histology_subtype_2: string
    histology_subtype_3: string
    therapy_relationship: string | null
    sample_differentiator: string | null
    mutation_allele_specification: string | null
    msi: string
    average_ploidy: number | null
    whole_genome_screen: string
    whole_exome_screen: string
    sample_remark: string | null
    drug_response: string | null
    grade: string | null
    age_at_tumour_recurrence: number | null
    stage: string | null
    cytogenetics: string | null
    metastatic_site: string | null
    tumour_source: string
    tumour_remark: string | null
    age: number | null
    ethnicity: string
    environmental_variables: string | null
    germline_mutation: string | null
    therapy: string | null
    family: string | null
    normal_tissue_tested: string
    gender: string
    individual_remark: string | null
    nci_code: string
    sample_type: string
    cosmic_phenotype_id: number
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aicancer.io.vn/api'

export default function CosmicSampleDetail() {
    const { sampleId } = useParams<{ sampleId: string }>()
    const navigate = useNavigate()
    const [sample, setSample] = useState<CosmicSampleFull | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch sample detail from API - using axios directly to bypass CaseConverter
    useEffect(() => {
        const fetchSampleDetail = async () => {
            setLoading(true)
            setError(null)
            try {
                const tokenObj = token.getTokenObject()
                const response = await axios.get(`${BASE_URL}/cosmic-sample/detail/${sampleId}`, {
                    headers: tokenObj.accessToken ? { Authorization: `Bearer ${tokenObj.accessToken}` } : {}
                })
                // API returns { success, sampleId, data: {...} }
                if (response.data?.data) {
                    setSample(response.data.data)
                } else {
                    setError('Không tìm thấy mẫu với ID này')
                }
            } catch (err) {
                console.error('Error fetching sample detail:', err)
                setError('Lỗi tải dữ liệu chi tiết')
            } finally {
                setLoading(false)
            }
        }

        if (sampleId) {
            fetchSampleDetail()
        }
    }, [sampleId])

    const formatValue = (value: any) => {
        if (value === null || value === undefined || value === '') return 'N/A'
        if (value === 'NS') return 'Không xác định'
        return String(value)
    }

    const formatGender = (gender: string) => {
        switch (gender?.toLowerCase()) {
            case 'm': return 'Nam'
            case 'f': return 'Nữ'
            case 'u': return 'Không xác định'
            default: return 'N/A'
        }
    }

    const formatYesNo = (value: string) => {
        if (value === 'y') return 'Có'
        if (value === 'n') return 'Không'
        return formatValue(value)
    }

    const formatSite = (site: string) => {
        return site?.replace(/_/g, ' ') || 'N/A'
    }

    if (loading) {
        return (
            <div className="w-full animate-fade-in space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !sample) {
        return (
            <div className="w-full animate-fade-in space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                        <AlertCircle className="w-16 h-16 text-red-400" />
                        <p className="text-gray-600">{error || 'Không tìm thấy dữ liệu'}</p>
                        <button
                            onClick={() => navigate('/cosmic-samples')}
                            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                        >
                            Quay lại danh sách
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/cosmic-samples')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Quay lại"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-teal-900 flex items-center gap-3">
                            <Database className="w-7 h-7 text-teal-500" />
                            Chi tiết mẫu: {sample.sample_name}
                        </h1>
                        <p className="text-slate-medium">
                            ID: {sample.sample_id} | COSMIC Phenotype ID: {sample.cosmic_phenotype_id}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sample Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                    <h2 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-teal-500" />
                        Thông tin cơ bản
                    </h2>
                    <div className="space-y-3">
                        <InfoRow label="Sample ID" value={sample.sample_id} />
                        <InfoRow label="Tên mẫu" value={sample.sample_name} />
                        <InfoRow label="ID khối u" value={sample.id_tumour} />
                        <InfoRow label="ID cá nhân" value={sample.id_individual} />
                        <InfoRow label="Loại mẫu" value={formatValue(sample.sample_type)} />
                        <InfoRow label="NCI Code" value={sample.nci_code} />
                        <InfoRow label="COSMIC Phenotype ID" value={sample.cosmic_phenotype_id} />
                        <InfoRow label="Ghi chú mẫu" value={formatValue(sample.sample_remark)} />
                    </div>
                </div>

                {/* Patient Info */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                    <h2 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-teal-500" />
                        Thông tin bệnh nhân
                    </h2>
                    <div className="space-y-3">
                        <InfoRow label="Tuổi" value={sample.age !== null ? `${sample.age} tuổi` : 'N/A'} />
                        <InfoRow label="Giới tính" value={formatGender(sample.gender)} />
                        <InfoRow label="Dân tộc" value={sample.ethnicity} highlight />
                        <InfoRow label="Yếu tố môi trường" value={formatValue(sample.environmental_variables)} />
                        <InfoRow label="Đột biến dòng mầm" value={formatValue(sample.germline_mutation)} />
                        <InfoRow label="Lịch sử gia đình" value={formatValue(sample.family)} />
                        <InfoRow label="Mô bình thường đã xét nghiệm" value={formatYesNo(sample.normal_tissue_tested)} />
                        <InfoRow label="Ghi chú cá nhân" value={formatValue(sample.individual_remark)} />
                    </div>
                </div>

                {/* Tumour Info */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                    <h2 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-teal-500" />
                        Thông tin khối u
                    </h2>
                    <div className="space-y-3">
                        <InfoRow label="Vị trí chính" value={formatSite(sample.primary_site)} highlight />
                        <InfoRow label="Vị trí phụ 1" value={formatValue(sample.site_subtype_1)} />
                        <InfoRow label="Vị trí phụ 2" value={formatValue(sample.site_subtype_2)} />
                        <InfoRow label="Vị trí phụ 3" value={formatValue(sample.site_subtype_3)} />
                        <InfoRow label="Nguồn khối u" value={formatValue(sample.tumour_source)} />
                        <InfoRow label="Vị trí di căn" value={formatValue(sample.metastatic_site)} />
                        <InfoRow label="Giai đoạn" value={formatValue(sample.stage)} />
                        <InfoRow label="Độ ác tính" value={formatValue(sample.grade)} />
                        <InfoRow label="Tuổi tái phát" value={formatValue(sample.age_at_tumour_recurrence)} />
                        <InfoRow label="Ghi chú khối u" value={formatValue(sample.tumour_remark)} />
                    </div>
                </div>

                {/* Histology Info */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                    <h2 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                        <Microscope className="w-5 h-5 text-teal-500" />
                        Thông tin mô học
                    </h2>
                    <div className="space-y-3">
                        <InfoRow label="Mô học chính" value={formatValue(sample.primary_histology)} highlight />
                        <InfoRow label="Mô học phụ 1" value={formatValue(sample.histology_subtype_1)} />
                        <InfoRow label="Mô học phụ 2" value={formatValue(sample.histology_subtype_2)} />
                        <InfoRow label="Mô học phụ 3" value={formatValue(sample.histology_subtype_3)} />
                        <InfoRow label="Di truyền tế bào" value={formatValue(sample.cytogenetics)} />
                    </div>
                </div>

                {/* Screening & Molecular Info */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                    <h2 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-teal-500" />
                        Thông tin sàng lọc & phân tử
                    </h2>
                    <div className="space-y-3">
                        <InfoRow label="Whole Genome Screen" value={formatYesNo(sample.whole_genome_screen)} />
                        <InfoRow label="Whole Exome Screen" value={formatYesNo(sample.whole_exome_screen)} />
                        <InfoRow label="MSI (Microsatellite Instability)" value={formatValue(sample.msi)} />
                        <InfoRow label="Average Ploidy" value={formatValue(sample.average_ploidy)} />
                        <InfoRow label="Mutation Allele Specification" value={formatValue(sample.mutation_allele_specification)} />
                        <InfoRow label="Sample Differentiator" value={formatValue(sample.sample_differentiator)} />
                    </div>
                </div>

                {/* Therapy Info */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                    <h2 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                        <Pill className="w-5 h-5 text-teal-500" />
                        Thông tin điều trị
                    </h2>
                    <div className="space-y-3">
                        <InfoRow label="Liệu pháp" value={formatValue(sample.therapy)} />
                        <InfoRow label="Mối quan hệ điều trị" value={formatValue(sample.therapy_relationship)} />
                        <InfoRow label="Đáp ứng thuốc" value={formatValue(sample.drug_response)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function InfoRow({ label, value, highlight = false }: { label: string; value: any; highlight?: boolean }) {
    return (
        <div className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-sm text-gray-600 font-medium">{label}</span>
            <span className={`text-sm text-right max-w-[60%] ${highlight ? 'text-teal-700 font-semibold' : 'text-gray-800'}`}>
                {String(value)}
            </span>
        </div>
    )
}
