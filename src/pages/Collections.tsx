import { useState } from 'react';
import { FlaskConical, Search, Plus, ChevronRight, Dna, TestTube, Microscope, FileText } from 'lucide-react';

interface TestCollection {
    id: string;
    name: string;
    description: string;
    category: string;
    geneCount: number;
    icon: string;
}

const mockCollections: TestCollection[] = [
    { id: '1', name: 'Panel ung thư phổi', description: 'Xét nghiệm các gen đột biến phổ biến trong ung thư phổi', category: 'Phổi', geneCount: 15, icon: 'lung' },
    { id: '2', name: 'Panel EGFR mở rộng', description: 'Xét nghiệm toàn diện các đột biến EGFR', category: 'Phổi', geneCount: 8, icon: 'dna' },
    { id: '3', name: 'Panel ung thư vú', description: 'Xét nghiệm BRCA1, BRCA2 và các gen liên quan', category: 'Vú', geneCount: 12, icon: 'breast' },
    { id: '4', name: 'Panel ung thư gan', description: 'Xét nghiệm các gen đột biến trong ung thư gan', category: 'Gan', geneCount: 10, icon: 'liver' },
    { id: '5', name: 'Panel MSI/MMR', description: 'Xét nghiệm bất ổn định vi vệ tinh', category: 'Đại trực tràng', geneCount: 5, icon: 'msi' },
    { id: '6', name: 'Panel tuyến giáp', description: 'Xét nghiệm BRAF, RET và các gen liên quan', category: 'Tuyến giáp', geneCount: 7, icon: 'thyroid' },
];

const Collections = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'Phổi', 'Vú', 'Gan', 'Đại trực tràng', 'Tuyến giáp'];

    const filteredCollections = mockCollections.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = selectedCategory === 'all' || c.category === selectedCategory;
        return matchSearch && matchCategory;
    });

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Phổi': 'bg-blue-500',
            'Vú': 'bg-pink-500',
            'Gan': 'bg-purple-500',
            'Đại trực tràng': 'bg-green-500',
            'Tuyến giáp': 'bg-yellow-500',
        };
        return colors[category] || 'bg-teal-500';
    };

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                <h1 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-3 uppercase">
                    <FlaskConical className="w-7 h-7 text-teal-500" />
                    DANH MỤC XÉT NGHIỆM
                </h1>
                <p className="text-slate-medium">Các bộ xét nghiệm gen phục vụ chẩn đoán và điều trị ung thư</p>
            </div>

            {/* Filter Bar */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-medium w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm xét nghiệm..."
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat
                                    ? 'bg-teal-500 text-white'
                                    : 'bg-slate-100 text-slate-dark hover:bg-slate-200'
                                    }`}
                            >
                                {cat === 'all' ? 'Tất cả' : cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCollections.map((collection) => (
                    <div
                        key={collection.id}
                        className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-5 hover:shadow-lg transition-all cursor-pointer group"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className={`w-12 h-12 ${getCategoryColor(collection.category)} rounded-xl flex items-center justify-center`}>
                                <TestTube className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xs font-medium text-slate-medium bg-slate-100 px-2 py-1 rounded">
                                {collection.geneCount} gen
                            </span>
                        </div>
                        <h3 className="font-bold text-teal-900 mb-1 group-hover:text-teal-600 transition-colors">
                            {collection.name}
                        </h3>
                        <p className="text-sm text-slate-medium mb-3 line-clamp-2">
                            {collection.description}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(collection.category)} bg-opacity-10 text-slate-dark`}>
                                {collection.category}
                            </span>
                            <ChevronRight className="w-5 h-5 text-slate-medium group-hover:text-teal-500 transition-colors" />
                        </div>
                    </div>
                ))}
            </div>

            {filteredCollections.length === 0 && (
                <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-12 text-center">
                    <Microscope className="w-16 h-16 text-slate-light mx-auto mb-4" />
                    <p className="text-slate-medium">Không tìm thấy xét nghiệm phù hợp</p>
                </div>
            )}

            {/* Info Card */}
            <div className="bg-teal-50 rounded-xl border border-teal-100 p-4 flex items-start gap-3">
                <FileText className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm text-teal-900 font-medium mb-1">Hướng dẫn sử dụng</p>
                    <p className="text-sm text-teal-700">
                        Chọn bộ xét nghiệm phù hợp với loại ung thư của bệnh nhân. Mỗi panel bao gồm các gen đột biến quan trọng
                        giúp định hướng điều trị và tiên lượng bệnh.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Collections;
