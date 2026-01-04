import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Database, Search, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowLeft } from 'lucide-react'

interface GeneData {
    STT: number
    GEN: string
    "STT NST": number | string
    START: number
    END: number
}

export default function DNALibrary() {
    const navigate = useNavigate()
    const [genes, setGenes] = useState<GeneData[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortColumn, setSortColumn] = useState<keyof GeneData>('STT')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(20)

    useEffect(() => {
        fetch('/GEN_177.json')
            .then(response => response.json())
            .then(data => {
                setGenes(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error loading gene data:', error)
                setLoading(false)
            })
    }, [])

    // Reset to page 1 when search changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm])

    const handleSort = (column: keyof GeneData) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    const filteredAndSortedGenes = genes
        .filter(gene =>
            gene.GEN.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(gene["STT NST"]).toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = a[sortColumn]
            const bValue = b[sortColumn]

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
            }

            const aStr = String(aValue).toLowerCase()
            const bStr = String(bValue).toLowerCase()
            return sortDirection === 'asc'
                ? aStr.localeCompare(bStr)
                : bStr.localeCompare(aStr)
        })

    // Pagination calculations
    const totalItems = filteredAndSortedGenes.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
    const paginatedGenes = filteredAndSortedGenes.slice(startIndex, endIndex)

    const formatNumber = (num: number) => {
        return num.toLocaleString('vi-VN')
    }

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
                        <button
                            onClick={() => navigate('/home')}
                            className="flex items-center gap-2 text-teal-600 hover:text-teal-800 mb-3 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Quay lại Trang chủ</span>
                        </button>
                        <h1 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-3 uppercase">
                            <Database className="w-7 h-7 text-teal-500" />
                            Thư viện phân lập DNA
                        </h1>
                        <p className="text-slate-medium">
                            Thư viện phân lập DNA của tối thiểu 100 gen đích liên quan đến sự đáp ứng của thuốc điều trị một số loại ung thư phổ biến từ 400 đối tượng nghiên cứu người Việt Nam.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl shadow-sm p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-teal-100 text-sm font-medium mb-1">Tổng số Gen</p>
                            <p className="text-3xl font-bold">{genes.length}</p>
                        </div>
                        <Database className="w-10 h-10 text-teal-200" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-sm p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm font-medium mb-1">Tổng số nghiên cứu</p>
                            <p className="text-3xl font-bold">400</p>
                        </div>
                        <Database className="w-10 h-10 text-purple-200" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-light p-6">
                {/* Search and Items per page */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên gen hoặc NST..."
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
                            <option value={10}>10</option>
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
                                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('STT')}
                                >
                                    <div className="flex items-center gap-2">
                                        STT
                                        <ArrowUpDown className="w-4 h-4" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('GEN')}
                                >
                                    <div className="flex items-center gap-2">
                                        GEN
                                        <ArrowUpDown className="w-4 h-4" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('STT NST')}
                                >
                                    <div className="flex items-center gap-2">
                                        NST
                                        <ArrowUpDown className="w-4 h-4" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('START')}
                                >
                                    <div className="flex items-center gap-2">
                                        START
                                        <ArrowUpDown className="w-4 h-4" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSort('END')}
                                >
                                    <div className="flex items-center gap-2">
                                        END
                                        <ArrowUpDown className="w-4 h-4" />
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Độ dài (bp)
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedGenes.map((gene, index) => (
                                <tr
                                    key={gene.STT}
                                    className={`hover:bg-teal-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                                >
                                    <td className="px-4 py-3 text-sm text-gray-600">{gene.STT}</td>
                                    <td className="px-4 py-3 text-sm font-semibold text-teal-700">{gene.GEN}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        <span className="text-xs font-medium">
                                            {gene["STT NST"]}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">{formatNumber(gene.START)}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">{formatNumber(gene.END)}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                                        {formatNumber(gene.END - gene.START)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                        Hiển thị {startIndex + 1} - {endIndex} / {totalItems} gen
                        {searchTerm && ` (lọc từ ${genes.length} gen)`}
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
