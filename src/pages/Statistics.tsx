import { useState, useEffect, useMemo } from 'react';
import { BarChart3, PieChart, TrendingUp, Users, Activity, Heart, Stethoscope, Loader2 } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart as RePieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

// Mock statistics data
const mockStatistics = {
    total: 15420,
    details: [
        { organ: 'lung', name: 'Phổi', count: 5230, percentage: '33.9%' },
        { organ: 'breast', name: 'Vú', count: 4120, percentage: '26.7%' },
        { organ: 'colorectal', name: 'Đại tràng', count: 2850, percentage: '18.5%' },
        { organ: 'liver', name: 'Gan', count: 1890, percentage: '12.3%' },
        { organ: 'thyroid', name: 'Tuyến giáp', count: 1330, percentage: '8.6%' },
    ]
};

const organColors: Record<string, string> = {
    'Phổi': '#1BA6A6',
    'Vú': '#2E7D32',
    'Đại tràng': '#2563EB',
    'Gan': '#7C3AED',
    'Tuyến giáp': '#F59E0B',
    'Tổng': '#0E4F4F',
};

const organIcons: Record<string, React.ReactNode> = {
    'Phổi': <Activity className="w-6 h-6" />,
    'Vú': <Heart className="w-6 h-6" />,
    'Đại tràng': <Stethoscope className="w-6 h-6" />,
    'Gan': <Activity className="w-6 h-6" />,
    'Tuyến giáp': <Activity className="w-6 h-6" />,
};

const Statistics = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(mockStatistics);

    useEffect(() => {
        // Simulate API loading
        setTimeout(() => {
            setData(mockStatistics);
            setLoading(false);
        }, 800);
    }, []);

    const barData = useMemo(() => {
        const arr = data.details.map(d => ({ type: d.name, count: d.count }));
        arr.sort((a, b) => b.count - a.count);
        return [{ type: 'Tổng', count: data.total }, ...arr];
    }, [data]);

    const pieData = useMemo(() =>
        data.details.map(d => ({ type: d.name, count: d.count })),
        [data]
    );

    if (loading) {
        return (
            <div className="w-full p-6 bg-pure-white rounded-xl shadow-sm border border-slate-light flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                <h1 className="text-2xl font-bold text-teal-900 mb-2 flex items-center gap-3 uppercase">
                    <BarChart3 className="w-7 h-7 text-teal-500" />
                    THỐNG KÊ XÉT NGHIỆM UNG THƯ
                </h1>
                <p className="text-slate-medium">Tổng quan về số liệu xét nghiệm gen ở các loại ung thư</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Total Card */}
                <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl shadow-lg p-5 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-teal-100 text-sm font-medium">Tổng số ca</p>
                            <p className="text-3xl font-bold mt-1">{data.total.toLocaleString()}</p>
                        </div>
                        <Users className="w-10 h-10 text-teal-200" />
                    </div>
                </div>

                {/* Individual Cancer Stats */}
                {data.details.map((item) => (
                    <div
                        key={item.organ}
                        className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-5 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-medium text-sm font-medium">{item.name}</p>
                                <p
                                    className="text-2xl font-bold mt-1"
                                    style={{ color: organColors[item.name] }}
                                >
                                    {item.count.toLocaleString()}
                                </p>
                                <p className="text-xs text-slate-medium mt-1">{item.percentage}</p>
                            </div>
                            <div
                                className="p-2.5 rounded-full"
                                style={{ backgroundColor: `${organColors[item.name]}15` }}
                            >
                                <div style={{ color: organColors[item.name] }}>
                                    {organIcons[item.name]}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                    <h2 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-teal-500" />
                        Biểu đồ cột - Số lượng ca bệnh
                    </h2>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={barData}
                                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#E4E9F0" />
                                <XAxis
                                    dataKey="type"
                                    tick={{ fontSize: 12, fill: '#64748B' }}
                                    axisLine={{ stroke: '#CBD5E1' }}
                                />
                                <YAxis
                                    tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}
                                    tick={{ fontSize: 12, fill: '#64748B' }}
                                    axisLine={{ stroke: '#CBD5E1' }}
                                />
                                <Tooltip
                                    formatter={(value: number) => [`${value.toLocaleString()} ca`, 'Số lượng']}
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: '1px solid #E4E9F0',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Bar
                                    dataKey="count"
                                    radius={[6, 6, 0, 0]}
                                >
                                    {barData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={organColors[entry.type] || '#1BA6A6'}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                    <h2 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-teal-500" />
                        Biểu đồ tròn - Tỷ lệ phần trăm
                    </h2>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="count"
                                    nameKey="type"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                                    labelLine={{ stroke: '#64748B' }}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`slice-${index}`}
                                            fill={organColors[entry.type] || '#1BA6A6'}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => [`${value.toLocaleString()} ca`, 'Số lượng']}
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: '1px solid #E4E9F0'
                                    }}
                                />
                                <Legend
                                    verticalAlign="middle"
                                    align="right"
                                    layout="vertical"
                                    iconType="circle"
                                />
                            </RePieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Trend indicator */}
            <div className="bg-teal-50 rounded-xl border border-teal-100 p-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-teal-600" />
                <p className="text-sm text-teal-900">
                    <span className="font-semibold">Xu hướng:</span> Số ca xét nghiệm gen tăng 15.2% so với quý trước
                </p>
            </div>
        </div>
    );
};

export default Statistics;
