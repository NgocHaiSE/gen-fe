
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Save, ArrowLeft, Check } from 'lucide-react';
import { LUNG_TEMPLATE } from '../config/lungTemplate';
import GeneticTestInfo from '../components/GeneticTestInfo';

interface PatientDetailProps {
    type: string;
}

export default function PatientDetail({ type }: PatientDetailProps) {
    // const { id } = useParams(); // For edit mode later
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);

    // Form state (simplified for demo)
    const [formData, setFormData] = useState({
        // Patient Info
        patientId: '',
        fullName: '',
        dob: '',
        gender: '1',
        ethnic: '',
        nationality: '',
        address: '',
        phone: '',
        hospital: 'DHY',
        department: '',
        doctor: '',

        // Clinical Info
        cancerType: type === 'lung-cancer' ? '1' : '3', // Default mapping
        metastasis: '',

        // Genetic Info
        sampleSource: '',
        sampleType: '',
        testDate: '',
    });

    const steps = [
        { id: 1, title: 'Thông tin bệnh nhân' },
        { id: 2, title: 'Thông tin kỹ thuật' },
        { id: 3, title: 'Thông tin xét nghiệm gen' },
    ];

    const handleNext = () => {
        if (currentStep < 3) setCurrentStep(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleSave = () => {
        // Here we would call the service to save
        console.log('Saving data:', formData);
        navigate(`/${type}/overview`); // Return to list
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(`/${type}/overview`)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-teal-900 uppercase">THÊM MỚI BỆNH ÁN</h1>
                        <p className="text-sm text-gray-500 capitalize">{type.replace('-', ' ')}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm">
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Lưu bệnh án
                    </button>
                </div>
            </div>

            {/* Stepper */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-0 translate-y-[-50%]"></div>
                {steps.map((step) => (
                    <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 cursor-pointer bg-white px-4" onClick={() => setCurrentStep(step.id)}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentStep === step.id
                            ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-50 scale-110'
                            : currentStep > step.id
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                            {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                        </div>
                        <span className={`text-sm font-medium ${currentStep === step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[500px] animate-fade-in">
                {currentStep === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">Thông tin hành chính</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Mã bệnh nhân <span className="text-red-500">*</span></label>
                                <input name="patientId" value={formData.patientId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="VD: BN001" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Họ và tên <span className="text-red-500">*</span></label>
                                <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Nhập họ tên đầy đủ" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Ngày sinh</label>
                                <div className="relative">
                                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Giới tính</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white">
                                    <option value="1">Nam</option>
                                    <option value="2">Nữ</option>
                                    <option value="3">Khác</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Dân tộc</label>
                                <input name="ethnic" value={formData.ethnic} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Quốc tịch</label>
                                <input name="nationality" value={formData.nationality} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" defaultValue="Việt Nam" />
                            </div>
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">Địa chỉ</label>
                                <input name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Số nhà, đường, phường/xã..." />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
                                <input name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="09xxxxxxxx" />
                            </div>
                        </div>

                        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 mt-8">Thông tin điều trị</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Bệnh viện</label>
                                <input name="hospital" value={formData.hospital} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Khoa / Phòng</label>
                                <input name="department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Bác sĩ điều trị</label>
                                <input name="doctor" value={formData.doctor} onChange={handleChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-8 animate-fade-in">
                        {LUNG_TEMPLATE.generalInfo.map((section) => (
                            <div key={section.key} className="bg-white rounded-lg">
                                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4 uppercase">{section.name}</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {section.listQuestions.map((q: any) => (
                                        <div key={q.id} className="space-y-3">
                                            {q.type === 'group' ? (
                                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                    <label className="text-sm font-semibold text-gray-800 block mb-3">{q.label}</label>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                        {q.children.map((child: any) => (
                                                            <div key={child.id} className={child.type === 'checkbox' ? "flex items-center gap-2" : "space-y-1"}>
                                                                {child.type === 'checkbox' ? (
                                                                    <>
                                                                        <input type="checkbox" id={child.id} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                                                                        <label htmlFor={child.id} className="text-sm text-gray-700">{child.label}</label>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <label htmlFor={child.id} className="text-xs font-medium text-gray-500">{child.label}</label>
                                                                        <input
                                                                            type={child.type}
                                                                            id={child.id}
                                                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-sm"
                                                                            placeholder={child.unit || ''}
                                                                        />
                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-1">
                                                    <label className="text-sm font-medium text-gray-700">{q.label}</label>
                                                    {q.type === 'select' ? (
                                                        <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white">
                                                            {q.options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                                                        </select>
                                                    ) : (
                                                        <input type={q.type} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm">
                            Nội dung đang được cập nhật. Vui lòng quay lại sau.
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Quay lại
                </button>
                {currentStep < 3 ? (
                    <button
                        onClick={handleNext}
                        className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-all"
                    >
                        Tiếp tục <ChevronRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm flex items-center gap-2 transition-all"
                    >
                        <Save className="w-4 h-4" /> Hoàn tất
                    </button>
                )}
            </div>
        </div>
    );
}
