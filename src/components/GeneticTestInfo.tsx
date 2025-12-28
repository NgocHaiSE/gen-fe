const MOCK_GENE_DATA = [
    { gene: 'EGFR', nucleotide: 'c.2573T>G', vaf: '2.5', drugResponse: 'Sensitizing' },
    { gene: 'KRAS', nucleotide: 'c.35G>A', vaf: '12.1', drugResponse: 'Resistant' },
    { gene: 'ALK', nucleotide: 'EML4-ALK variant 1', vaf: '5.6', drugResponse: 'Sensitizing' },
];

export default function GeneticTestInfo() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 uppercase">II. KẾT QUẢ GIẢI TRÌNH TỰ GEN</h3>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">Gen</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">Biến thể</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 text-center">VAF (%)</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">Khả năng đáp ứng thuốc</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {MOCK_GENE_DATA.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50">
                                <td className="p-4 font-bold text-gray-700">{item.gene}</td>
                                <td className="p-4 text-sm text-gray-600 font-mono bg-gray-50 rounded px-2 w-fit">{item.nucleotide}</td>
                                <td className="p-4 text-sm text-gray-600 text-center">{item.vaf}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.drugResponse === 'Sensitizing'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {item.drugResponse}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex gap-3 text-sm text-blue-800">
                <div className="shrink-0">ℹ️</div>
                <div>
                    <strong>Lưu ý:</strong> Kết quả trên chỉ hiển thị các biến thể có ý nghĩa lâm sàng được FDA công nhận hoặc Bộ Y tế phê duyệt.
                </div>
            </div>
        </div>
    )
}
