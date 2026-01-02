import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { useEffect, useState } from 'react';
import { getTop20GeneEndpoint } from '../config/api';

const COLORS = ['#14b8a6', '#0ea5e9', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#10b981', '#6366f1'];

interface GeneData {
    gene_name: string;
    value: number;
    type?: string;
}

export default function TopMutatedGenes({ type }: { type: string }) {
    const [data, setData] = useState<GeneData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            const url = getTop20GeneEndpoint(type);

            if (!url) {
                setError('Unsupported cancer type');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch data');
                const json = await response.json();

                // Handle array or object response
                const geneData = Array.isArray(json) ? json : (json.data || json.genes || []);
                // Sort by value descending (highest to lowest)
                const sortedData = [...geneData].sort((a: GeneData, b: GeneData) => b.value - a.value);
                setData(sortedData);
            } catch (err) {
                console.error('Error fetching top genes:', err);
                setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-[400px] bg-gray-100 rounded"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center py-8">{error}</div>
        );
    }

    const getCancerDisplayName = (cancerType: string) => {
        switch (cancerType) {
            case 'lung-cancer': return 'Ung thư phổi';
            case 'liver-cancer': return 'Ung thư gan';
            case 'breast-cancer': return 'Ung thư vú';
            case 'thyroid-cancer': return 'Ung thư tuyến giáp';
            case 'colorectal-cancer': return 'Ung thư đại trực tràng';
            default: return cancerType.replace(/-/g, ' ');
        }
    };

    // Calculate dynamic width based on data length (minimum 60px per bar)
    const chartWidth = Math.max(800, data.length * 60);

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-teal-900">Top 20 Gene Đột Biến - {getCancerDisplayName(type)}</h3>
                <p className="text-sm text-gray-500">Tần suất xuất hiện các đột biến gen phổ biến</p>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Không có dữ liệu</div>
            ) : (
                <div className="overflow-x-auto pb-4">
                    <div style={{ width: chartWidth, height: 450 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data}
                                margin={{ top: 30, right: 20, left: 20, bottom: 100 }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    horizontal={true}
                                    vertical={false}
                                    stroke="#e5e7eb"
                                />
                                <XAxis
                                    dataKey="gene_name"
                                    tick={{ fill: '#1f2937', fontSize: 12, fontWeight: 600 }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    tickLine={false}
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                    interval={0}
                                />
                                <YAxis
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f0fdfa' }}
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                        padding: '12px 16px'
                                    }}
                                    formatter={(value) => [`${value ?? 0} trường hợp`, 'Số lượng']}
                                    labelFormatter={(label) => `Gen: ${label}`}
                                />
                                <Bar
                                    dataKey="value"
                                    radius={[6, 6, 0, 0]}
                                    barSize={40}
                                >
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                    <LabelList
                                        dataKey="value"
                                        position="top"
                                        fill="#374151"
                                        fontSize={11}
                                        fontWeight={600}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
}
