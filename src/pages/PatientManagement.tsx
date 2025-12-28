import { useState } from 'react';
import { User, Calendar, MapPin, Phone, Building2, Stethoscope, FlaskConical, ChevronRight, ChevronLeft, Check, Plus, Trash2 } from 'lucide-react';

interface PatientInfo {
    id: string;
    name: string;
    age: string;
    gender: string;
    ethnicity: string;
    nationality: string;
    address: string;
    phone: string;
    hospital: string;
    department: string;
    doctor: string;
}

interface ClinicalInfo {
    cancerType: string;
    metastaticOrgan: string;
    stage: string;
    t: string;
    n: string;
    m: string;
    anamnesis: string;
    familyHistory: string;
    rbc: string;
    hb: string;
    wbc: string;
    plt: string;
    ast: string;
    alt: string;
    ure: string;
    creatinine: string;
}

interface GeneTest {
    sampleOrigin: string;
    sampleType: string;
    sampleDate: string;
    testDate: string;
    preservationMethod: string;
    shippingCondition: string;
    sampleStatus: string;
    testMethod: string;
    mutations: { gene: string; type: string; percentage: string }[];
}

const PatientManagement = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [patientInfo, setPatientInfo] = useState<PatientInfo>({
        id: '', name: '', age: '', gender: '', ethnicity: '',
        nationality: '', address: '', phone: '', hospital: '',
        department: '', doctor: ''
    });
    const [clinicalInfo, setClinicalInfo] = useState<ClinicalInfo>({
        cancerType: '', metastaticOrgan: '', stage: '', t: '', n: '', m: '',
        anamnesis: '', familyHistory: '', rbc: '', hb: '', wbc: '', plt: '',
        ast: '', alt: '', ure: '', creatinine: ''
    });
    const [geneTest, setGeneTest] = useState<GeneTest>({
        sampleOrigin: '', sampleType: '', sampleDate: '', testDate: '',
        preservationMethod: '', shippingCondition: '', sampleStatus: '',
        testMethod: '', mutations: []
    });

    const steps = [
        { title: 'Thông tin bệnh nhân', icon: User },
        { title: 'Thông tin lâm sàng', icon: Stethoscope },
        { title: 'Thông tin xét nghiệm gen', icon: FlaskConical },
    ];

    const addMutation = () => {
        setGeneTest(prev => ({
            ...prev,
            mutations: [...prev.mutations, { gene: '', type: '', percentage: '' }]
        }));
    };

    const removeMutation = (index: number) => {
        setGeneTest(prev => ({
            ...prev,
            mutations: prev.mutations.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = () => {
        console.log('Submitting:', { patientInfo, clinicalInfo, geneTest });
        alert('Đã lưu thông tin bệnh nhân thành công!');
    };

    const inputClass = "w-full px-3 py-2 border border-slate-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm";
    const labelClass = "block text-sm font-medium text-slate-dark mb-1";
    const selectClass = "w-full px-3 py-2 border border-slate-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-sm";

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                <h1 className="text-2xl font-bold text-teal-900 mb-2">THÊM THÔNG TIN BỆNH NHÂN</h1>
                <p className="text-slate-medium">Nhập đầy đủ thông tin bệnh nhân và kết quả xét nghiệm gen</p>
            </div>

            {/* Stepper */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center flex-1">
                            <div className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${index < currentStep
                                            ? 'bg-teal-500 text-white'
                                            : index === currentStep
                                                ? 'bg-teal-500 text-white'
                                                : 'bg-slate-light text-slate-medium'
                                        }`}
                                >
                                    {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                                </div>
                                <div className="ml-3">
                                    <p className={`text-sm font-medium ${index <= currentStep ? 'text-teal-900' : 'text-slate-medium'}`}>
                                        {step.title}
                                    </p>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-4 ${index < currentStep ? 'bg-teal-500' : 'bg-slate-light'}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                {/* Step 1: Patient Info */}
                {currentStep === 0 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-teal-900 flex items-center gap-2">
                            <User className="w-5 h-5 text-teal-500" />
                            Thông tin bệnh nhân
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className={labelClass}>Mã bệnh nhân</label>
                                <input type="text" className={inputClass} value={patientInfo.id}
                                    onChange={e => setPatientInfo({ ...patientInfo, id: e.target.value })} />
                            </div>
                            <div>
                                <label className={labelClass}>Tên bệnh nhân</label>
                                <input type="text" className={inputClass} value={patientInfo.name}
                                    onChange={e => setPatientInfo({ ...patientInfo, name: e.target.value })} />
                            </div>
                            <div>
                                <label className={labelClass}>Tuổi (năm sinh)</label>
                                <input type="text" className={inputClass} value={patientInfo.age}
                                    onChange={e => setPatientInfo({ ...patientInfo, age: e.target.value })} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className={labelClass}>Giới tính</label>
                                <select className={selectClass} value={patientInfo.gender}
                                    onChange={e => setPatientInfo({ ...patientInfo, gender: e.target.value })}>
                                    <option value="">Chọn giới tính</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="other">Khác</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Dân tộc</label>
                                <input type="text" className={inputClass} value={patientInfo.ethnicity}
                                    onChange={e => setPatientInfo({ ...patientInfo, ethnicity: e.target.value })} />
                            </div>
                            <div>
                                <label className={labelClass}>Quốc tịch</label>
                                <input type="text" className={inputClass} value={patientInfo.nationality}
                                    onChange={e => setPatientInfo({ ...patientInfo, nationality: e.target.value })} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}><MapPin className="w-4 h-4 inline mr-1" />Địa chỉ</label>
                                <input type="text" className={inputClass} value={patientInfo.address}
                                    onChange={e => setPatientInfo({ ...patientInfo, address: e.target.value })} />
                            </div>
                            <div>
                                <label className={labelClass}><Phone className="w-4 h-4 inline mr-1" />Số điện thoại</label>
                                <input type="text" className={inputClass} value={patientInfo.phone}
                                    onChange={e => setPatientInfo({ ...patientInfo, phone: e.target.value })} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className={labelClass}><Building2 className="w-4 h-4 inline mr-1" />Bệnh viện</label>
                                <input type="text" className={inputClass} value={patientInfo.hospital}
                                    onChange={e => setPatientInfo({ ...patientInfo, hospital: e.target.value })} />
                            </div>
                            <div>
                                <label className={labelClass}>Khoa/Phòng điều trị</label>
                                <input type="text" className={inputClass} value={patientInfo.department}
                                    onChange={e => setPatientInfo({ ...patientInfo, department: e.target.value })} />
                            </div>
                            <div>
                                <label className={labelClass}>Bác sĩ điều trị</label>
                                <input type="text" className={inputClass} value={patientInfo.doctor}
                                    onChange={e => setPatientInfo({ ...patientInfo, doctor: e.target.value })} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Clinical Info */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-teal-900 flex items-center gap-2">
                            <Stethoscope className="w-5 h-5 text-teal-500" />
                            Thông tin lâm sàng
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Loại ung thư</label>
                                <select className={selectClass} value={clinicalInfo.cancerType}
                                    onChange={e => setClinicalInfo({ ...clinicalInfo, cancerType: e.target.value })}>
                                    <option value="">Chọn loại ung thư</option>
                                    <option value="lung">Ung thư phổi</option>
                                    <option value="breast">Ung thư vú</option>
                                    <option value="liver">Ung thư gan</option>
                                    <option value="thyroid">Ung thư tuyến giáp</option>
                                    <option value="colorectal">Ung thư đại trực tràng</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Cơ quan di căn</label>
                                <select className={selectClass} value={clinicalInfo.metastaticOrgan}
                                    onChange={e => setClinicalInfo({ ...clinicalInfo, metastaticOrgan: e.target.value })}>
                                    <option value="">Chọn cơ quan</option>
                                    <option value="brain">Não</option>
                                    <option value="lung">Phổi</option>
                                    <option value="liver">Gan</option>
                                    <option value="bone">Xương</option>
                                    <option value="none">Không di căn</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className={labelClass}>Stage</label>
                                <input type="text" className={inputClass} value={clinicalInfo.stage}
                                    onChange={e => setClinicalInfo({ ...clinicalInfo, stage: e.target.value })} />
                            </div>
                            <div>
                                <label className={labelClass}>T</label>
                                <input type="text" className={inputClass} value={clinicalInfo.t}
                                    onChange={e => setClinicalInfo({ ...clinicalInfo, t: e.target.value })} />
                            </div>
                            <div>
                                <label className={labelClass}>N</label>
                                <input type="text" className={inputClass} value={clinicalInfo.n}
                                    onChange={e => setClinicalInfo({ ...clinicalInfo, n: e.target.value })} />
                            </div>
                            <div>
                                <label className={labelClass}>M</label>
                                <input type="text" className={inputClass} value={clinicalInfo.m}
                                    onChange={e => setClinicalInfo({ ...clinicalInfo, m: e.target.value })} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Tiền sử bệnh</label>
                                <input type="text" className={inputClass} value={clinicalInfo.anamnesis}
                                    onChange={e => setClinicalInfo({ ...clinicalInfo, anamnesis: e.target.value })} />
                            </div>
                            <div>
                                <label className={labelClass}>Tiền sử gia đình</label>
                                <input type="text" className={inputClass} value={clinicalInfo.familyHistory}
                                    onChange={e => setClinicalInfo({ ...clinicalInfo, familyHistory: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-teal-700 mb-3">Công thức máu</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className={labelClass}>RBC (T/L)</label>
                                    <input type="text" className={inputClass} value={clinicalInfo.rbc}
                                        onChange={e => setClinicalInfo({ ...clinicalInfo, rbc: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Hb (g/L)</label>
                                    <input type="text" className={inputClass} value={clinicalInfo.hb}
                                        onChange={e => setClinicalInfo({ ...clinicalInfo, hb: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>WBC (G/L)</label>
                                    <input type="text" className={inputClass} value={clinicalInfo.wbc}
                                        onChange={e => setClinicalInfo({ ...clinicalInfo, wbc: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>PLT (G/L)</label>
                                    <input type="text" className={inputClass} value={clinicalInfo.plt}
                                        onChange={e => setClinicalInfo({ ...clinicalInfo, plt: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-teal-700 mb-3">Hóa sinh máu</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className={labelClass}>AST (U/L)</label>
                                    <input type="text" className={inputClass} value={clinicalInfo.ast}
                                        onChange={e => setClinicalInfo({ ...clinicalInfo, ast: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>ALT (U/L)</label>
                                    <input type="text" className={inputClass} value={clinicalInfo.alt}
                                        onChange={e => setClinicalInfo({ ...clinicalInfo, alt: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Ure (mmol/L)</label>
                                    <input type="text" className={inputClass} value={clinicalInfo.ure}
                                        onChange={e => setClinicalInfo({ ...clinicalInfo, ure: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Creatinine (mol/L)</label>
                                    <input type="text" className={inputClass} value={clinicalInfo.creatinine}
                                        onChange={e => setClinicalInfo({ ...clinicalInfo, creatinine: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Gene Test Info */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-teal-900 flex items-center gap-2">
                            <FlaskConical className="w-5 h-5 text-teal-500" />
                            Thông tin xét nghiệm gen
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Nguồn gốc mẫu</label>
                                <select className={selectClass} value={geneTest.sampleOrigin}
                                    onChange={e => setGeneTest({ ...geneTest, sampleOrigin: e.target.value })}>
                                    <option value="">Chọn nguồn gốc</option>
                                    <option value="primary">Mô tổn thương tiên phát</option>
                                    <option value="metastatic">Mô tổn thương di căn</option>
                                    <option value="other">Khác</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Loại mẫu</label>
                                <select className={selectClass} value={geneTest.sampleType}
                                    onChange={e => setGeneTest({ ...geneTest, sampleType: e.target.value })}>
                                    <option value="">Chọn loại mẫu</option>
                                    <option value="fresh">Mô tươi</option>
                                    <option value="ffpe">FFPE</option>
                                    <option value="blood">Máu ngoại vi (ctDNA)</option>
                                    <option value="fluid">Dịch màng phổi/màng bụng</option>
                                    <option value="dna">DNA</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}><Calendar className="w-4 h-4 inline mr-1" />Ngày lấy mẫu</label>
                                <input type="date" className={inputClass} value={geneTest.sampleDate}
                                    onChange={e => setGeneTest({ ...geneTest, sampleDate: e.target.value })} />
                            </div>
                            <div>
                                <label className={labelClass}><Calendar className="w-4 h-4 inline mr-1" />Ngày xét nghiệm</label>
                                <input type="date" className={inputClass} value={geneTest.testDate}
                                    onChange={e => setGeneTest({ ...geneTest, testDate: e.target.value })} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className={labelClass}>Phương pháp bảo quản</label>
                                <select className={selectClass} value={geneTest.preservationMethod}
                                    onChange={e => setGeneTest({ ...geneTest, preservationMethod: e.target.value })}>
                                    <option value="">Chọn phương pháp</option>
                                    <option value="room">Nhiệt độ thường</option>
                                    <option value="4c">4°C</option>
                                    <option value="-20c">-20°C</option>
                                    <option value="-80c">-80°C</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Điều kiện vận chuyển</label>
                                <select className={selectClass} value={geneTest.shippingCondition}
                                    onChange={e => setGeneTest({ ...geneTest, shippingCondition: e.target.value })}>
                                    <option value="">Chọn điều kiện</option>
                                    <option value="room">Nhiệt độ thường</option>
                                    <option value="ice">Ice bag</option>
                                    <option value="dry-ice">Dry ice</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Tình trạng mẫu</label>
                                <select className={selectClass} value={geneTest.sampleStatus}
                                    onChange={e => setGeneTest({ ...geneTest, sampleStatus: e.target.value })}>
                                    <option value="">Chọn tình trạng</option>
                                    <option value="pass">Đạt</option>
                                    <option value="fail">Không đạt</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Phương pháp xét nghiệm gen</label>
                            <input type="text" className={inputClass} value={geneTest.testMethod}
                                onChange={e => setGeneTest({ ...geneTest, testMethod: e.target.value })} />
                        </div>

                        {/* Mutations Table */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-teal-700">Kết quả xét nghiệm gen</h3>
                                <button
                                    onClick={addMutation}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600"
                                >
                                    <Plus className="w-4 h-4" /> Thêm đột biến
                                </button>
                            </div>

                            {geneTest.mutations.length > 0 ? (
                                <div className="border border-slate-light rounded-lg overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-teal-50">
                                            <tr>
                                                <th className="text-left py-2 px-3 text-sm font-semibold text-teal-900">Gen</th>
                                                <th className="text-left py-2 px-3 text-sm font-semibold text-teal-900">Loại đột biến</th>
                                                <th className="text-left py-2 px-3 text-sm font-semibold text-teal-900">Tỉ lệ (%)</th>
                                                <th className="w-16"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {geneTest.mutations.map((mutation, index) => (
                                                <tr key={index} className="border-t border-slate-light">
                                                    <td className="py-2 px-3">
                                                        <input type="text" className={inputClass} placeholder="EGFR"
                                                            value={mutation.gene}
                                                            onChange={e => {
                                                                const newMutations = [...geneTest.mutations];
                                                                newMutations[index].gene = e.target.value;
                                                                setGeneTest({ ...geneTest, mutations: newMutations });
                                                            }} />
                                                    </td>
                                                    <td className="py-2 px-3">
                                                        <input type="text" className={inputClass} placeholder="L858R"
                                                            value={mutation.type}
                                                            onChange={e => {
                                                                const newMutations = [...geneTest.mutations];
                                                                newMutations[index].type = e.target.value;
                                                                setGeneTest({ ...geneTest, mutations: newMutations });
                                                            }} />
                                                    </td>
                                                    <td className="py-2 px-3">
                                                        <input type="text" className={inputClass} placeholder="45.5"
                                                            value={mutation.percentage}
                                                            onChange={e => {
                                                                const newMutations = [...geneTest.mutations];
                                                                newMutations[index].percentage = e.target.value;
                                                                setGeneTest({ ...geneTest, mutations: newMutations });
                                                            }} />
                                                    </td>
                                                    <td className="py-2 px-3">
                                                        <button onClick={() => removeMutation(index)} className="p-1.5 text-error-red hover:bg-red-50 rounded">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-medium text-center py-4 border border-dashed border-slate-light rounded-lg">
                                    Chưa có kết quả xét nghiệm. Nhấn "Thêm đột biến" để thêm.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 px-4 py-2.5 border border-slate-light rounded-lg text-slate-dark hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-5 h-5" /> Quay lại
                </button>

                {currentStep < steps.length - 1 ? (
                    <button
                        onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                        className="flex items-center gap-2 px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
                    >
                        Tiếp theo <ChevronRight className="w-5 h-5" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
                    >
                        <Check className="w-5 h-5" /> Lưu thông tin
                    </button>
                )}
            </div>
        </div>
    );
};

export default PatientManagement;
