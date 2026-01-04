import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Database, Search, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, ArrowLeft } from 'lucide-react'
import request from '../utils/request'

interface CosmicSample {
    sampleId: number
    sampleName: string | number
    primarySite: string
    primaryHistology: string
    histologySubtype1: string
    tumourSource: string
    age: number | null
    ethnicity: string
    gender: string
    nciCode: string
    sampleType: string
}

interface ApiResponse {
    success: boolean
    data: CosmicSample[]
    totalItems: number
    page: number
    limit: number
    totalPages: number
}

export default function CosmicSamples() {
    const navigate = useNavigate()
    const tableRef = useRef<HTMLDivElement>(null)

    const [samples, setSamples] = useState<CosmicSample[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [sortColumn, setSortColumn] = useState<keyof CosmicSample>('sampleId')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(20)
    const [totalItems, setTotalItems] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 500)
        return () => clearTimeout(timer)
    }, [searchTerm])

    // Reset page when search changes
    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearchTerm])

    // Fetch samples from API
    const fetchSamples = async () => {
        setLoading(true)
        try {
            let endpoint = '/cosmic-sample'
            const params: Record<string, any> = {
                page: currentPage,
                limit: itemsPerPage,
            }

            // If there's a search term, use the search endpoint
            if (debouncedSearchTerm) {
                endpoint = '/cosmic-sample/search'
                // Check if search term is a number (sample_id) or text (geneName)
                if (!isNaN(Number(debouncedSearchTerm))) {
                    params.sampleId = Number(debouncedSearchTerm)
                } else {
                    params.geneName = debouncedSearchTerm
                }
            }

            const response = await request.get(endpoint, { params })
            const data: ApiResponse = response.data

            if (data && Array.isArray(data.data)) {
                setSamples(data.data)
                setTotalItems(data.totalItems || 0)
                setTotalPages(data.totalPages || Math.ceil((data.totalItems || 0) / itemsPerPage))
            } else {
                setSamples([])
                setTotalItems(0)
                setTotalPages(0)
            }
        } catch (error) {
            console.error('Error fetching Cosmic samples:', error)
            setSamples([])
            setTotalItems(0)
            setTotalPages(0)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSamples()
    }, [currentPage, itemsPerPage, debouncedSearchTerm])

    const handleSort = (column: keyof CosmicSample) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    // Client-side sorting for current page
    const sortedSamples = useMemo(() => {
        return [...samples].sort((a, b) => {
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
    }, [samples, sortColumn, sortDirection])

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

    const formatGender = (gender: string) => {
        switch (gender?.toLowerCase()) {
            case 'm': return 'Nam'
            case 'f': return 'Nữ'
            default: return 'N/A'
        }
    }

    const formatSite = (site: string) => {
        return site?.replace(/_/g, ' ') || 'N/A'
    }

    if (loading) {
        return (
            <div className="w-full animate-fade-in space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                        <p className="text-gray-600">Đang tải dữ liệu COSMIC...</p>
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
                            Bộ dữ liệu giải trình tự gen
                        </h1>
                        <p className="text-slate-medium">
                            Bộ CSDL giải trình tự của 457 bệnh nhân Việt Nam kết hợp với 97.370 bản ghi dữ liệu quốc tế từ COSMIC, CIViC, OncoKB và DGIdb.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl shadow-sm p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-teal-100 text-sm font-medium mb-1">Tổng số mẫu</p>
                            <p className="text-3xl font-bold">{totalItems.toLocaleString()}</p>
                        </div>
                        <Database className="w-10 h-10 text-teal-200" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div ref={tableRef} className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                {/* Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo Sample ID hoặc Gene Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Hiển thị:</label>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value))
                                setCurrentPage(1)
                            }}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                        >
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span className="text-sm text-gray-600">dòng</span>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('sampleId')}
                                >
                                    <div className="flex items-center gap-1">
                                        ID <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('sampleName')}
                                >
                                    <div className="flex items-center gap-1">
                                        Tên mẫu <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('primarySite')}
                                >
                                    <div className="flex items-center gap-1">
                                        Loại mô <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('primaryHistology')}
                                >
                                    <div className="flex items-center gap-1">
                                        Mô học <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('ethnicity')}
                                >
                                    <div className="flex items-center gap-1">
                                        Dân tộc <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('age')}
                                >
                                    <div className="flex items-center gap-1">
                                        Tuổi <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('gender')}
                                >
                                    <div className="flex items-center gap-1">
                                        Giới tính <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">
                                    Loại mẫu
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sortedSamples.map((sample, index) => (
                                <tr
                                    key={`${sample.sampleId}-${index}`}
                                    className={`hover:bg-teal-50 transition-colors cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                                    onClick={() => navigate(`/cosmic-samples/${sample.sampleId}`)}
                                >
                                    <td className="px-3 py-2 text-xs text-gray-600 font-mono">{sample.sampleId || '-'}</td>
                                    <td className="px-3 py-2 text-xs font-medium text-teal-700">{sample.sampleName || '-'}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                            {formatSite(sample.primarySite)}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-xs text-gray-600">{sample.primaryHistology || 'N/A'}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600">
                                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                            {sample.ethnicity || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-xs text-gray-600">{sample.age ?? 'N/A'}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600">{formatGender(sample.gender)}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600">{sample.sampleType || 'N/A'}</td>
                                    <td className="px-3 py-2 text-xs">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                navigate(`/cosmic-samples/${sample.sampleId}`)
                                            }}
                                            className="flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-700 rounded hover:bg-teal-200 transition-colors"
                                        >
                                            <Eye className="w-3 h-3" />
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                        Trang {currentPage} / {totalPages} ({totalItems.toLocaleString()} mẫu)
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
