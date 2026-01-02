import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Database, Search, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, Eye } from 'lucide-react'

interface CosmicSample {
    sample_id: number
    sample_name: string | number
    primary_site: string
    primary_histology: string
    histology_subtype_1: string
    tumour_source: string
    age: number | null
    ethnicity: string
    gender: string
    nci_code: string
    sample_type: string
}

export default function CosmicSamples() {
    const navigate = useNavigate()
    const [samples, setSamples] = useState<CosmicSample[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortColumn, setSortColumn] = useState<keyof CosmicSample>('sample_id')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(50)
    const [filterSite, setFilterSite] = useState<string>('all')
    const [filterEthnicity, setFilterEthnicity] = useState<string>('all')

    useEffect(() => {
        setLoadingProgress(10)
        fetch('/CosmicSample_asian.json')
            .then(response => {
                setLoadingProgress(30)
                return response.json()
            })
            .then(data => {
                setLoadingProgress(80)
                setSamples(data)
                setLoadingProgress(100)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error loading COSMIC data:', error)
                setLoading(false)
            })
    }, [])

    // Reset to page 1 when search or filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, filterSite, filterEthnicity])

    // Get unique values for filters
    const uniqueSites = useMemo(() => {
        const sites = new Set(samples.map(s => s.primary_site).filter(Boolean))
        return Array.from(sites).sort()
    }, [samples])

    const uniqueEthnicities = useMemo(() => {
        const ethnicities = new Set(samples.map(s => s.ethnicity).filter(Boolean))
        return Array.from(ethnicities).sort()
    }, [samples])

    const handleSort = (column: keyof CosmicSample) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    const filteredAndSortedSamples = useMemo(() => {
        return samples
            .filter(sample => {
                // Site filter
                if (filterSite !== 'all' && sample.primary_site !== filterSite) return false
                // Ethnicity filter
                if (filterEthnicity !== 'all' && sample.ethnicity !== filterEthnicity) return false
                // Search filter
                if (searchTerm) {
                    const searchLower = searchTerm.toLowerCase()
                    return (
                        String(sample.sample_id).includes(searchLower) ||
                        String(sample.sample_name).toLowerCase().includes(searchLower) ||
                        (sample.primary_site || '').toLowerCase().includes(searchLower) ||
                        (sample.ethnicity || '').toLowerCase().includes(searchLower) ||
                        (sample.primary_histology || '').toLowerCase().includes(searchLower)
                    )
                }
                return true
            })
            .sort((a, b) => {
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
    }, [samples, searchTerm, filterSite, filterEthnicity, sortColumn, sortDirection])

    // Pagination calculations
    const totalItems = filteredAndSortedSamples.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
    const paginatedSamples = filteredAndSortedSamples.slice(startIndex, endIndex)

    const tableRef = useRef<HTMLDivElement>(null)

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)))
        // Scroll to top of table
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
                        <p className="text-gray-600">Đang tải dữ liệu COSMIC ({loadingProgress}%)...</p>
                        <div className="w-64 bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${loadingProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-500">Vui lòng đợi...</p>
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
                            <p className="text-3xl font-bold">{samples.length.toLocaleString()}</p>
                        </div>
                        <Database className="w-10 h-10 text-teal-200" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-sm p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium mb-1">Loại mô</p>
                            <p className="text-3xl font-bold">{uniqueSites.length}</p>
                        </div>
                        <Filter className="w-10 h-10 text-blue-200" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-sm p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm font-medium mb-1">Dân tộc</p>
                            <p className="text-3xl font-bold">{uniqueEthnicities.length}</p>
                        </div>
                        <Filter className="w-10 h-10 text-purple-200" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div ref={tableRef} className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                {/* Search and Filters */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="relative max-w-md flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo ID, tên mẫu, mô, dân tộc..."
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
                                <option value={200}>200</option>
                            </select>
                            <span className="text-sm text-gray-600">dòng</span>
                        </div>
                    </div>

                    {/* Filter dropdowns */}
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Loại mô:</label>
                            <select
                                value={filterSite}
                                onChange={(e) => setFilterSite(e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                            >
                                <option value="all">Tất cả</option>
                                {uniqueSites.map(site => (
                                    <option key={site} value={site}>{formatSite(site)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Dân tộc:</label>
                            <select
                                value={filterEthnicity}
                                onChange={(e) => setFilterEthnicity(e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                            >
                                <option value="all">Tất cả</option>
                                {uniqueEthnicities.map(eth => (
                                    <option key={eth} value={eth}>{eth}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('sample_id')}
                                >
                                    <div className="flex items-center gap-1">
                                        ID <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('sample_name')}
                                >
                                    <div className="flex items-center gap-1">
                                        Tên mẫu <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('primary_site')}
                                >
                                    <div className="flex items-center gap-1">
                                        Loại mô <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-3 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('primary_histology')}
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
                            {paginatedSamples.map((sample, index) => (
                                <tr
                                    key={`${sample.sample_id}-${index}`}
                                    className={`hover:bg-teal-50 transition-colors cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                                    onClick={() => navigate(`/cosmic-samples/${sample.sample_id}`, { state: { sample } })}
                                >
                                    <td className="px-3 py-2 text-xs text-gray-600 font-mono">{sample.sample_id}</td>
                                    <td className="px-3 py-2 text-xs font-medium text-teal-700">{sample.sample_name}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                            {formatSite(sample.primary_site)}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-xs text-gray-600">{sample.primary_histology || 'N/A'}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600">
                                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                            {sample.ethnicity || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-xs text-gray-600">{sample.age || 'N/A'}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600">{formatGender(sample.gender)}</td>
                                    <td className="px-3 py-2 text-xs text-gray-600">{sample.sample_type || 'N/A'}</td>
                                    <td className="px-3 py-2 text-xs">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                navigate(`/cosmic-samples/${sample.sample_id}`, { state: { sample } })
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
                        Hiển thị {totalItems > 0 ? startIndex + 1 : 0} - {endIndex} / {totalItems.toLocaleString()} mẫu
                        {(searchTerm || filterSite !== 'all' || filterEthnicity !== 'all') &&
                            ` (lọc từ ${samples.length.toLocaleString()} mẫu)`
                        }
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
