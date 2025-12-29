import { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, BookOpen, Users, Building2, ExternalLink, Loader2 } from 'lucide-react';
import { articleService, parseIdentifiers, generateArticleUrls, Article as ArticleType } from '../services/article';

interface ArticleProps {
    type: string;
}

const Article = ({ type }: ArticleProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterValue, setFilterValue] = useState('All');
    const [expandedAbstract, setExpandedAbstract] = useState<Set<number>>(new Set());
    const [expandedAffiliation, setExpandedAffiliation] = useState<Set<number>>(new Set());
    const [articles, setArticles] = useState<ArticleType[]>([]);
    const [totalArticles, setTotalArticles] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const pageSize = 10;

    // Fetch articles from API
    const fetchArticles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await articleService.getByType(
                type,
                currentPage,
                pageSize,
                searchQuery,
                filterValue
            );
            if (response.success) {
                setArticles(response.data);
                setTotalArticles(response.pagination.total);
                setTotalPages(response.pagination.totalPages);
            } else {
                setError('Không thể tải dữ liệu bài báo');
            }
        } catch (err) {
            console.error('Error fetching articles:', err);
            setError('Lỗi kết nối đến server. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    }, [type, currentPage, searchQuery, filterValue]);

    // Fetch when dependencies change
    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    // Reset page when type changes
    useEffect(() => {
        setCurrentPage(1);
        setSearchQuery('');
        setFilterValue('All');
        setExpandedAbstract(new Set());
        setExpandedAffiliation(new Set());
    }, [type]);

    // Debounce search
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Use debounced search for API calls
    useEffect(() => {
        if (debouncedSearch !== searchQuery) return;
        fetchArticles();
    }, [debouncedSearch]);

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

    // Get article links for a specific article
    const getArticleLinks = (article: ArticleType) => {
        const identifiers = parseIdentifiers(article.Identifiers);
        return generateArticleUrls(identifiers);
    };

    // Get primary link for title (first available: PMID > DOI > PMCID)
    const getPrimaryLink = (article: ArticleType) => {
        const links = getArticleLinks(article);
        return links.length > 0 ? links[0].url : null;
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
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                Tìm thấy <span className="font-semibold text-teal-700">{totalArticles}</span> bài báo
                {totalPages > 1 && (
                    <span> - Trang {currentPage}/{totalPages}</span>
                )}
            </div>

            {/* Loading state */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                    <span className="ml-3 text-slate-medium">Đang tải dữ liệu...</span>
                </div>
            )}

            {/* Error state */}
            {error && !loading && (
                <div className="text-center py-12">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={fetchArticles}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                    >
                        Thử lại
                    </button>
                </div>
            )}

            {/* Articles List */}
            {!loading && !error && (
                <div className="space-y-4">
                    {articles.map((article, index) => {
                        const articleLinks = getArticleLinks(article);
                        const primaryLink = getPrimaryLink(article);

                        return (
                            <div
                                key={article.Index2 || index}
                                className="p-4 border border-slate-light rounded-lg hover:shadow-md transition-shadow bg-teal-50/30"
                            >
                                {/* Citation */}
                                <p className="text-xs text-slate-medium mb-2">{article.Article_citation}</p>

                                {/* Title - Clickable with primary link */}
                                {primaryLink ? (
                                    <a
                                        href={primaryLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg font-semibold text-research-blue mb-2 hover:underline cursor-pointer flex items-start gap-2 group"
                                    >
                                        <span>{article.Heading_title}</span>
                                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                                    </a>
                                ) : (
                                    <h3 className="text-lg font-semibold text-research-blue mb-2">
                                        {article.Heading_title}
                                    </h3>
                                )}

                                {/* Authors */}
                                <div className="flex items-start gap-2 mb-2">
                                    <Users className="w-4 h-4 text-slate-medium mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-slate-dark">{article.Authors}</p>
                                </div>

                                {/* Identifiers */}
                                {article.Identifiers && (
                                    <p className="text-xs text-slate-medium mb-3">{article.Identifiers}</p>
                                )}

                                {/* Article Link Buttons - Display all available links */}
                                {articleLinks.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {articleLinks.map((link) => (
                                            <a
                                                key={link.type}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-research-blue/10 text-research-blue rounded-md hover:bg-research-blue/20 transition-colors"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
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
                        );
                    })}
                </div>
            )}

            {/* Empty state */}
            {!loading && !error && articles.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-slate-light mx-auto mb-4" />
                    <p className="text-slate-medium">Không tìm thấy bài báo nào.</p>
                </div>
            )}

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
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
