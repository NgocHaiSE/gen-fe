
import { useEffect, useState } from 'react';
import { healthRecordService, Patient } from '../services/healthRecord';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PatientListProps {
    type: string;
}

export default function PatientList({ type }: PatientListProps) {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadPatients();
    }, [type]);

    const loadPatients = async () => {
        setLoading(true);
        try {
            const res = await healthRecordService.getAllByType(type);
            if (res.success) {
                setPatients(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Danh sách bệnh nhân</h2>
                    <p className="text-sm text-gray-500 mt-1">Quản lý hồ sơ bệnh án {type.replace('-', ' ')}</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
                        />
                    </div>
                    <button
                        onClick={() => navigate('new')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
                    >
                        <Plus className="w-4 h-4" />
                        Thêm bệnh án
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Họ tên</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Năm sinh</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Giới tính</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Chẩn đoán</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Giai đoạn</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-500">Đang tải dữ liệu...</td>
                            </tr>
                        ) : patients.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-500">Chưa có dữ liệu</td>
                            </tr>
                        ) : (
                            patients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="p-4 text-sm font-medium text-gray-700">{patient.id}</td>
                                    <td className="p-4 text-sm font-semibold text-gray-900">{patient.name}</td>
                                    <td className="p-4 text-sm text-gray-600">{patient.dob}</td>
                                    <td className="p-4 text-sm text-gray-600">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${patient.gender === 'Nam' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                                            }`}>
                                            {patient.gender}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-600">{patient.diagnosis}</td>
                                    <td className="p-4 text-sm text-gray-600">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                            {patient.stage}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Chỉnh sửa">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Xóa">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <span className="text-xs text-gray-500">Hiển thị {patients.length} kết quả</span>
                <div className="flex gap-1">
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded bg-white text-gray-600 hover:border-gray-300 disabled:opacity-50">Trước</button>
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded bg-blue-50 text-blue-600 border-blue-200 font-medium">1</button>
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded bg-white text-gray-600 hover:border-gray-300">2</button>
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded bg-white text-gray-600 hover:border-gray-300">Sau</button>
                </div>
            </div>
        </div>
    );
}
