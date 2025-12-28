import { useState, useEffect, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, BookOpen, Users, Building2 } from 'lucide-react';

// Import article data
import lungArticle from '../data/lung_article_.json';
import liverArticle from '../data/hepatocellular_article_.json';
import breastArticle from '../data/breast_article_.json';
import thyroidArticle from '../data/thyroid_article_.json';
import colorectalArticle from '../data/colorectal_article_.json';

interface Article {
    Index2?: number;
    Article_citation?: string;
    Heading_title?: string;
    Authors?: string;
    Affiliation?: string;
    Identifiers?: string;
    Abstract?: string;
    Free_label?: string;
    Category?: number;
}

interface ArticleProps {
    type: string;
}

const Article = ({ type }: ArticleProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterValue, setFilterValue] = useState('All');
    const [expandedAbstract, setExpandedAbstract] = useState<Set<number>>(new Set());
    const [expandedAffiliation, setExpandedAffiliation] = useState<Set<number>>(new Set());
    const pageSize = 10;

    // Get article data based on cancer type
    const articleData: Article[] = useMemo(() => {
        let data: Article[] = [];
        switch (type) {
            case 'lung-cancer':
                data = Object.values(lungArticle);
                break;
            case 'liver-cancer':
                data = Object.values(liverArticle);
                break;
            case 'breast-cancer':
                data = Object.values(breastArticle);
                break;
            case 'thyroid-cancer':
                data = Object.values(thyroidArticle);
                break;
            case 'colorectal-cancer':
                data = Object.values(colorectalArticle);
                break;
            default:
                data = [];
        }
        return data;
    }, [type]);

    // Reset page when type changes
    useEffect(() => {
        setCurrentPage(1);
        setSearchQuery('');
        setFilterValue('All');
        setExpandedAbstract(new Set());
        setExpandedAffiliation(new Set());
    }, [type]);

    // Filter and search articles
    const filteredArticles = useMemo(() => {
        let filtered = articleData;

        // Filter by category
        if (filterValue !== 'All') {
            filtered = filtered.filter(article =>
                article.Category === parseInt(filterValue, 10)
            );
        }

        // Search by title, authors, or abstract
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(article =>
                article.Heading_title?.toLowerCase().includes(query) ||
                article.Authors?.toLowerCase().includes(query) ||
                article.Abstract?.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [articleData, filterValue, searchQuery]);

    // Paginate
    const paginatedArticles = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredArticles.slice(start, start + pageSize);
    }, [filteredArticles, currentPage, pageSize]);

    const totalPages = Math.ceil(filteredArticles.length / pageSize);

    const toggleAbstract = (index: number) => {
        setExpandedAbstract(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    const toggleAffiliation = (index: number) => {
        setExpandedAffiliation(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    const getCancerName = () => {
        switch (type) {
            case 'lung-cancer': return 'Ung thư phổi';
            case 'liver-cancer': return 'Ung thư gan';
            case 'breast-cancer': return 'Ung thư vú';
            case 'thyroid-cancer': return 'Ung thư tuyến giáp';
            case 'colorectal-cancer': return 'Ung thư đại trực tràng';
            default: return '';
        }
    };

    return (
        <div className="w-full p-6 bg-pure-white rounded-xl shadow-sm border border-slate-light animate-fade-in">
            <h1 className="text-2xl font-bold text-teal-900 mb-6 border-b border-slate-light pb-2 uppercase">
                BÀI BÁO LIÊN QUAN - {getCancerName().toUpperCase()}
            </h1>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-medium w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tiêu đề, tác giả..."
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-slate-dark">Phân loại:</label>
                    <select
                        className="px-4 py-2.5 border border-slate-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
                        value={filterValue}
                        onChange={(e) => {
                            setFilterValue(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="All">Tất cả</option>
                        <option value="1">Liên quan đến gen đột biến</option>
                        <option value="0">Không liên quan đến gen</option>
                    </select>
                </div>
            </div>

            {/* Results count */}
            <div className="mb-4 text-sm text-slate-medium">
                Tìm thấy <span className="font-semibold text-teal-700">{filteredArticles.length}</span> bài báo
                {totalPages > 1 && (
                    <span> - Trang {currentPage}/{totalPages}</span>
                )}
            </div>

            {/* Articles List */}
            <div className="space-y-4">
                {paginatedArticles.map((article, index) => (
                    <div
                        key={article.Index2 || index}
                        className="p-4 border border-slate-light rounded-lg hover:shadow-md transition-shadow bg-teal-50/30"
                    >
                        {/* Citation */}
                        <p className="text-xs text-slate-medium mb-2">{article.Article_citation}</p>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-research-blue mb-2 hover:underline cursor-pointer">
                            {article.Heading_title}
                        </h3>

                        {/* Authors */}
                        <div className="flex items-start gap-2 mb-2">
                            <Users className="w-4 h-4 text-slate-medium mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-slate-dark">{article.Authors}</p>
                        </div>

                        {/* Identifiers */}
                        {article.Identifiers && (
                            <p className="text-xs text-slate-medium mb-3">{article.Identifiers}</p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            <button
                                onClick={() => toggleAffiliation(index)}
                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-teal-100 text-teal-700 rounded-md hover:bg-teal-200 transition-colors"
                            >
                                <Building2 className="w-3.5 h-3.5" />
                                Affiliation
                                {expandedAffiliation.has(index) ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                            <button
                                onClick={() => toggleAbstract(index)}
                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-teal-100 text-teal-700 rounded-md hover:bg-teal-200 transition-colors"
                            >
                                <BookOpen className="w-3.5 h-3.5" />
                                Abstract
                                {expandedAbstract.has(index) ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                            {article.Free_label && (
                                <span className="px-3 py-1.5 text-xs font-medium bg-verified-green/10 text-verified-green rounded-md">
                                    {article.Free_label}
                                </span>
                            )}
                        </div>

                        {/* Affiliation (expandable) */}
                        {expandedAffiliation.has(index) && article.Affiliation && (
                            <div className="p-3 bg-white rounded-md border border-slate-light mb-2">
                                <p className="text-sm text-slate-dark">{article.Affiliation}</p>
                            </div>
                        )}

                        {/* Abstract (expandable) */}
                        {expandedAbstract.has(index) && article.Abstract && (
                            <div className="p-3 bg-white rounded-md border border-slate-light">
                                <h4 className="text-sm font-semibold text-teal-900 mb-2">Abstract</h4>
                                <p className="text-sm text-slate-dark leading-relaxed text-justify">{article.Abstract}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {paginatedArticles.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-slate-light mx-auto mb-4" />
                    <p className="text-slate-medium">Không tìm thấy bài báo nào.</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md border border-slate-light hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }
                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${currentPage === pageNum
                                    ? 'bg-teal-500 text-white'
                                    : 'border border-slate-light hover:bg-teal-50 text-slate-dark'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md border border-slate-light hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Article;
