import { useState, useEffect } from 'react'
import { Pill, Search, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CheckCircle, XCircle } from 'lucide-react'

interface MedicineData {
    STT: number
    "VN phê duyệt": string | null
    "FDA phê duyệt": string
}

export default function MedicinesList() {
    const [medicines, setMedicines] = useState<MedicineData[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortColumn, setSortColumn] = useState<'STT' | 'VN phê duyệt' | 'FDA phê duyệt'>('STT')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(20)
    const [filterType, setFilterType] = useState<'all' | 'vn' | 'fda'>('all')

    useEffect(() => {
        fetch('/medicines.json')
            .then(response => response.json())
            .then(data => {
                setMedicines(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error loading medicine data:', error)
                setLoading(false)
            })
    }, [])

    // Reset to page 1 when search or filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, filterType])

    const handleSort = (column: 'STT' | 'VN phê duyệt' | 'FDA phê duyệt') => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    const filteredAndSortedMedicines = medicines
        .filter(medicine => {
            // Filter by type
            if (filterType === 'vn' && !medicine["VN phê duyệt"]) return false
            if (filterType === 'fda' && !medicine["FDA phê duyệt"]) return false

            // Search filter
            const vnName = medicine["VN phê duyệt"] || ''
            const fdaName = medicine["FDA phê duyệt"] || ''
            return vnName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fdaName.toLowerCase().includes(searchTerm.toLowerCase())
        })
        .sort((a, b) => {
            const aValue = a[sortColumn]
            const bValue = b[sortColumn]

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
            }

            const aStr = String(aValue || '').toLowerCase()
            const bStr = String(bValue || '').toLowerCase()
            return sortDirection === 'asc'
                ? aStr.localeCompare(bStr)
                : bStr.localeCompare(aStr)
        })

    // Stats
    const vnApprovedCount = medicines.filter(m => m["VN phê duyệt"]).length
    const fdaApprovedCount = medicines.filter(m => m["FDA phê duyệt"]).length

    // Pagination calculations
    const totalItems = filteredAndSortedMedicines.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
    const paginatedMedicines = filteredAndSortedMedicines.slice(startIndex, endIndex)

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
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

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-3 uppercase">
                            <Pill className="w-7 h-7 text-teal-500" />
                            Danh sách thuốc điều trị đích
                        </h1>
                        <p className="text-slate-medium">
                            Danh sách thuốc đích các loại ung thư được Việt Nam và FDA phê duyệt.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl shadow-sm p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-teal-100 text-sm font-medium mb-1">Việt Nam phê duyệt</p>
                            <p className="text-3xl font-bold">{vnApprovedCount}</p>
                        </div>
                        <CheckCircle className="w-10 h-10 text-teal-200" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-sm p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm font-medium mb-1">FDA phê duyệt</p>
                            <p className="text-3xl font-bold">{fdaApprovedCount}</p>
                        </div>
                        <CheckCircle className="w-10 h-10 text-blue-200" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên thuốc..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Filter buttons */}
                        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setFilterType('all')}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filterType === 'all'
                                    ? 'bg-white text-teal-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Tất cả
                            </button>
                            <button
                                onClick={() => setFilterType('vn')}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filterType === 'vn'
                                    ? 'bg-white text-teal-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                VN
                            </button>
                            <button
                                onClick={() => setFilterType('fda')}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filterType === 'fda'
                                    ? 'bg-white text-teal-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                FDA
                            </button>
                        </div>

                        {/* Items per page */}
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
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <span className="text-sm text-gray-600">dòng</span>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th
                                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 w-20"
                                    onClick={() => handleSort('STT')}
                                >
                                    <div className="flex items-center gap-2">
                                        STT
                                        <ArrowUpDown className="w-4 h-4" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('VN phê duyệt')}
                                >
                                    <div className="flex items-center gap-2">
                                        VN phê duyệt
                                        <ArrowUpDown className="w-4 h-4" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('FDA phê duyệt')}
                                >
                                    <div className="flex items-center gap-2">
                                        FDA phê duyệt
                                        <ArrowUpDown className="w-4 h-4" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedMedicines.map((medicine, index) => (
                                <tr
                                    key={medicine.STT}
                                    className={`hover:bg-teal-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                                >
                                    <td className="px-4 py-3 text-sm text-gray-600">{medicine.STT}</td>
                                    <td className="px-4 py-3 text-sm">
                                        {medicine["VN phê duyệt"] ? (
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span className="font-medium text-gray-800">{medicine["VN phê duyệt"]}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <XCircle className="w-4 h-4" />
                                                <span>Chưa phê duyệt</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {medicine["FDA phê duyệt"] ? (
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-blue-500" />
                                                <span className="font-medium text-gray-800">{medicine["FDA phê duyệt"]}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <XCircle className="w-4 h-4" />
                                                <span>Chưa phê duyệt</span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                        Hiển thị {startIndex + 1} - {endIndex} / {totalItems} thuốc
                        {searchTerm && ` (lọc từ ${medicines.length} thuốc)`}
                    </div>

                    <div className="flex items-center gap-1">
                        {/* First page */}
                        <button
                            onClick={() => goToPage(1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Trang đầu"
                        >
                            <ChevronsLeft className="w-4 h-4" />
                        </button>

                        {/* Previous page */}
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Trang trước"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Page numbers */}
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

                        {/* Next page */}
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Trang sau"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Last page */}
                        <button
                            onClick={() => goToPage(totalPages)}
                            disabled={currentPage === totalPages}
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
