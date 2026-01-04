import { useState, useEffect, useMemo, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Database, Search, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, ExternalLink, ArrowLeft } from 'lucide-react'
import axios from 'axios'
import token from '../utils/token'

interface PanelDataRecord {
    geneName: string
    'Gene name': string
    Variant: string
    'Primary Site': string
    Disease: string
    Therapies: string
    evidence_level: number
    therapy_rank: number
    therapy_interaction_type: string | null
    description: string | null
    significance: string
    source_type: string
    source_id: string
    NCIid: string
    source_db: string
    disease_type: string
    genomic_ID: string | null
}


const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aicancer.io.vn/api'

// Cancer type mapping
const CANCER_TYPES = [
    { value: 'lung', label: 'Ung thư phổi' },
    { value: 'breast', label: 'Ung thư vú' },
    { value: 'liver', label: 'Ung thư gan' },
    { value: 'colorectal', label: 'Ung thư đại trực tràng' },
    { value: 'thyroid', label: 'Ung thư tuyến giáp' },
]

// Region mapping
const REGIONS = [
    { value: 'asia', label: 'Châu Á' },
    { value: 'world', label: 'Thế giới' },
]

export default function PanelData() {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const tableRef = useRef<HTMLDivElement>(null)

    const [records, setRecords] = useState<PanelDataRecord[]>([])
    const [loading, setLoading] = useState(true)

    // Search states for each field
    const [searchGene, setSearchGene] = useState('')
    const [searchVariant, setSearchVariant] = useState('')
    const [searchDisease, setSearchDisease] = useState('')
    const [debouncedSearchGene, setDebouncedSearchGene] = useState('')
    const [debouncedSearchVariant, setDebouncedSearchVariant] = useState('')
    const [debouncedSearchDisease, setDebouncedSearchDisease] = useState('')

    const [sortColumn, setSortColumn] = useState<keyof PanelDataRecord>('geneName')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(20)
    const [totalItems, setTotalItems] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    // Filters - default: lung + asia
    const [cancerType, setCancerType] = useState(searchParams.get('type') || 'lung')
    const [region, setRegion] = useState(searchParams.get('region') || 'asia')

    // Construct panelType from cancer + region
    const panelType = `${cancerType}_${region}`

    // Debounce search terms
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchGene(searchGene)
        }, 500)
        return () => clearTimeout(timer)
    }, [searchGene])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchVariant(searchVariant)
        }, 500)
        return () => clearTimeout(timer)
    }, [searchVariant])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchDisease(searchDisease)
        }, 500)
        return () => clearTimeout(timer)
    }, [searchDisease])

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearchGene, debouncedSearchVariant, debouncedSearchDisease, panelType])

    // Fetch data from API
    const fetchData = async () => {
        setLoading(true)
        try {
            const tokenObj = token.getTokenObject()
            const params: Record<string, any> = {
                page: currentPage,
                limit: itemsPerPage,
            }

            // Check if there are any search parameters
            const hasSearchParams = debouncedSearchGene || debouncedSearchVariant || debouncedSearchDisease

            // Add search params for each field
            if (debouncedSearchGene) {
                params.geneName = debouncedSearchGene
            }
            if (debouncedSearchVariant) {
                params.variant = debouncedSearchVariant
            }
            if (debouncedSearchDisease) {
                params.disease = debouncedSearchDisease
            }

            // Use /search endpoint if search params exist, otherwise use base endpoint
            const endpoint = hasSearchParams
                ? `${BASE_URL}/panel-data/${panelType}/search`
                : `${BASE_URL}/panel-data/${panelType}`

            const response = await axios.get(endpoint, {
                params,
                headers: tokenObj.accessToken ? { Authorization: `Bearer ${tokenObj.accessToken}` } : {}
            })

            const data = response.data

            if (data && Array.isArray(data.data)) {
                setRecords(data.data)
                setTotalItems(data.totalItems)
                setTotalPages(data.totalPages)
            } else if (Array.isArray(data)) {
                // If response is directly an array
                setRecords(data)
                setTotalItems(data.length)
                setTotalPages(Math.ceil(data.length / itemsPerPage))
            } else {
                setRecords([])
                setTotalItems(0)
                setTotalPages(0)
            }
        } catch (error) {
            console.error('Error fetching panel data:', error)
            setRecords([])
            setTotalItems(0)
            setTotalPages(0)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [currentPage, itemsPerPage, debouncedSearchGene, debouncedSearchVariant, debouncedSearchDisease, panelType])

    // Update URL params when filters change
    useEffect(() => {
        const params = new URLSearchParams()
        if (cancerType !== 'all') params.set('type', cancerType)
        if (region !== 'all') params.set('region', region)
        setSearchParams(params)
    }, [cancerType, region, setSearchParams])

    const handleSort = (column: keyof PanelDataRecord) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    // Client-side sorting for current page
    const sortedRecords = useMemo(() => {
        return [...records].sort((a, b) => {
            const aValue = a[sortColumn]
            const bValue = b[sortColumn]

            if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? 1 : -1
            if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? -1 : 1

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
            }

            const aStr = String(aValue).toLowerCase()
            const bStr = String(bValue).toLowerCase()
            return sortDirection === 'asc'
                ? aStr.localeCompare(bStr)
                : bStr.localeCompare(aStr)
        })
    }, [records, sortColumn, sortDirection])

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)))
        tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i)
                pages.push('...')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
            } else {
                pages.push(1)
                pages.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
                pages.push('...')
                pages.push(totalPages)
            }
        }
        return pages
    }

    const getSignificanceColor = (significance: string) => {
        switch (significance?.toLowerCase()) {
            case 'sensitivity': return 'bg-green-100 text-green-700'
            case 'resistance': return 'bg-red-100 text-red-700'
            case 'reduced sensitivity': return 'bg-yellow-100 text-yellow-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    const getEvidenceLevelColor = (level: number) => {
        switch (level) {
            case 1: return 'bg-emerald-500 text-white'
            case 2: return 'bg-blue-500 text-white'
            case 3: return 'bg-orange-500 text-white'
            case 4: return 'bg-gray-500 text-white'
            default: return 'bg-gray-300 text-gray-700'
        }
    }

    if (loading) {
        return (
            <div className="w-full animate-fade-in space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                        <p className="text-gray-600">Đang tải dữ liệu...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <button
                            onClick={() => navigate('/home')}
                            className="flex items-center gap-2 text-teal-600 hover:text-teal-800 mb-3 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Quay lại Trang chủ</span>
                        </button>
                        <h1 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-3 uppercase">
                            <Database className="w-7 h-7 text-teal-500" />
                            Cơ sở dữ liệu mối quan hệ
                        </h1>
                        <p className="text-slate-medium">
                            CSDL về mối quan hệ giữa các đột biến gen và thuốc điều trị đích các loại ung thư phổ biến.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl shadow-sm p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-teal-100 text-sm font-medium mb-1">Tổng số bản ghi</p>
                            <p className="text-3xl font-bold">{totalItems.toLocaleString()}</p>
                        </div>
                        <Database className="w-10 h-10 text-teal-200" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div ref={tableRef} className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                {/* Filters - all in one row */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    {/* Search boxes */}
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <input
                            type="text"
                            placeholder="Gene..."
                            value={searchGene}
                            onChange={(e) => setSearchGene(e.target.value)}
                            className="w-50 pl-7 pr-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-xs"
                        />
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <input
                            type="text"
                            placeholder="Variant..."
                            value={searchVariant}
                            onChange={(e) => setSearchVariant(e.target.value)}
                            className="w-50 pl-7 pr-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-xs"
                        />
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                        <input
                            type="text"
                            placeholder="Bệnh..."
                            value={searchDisease}
                            onChange={(e) => setSearchDisease(e.target.value)}
                            className="w-50 pl-7 pr-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-xs"
                        />
                    </div>

                    <div className="w-px h-6 bg-gray-300 mx-1"></div>

                    {/* Filters */}
                    <div className="flex items-center gap-1">
                        <Filter className="w-3.5 h-3.5 text-gray-500" />
                        <select
                            value={cancerType}
                            onChange={(e) => setCancerType(e.target.value)}
                            className="px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
                        >
                            {CANCER_TYPES.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                    <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
                    >
                        {REGIONS.map(r => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                    </select>

                    <div className="flex items-center gap-1 ml-auto">
                        <label className="text-xs text-gray-600">Hiển thị:</label>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value))
                                setCurrentPage(1)
                            }}
                            className="px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
                        >
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('geneName')}
                                >
                                    <div className="flex items-center gap-1">
                                        Gene <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('Variant')}
                                >
                                    <div className="flex items-center gap-1">
                                        Variant <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('Disease')}
                                >
                                    <div className="flex items-center gap-1">
                                        Bệnh <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('Therapies')}
                                >
                                    <div className="flex items-center gap-1">
                                        Liệu pháp <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('significance')}
                                >
                                    <div className="flex items-center gap-1">
                                        Ý nghĩa <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('evidence_level')}
                                >
                                    <div className="flex items-center gap-1">
                                        Mức độ <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">
                                    Nguồn
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sortedRecords.map((record, index) => (
                                <tr
                                    key={`${record.geneName}-${record.Variant}-${index}`}
                                    className={`hover:bg-teal-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                                >
                                    <td className="px-3 py-2 text-xs font-medium text-teal-700">{record.geneName || record['Gene name']}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600 font-mono">{record.Variant || '-'}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600 max-w-xs truncate" title={record.Disease}>
                                        {record.Disease || '-'}
                                    </td>
                                    <td className="px-3 py-2 text-xs text-gray-600 max-w-xs truncate" title={record.Therapies}>
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                            {record.Therapies || '-'}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-xs">
                                        <span className={`px-2 py-1 rounded text-xs ${getSignificanceColor(record.significance)}`}>
                                            {record.significance || '-'}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-md">
                                        {record.evidence_level}
                                    </td>
                                    <td className="px-3 py-2 text-xs text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <span>{record.source_db}</span>
                                            {record.source_id && (
                                                <a
                                                    href={record.source_type === 'PubMed'
                                                        ? `https://clinicaltrials.gov/ct2/show/${record.source_id}`
                                                        : `https://pubmed.ncbi.nlm.nih.gov/${record.source_id}`
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-teal-600 hover:text-teal-800"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                        Trang {currentPage} / {totalPages} ({totalItems.toLocaleString()} bản ghi)
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => goToPage(1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Trang đầu"
                        >
                            <ChevronsLeft className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Trang trước"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-1">
                            {getPageNumbers().map((page, index) => (
                                typeof page === 'number' ? (
                                    <button
                                        key={index}
                                        onClick={() => goToPage(page)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                            ? 'bg-teal-500 text-white'
                                            : 'border border-gray-200 hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ) : (
                                    <span key={index} className="px-2 text-gray-400">...</span>
                                )
                            ))}
                        </div>

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Trang sau"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => goToPage(totalPages)}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Trang cuối"
                        >
                            <ChevronsRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
