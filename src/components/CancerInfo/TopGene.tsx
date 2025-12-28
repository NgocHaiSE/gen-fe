import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EndPoints } from '../../config/endpoints';
import request from '../../utils/request';

interface TopGeneProps {
    type: string;
}

export default function TopGene({ type }: TopGeneProps) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getEndpoint = (type: string) => {
        switch (type) {
            case 'lung-cancer': return EndPoints.mutationLung20Gene;
            case 'liver-cancer': return EndPoints.mutationLiver20Gene;
            case 'breast-cancer': return EndPoints.mutationBreast20Gene;
            case 'thyroid-cancer': return EndPoints.mutationThyroid20Gene;
            case 'colorectal-cancer': return EndPoints.mutationColorectal20Gene;
            default: return '';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const url = getEndpoint(type);
            if (!url) return;

            try {
                // Using axios request utility
                const response = await request(url, { method: 'GET' });
                // Response might be the array directly or in data property depending on API
                const chartData = Array.isArray(response) ? response : (response.data || []);
                setData(chartData);
            } catch (error) {
                console.error("Failed to fetch top genes", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);

    if (loading) {
        return <div className="h-[400px] flex items-center justify-center text-gray-400">Loading chart data...</div>;
    }

    if (data.length === 0) {
        return <div className="h-[400px] flex items-center justify-center text-gray-400">No data available</div>;
    }

    // gen-fe used "gene_name" and "value"
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Top 20 Mutated Genes</h3>
            <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="gene_name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Legend />
                        <Bar dataKey="value" fill="var(--color-medical-primary)" name="Frequency" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
