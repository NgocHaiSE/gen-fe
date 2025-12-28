import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useEffect, useState } from 'react';
import { getTop20GeneEndpoint } from '../config/api';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

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
                setData(geneData);
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
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-[400px] bg-gray-100 rounded"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-red-500 text-center py-8">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 uppercase">Top 20 Gene Đột Biến - {type.replace(/-/g, ' ')}</h3>
                <p className="text-sm text-gray-500">Tần suất xuất hiện các đột biến gen phổ biến (dữ liệu từ server)</p>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Không có dữ liệu</div>
            ) : (
                <div className="h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                            <XAxis type="number" tickFormatter={(value) => `${value}`} />
                            <YAxis
                                type="category"
                                dataKey="gene_name"
                                tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 500 }}
                                width={70}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: '#f9fafb' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(value: number) => [`${value}`, 'Số trường hợp']}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18}>
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
