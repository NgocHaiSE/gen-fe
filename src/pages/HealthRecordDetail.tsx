import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    User, History, Stethoscope, ClipboardList, TestTube, Pill,
    TrendingUp, FlaskConical, Save, ArrowLeft
} from 'lucide-react';
import request from '../utils/request';

interface HealthRecordDetailProps {
    recordType: string;
}

// Menu sections
const menuSections = [
    { key: 'patient_info', label: 'Hành chính', icon: User },
    { key: 'medical_history', label: 'Tiền sử', icon: History },
    { key: 'disease_history', label: 'Bệnh sử', icon: ClipboardList },
    { key: 'clinical_examination', label: 'Khám lâm sàng', icon: Stethoscope },
    { key: 'subclinical', label: 'Cận lâm sàng', icon: TestTube },
    { key: 'treatments', label: 'Phương pháp điều trị', icon: Pill },
    { key: 'assessment', label: 'Đánh giá đáp ứng', icon: TrendingUp },
    { key: 'gen_test', label: 'Xét nghiệm di truyền', icon: FlaskConical },
];

const HealthRecordDetail = ({ recordType }: HealthRecordDetailProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState('patient_info');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form data
    const [patientInfo, setPatientInfo] = useState({
        healthRecordId: '',
        healthRecordClass: '',
        PatineId: '',
        startDate: '',
        identID: '',
        fullname: '',
        dob: '',
        sex: '',
        job: '',
        address: '',
        phone: '',
    });

    const [medicalHistory, setMedicalHistory] = useState({
        smoking: '',
        smokingYears: '',
        alcohol: '',
        familyHistory: '',
        personalHistory: '',
        allergies: '',
    });

    const [diseaseHistory, setDiseaseHistory] = useState({
        firstSymptom: '',
        symptomDate: '',
        diagnosisDate: '',
        diagnosisLocation: '',
        diagnosisMethod: '',
    });

    const [clinicalExam, setClinicalExam] = useState({
        height: '',
        weight: '',
        bmi: '',
        ps: '',
        temperature: '',
        bloodPressure: '',
        heartRate: '',
        respiratoryRate: '',
    });

    const [subclinical, setSubclinical] = useState({
        rbc: '',
        wbc: '',
        hb: '',
        plt: '',
        ast: '',
        alt: '',
        ure: '',
        creatinine: '',
    });

    const [treatments, setTreatments] = useState({
        surgery: '',
        surgeryDate: '',
        chemotherapy: '',
        chemotherapyRegimen: '',
        radiotherapy: '',
        targetedTherapy: '',
        immunotherapy: '',
    });

    const [assessment, setAssessment] = useState({
        responseRate: '',
        tumorSize: '',
        assessmentDate: '',
        status: '',
    });

    const [genTest, setGenTest] = useState({
        testCode: '',
        patientId: '',
        sourceSample: '',
        typeSample: '',
        dateSample: '',
        testDate: '',
        concentrateDNA: '',
        purityDNA: '',
        mutations: '',
    });

    // Fetch health record data
    useEffect(() => {
        const fetchData = async () => {
            if (id === '0') {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const response = await request.post(`/${recordType}/get-health-record`, { id });
                const data = response.data?.data || response.data;

                if (data) {
                    if (data.patientInfo) setPatientInfo(prev => ({ ...prev, ...data.patientInfo }));
                    if (data.medicalHistory) setMedicalHistory(prev => ({ ...prev, ...data.medicalHistory }));
                    if (data.diseaseHistory) setDiseaseHistory(prev => ({ ...prev, ...data.diseaseHistory }));
                    if (data.clinicalExam) setClinicalExam(prev => ({ ...prev, ...data.clinicalExam }));
                    if (data.subclinical) setSubclinical(prev => ({ ...prev, ...data.subclinical }));
                    if (data.treatments) setTreatments(prev => ({ ...prev, ...data.treatments }));
                    if (data.assessment) setAssessment(prev => ({ ...prev, ...data.assessment }));
                    if (data.genTestInfo) setGenTest(prev => ({ ...prev, ...data.genTestInfo }));
                }
            } catch (error) {
                console.error('Error fetching health record:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, recordType]);

    // Save health record
    const handleSave = async () => {
        setSaving(true);
        try {
            await request.post(`/${recordType}/save`, {
                typeHealthRecord: recordType,
                healthRecordId: patientInfo.healthRecordId,
                patientInfo,
                medicalHistory,
                diseaseHistory,
                clinicalExam,
                subclinical,
                treatments,
                assessment,
                genTestInfo: genTest,
            });
            alert('Lưu bệnh án thành công!');
            navigate(-1);
        } catch (error) {
            console.error('Error saving health record:', error);
            alert('Có lỗi xảy ra khi lưu bệnh án');
        } finally {
            setSaving(false);
        }
    };

    const getCancerName = () => {
        const names: Record<string, string> = {
            'lung-record': 'Ung thư phổi',
            'liver-record': 'Ung thư gan',
            'breast-record': 'Ung thư vú',
            'thyroid-record': 'Ung thư tuyến giáp',
            'colorectal-record': 'Ung thư đại trực tràng',
        };
        return names[recordType] || 'Ung thư';
    };

    const inputClass = "w-full px-3 py-2 border border-slate-light rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm";
    const labelClass = "block text-sm font-medium text-slate-dark mb-1";

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
                    <p className="text-slate-medium">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full animate-fade-in">
            {/* Sidebar Menu */}
            <div className="w-64 bg-pure-white border-r border-slate-light flex-shrink-0">
                <div className="p-4 border-b border-slate-light">
                    <h2 className="text-lg font-bold text-teal-900">Bệnh án</h2>
                    <p className="text-sm text-slate-medium">{getCancerName()}</p>
                </div>
                <nav className="p-2">
                    {menuSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.key}
                                onClick={() => setCurrentSection(section.key)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${currentSection === section.key
                                    ? 'bg-teal-500 text-white'
                                    : 'text-slate-dark hover:bg-teal-50 hover:text-teal-700'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {section.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="bg-pure-white border-b border-slate-light p-4 sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-slate-dark" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-teal-900 uppercase">
                                    BỆNH ÁN {getCancerName().toUpperCase()}
                                </h1>
                                <p className="text-sm text-slate-medium">
                                    {id === '0' ? 'Tạo mới bệnh án' : `Mã bệnh án: ${patientInfo.healthRecordId || id}`}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 border border-slate-light rounded-lg text-slate-dark hover:bg-slate-50 transition-colors text-sm font-medium"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {saving ? 'Đang lưu...' : 'Lưu bệnh án'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6">
                    {/* Patient Info Section */}
                    {currentSection === 'patient_info' && (
                        <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                            <h3 className="text-lg font-bold text-teal-900 mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-teal-500" />
                                I. HÀNH CHÍNH
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Mã bệnh án</label>
                                    <input type="text" className={inputClass} value={patientInfo.healthRecordId}
                                        onChange={e => setPatientInfo({ ...patientInfo, healthRecordId: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Phân loại bệnh án</label>
                                    <div className="flex gap-4 mt-2">
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="healthRecordClass" value="yes"
                                                checked={patientInfo.healthRecordClass === 'yes'}
                                                onChange={e => setPatientInfo({ ...patientInfo, healthRecordClass: e.target.value })} />
                                            Duyệt
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="healthRecordClass" value="no"
                                                checked={patientInfo.healthRecordClass === 'no'}
                                                onChange={e => setPatientInfo({ ...patientInfo, healthRecordClass: e.target.value })} />
                                            Chưa
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Mã bệnh nhân</label>
                                    <input type="text" className={inputClass} value={patientInfo.PatineId}
                                        onChange={e => setPatientInfo({ ...patientInfo, PatineId: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Ngày tiến hành khảo sát</label>
                                    <input type="date" className={inputClass} value={patientInfo.startDate}
                                        onChange={e => setPatientInfo({ ...patientInfo, startDate: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>ID định danh</label>
                                    <input type="text" className={inputClass} value={patientInfo.identID}
                                        onChange={e => setPatientInfo({ ...patientInfo, identID: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Họ và tên</label>
                                    <input type="text" className={inputClass} value={patientInfo.fullname}
                                        onChange={e => setPatientInfo({ ...patientInfo, fullname: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Năm sinh</label>
                                    <input type="text" className={inputClass} maxLength={4} value={patientInfo.dob}
                                        onChange={e => setPatientInfo({ ...patientInfo, dob: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Giới tính</label>
                                    <div className="flex gap-4 mt-2">
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="sex" value="male"
                                                checked={patientInfo.sex === 'male'}
                                                onChange={e => setPatientInfo({ ...patientInfo, sex: e.target.value })} />
                                            Nam
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="sex" value="female"
                                                checked={patientInfo.sex === 'female'}
                                                onChange={e => setPatientInfo({ ...patientInfo, sex: e.target.value })} />
                                            Nữ
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Nghề nghiệp</label>
                                    <input type="text" className={inputClass} value={patientInfo.job}
                                        onChange={e => setPatientInfo({ ...patientInfo, job: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Địa chỉ (Huyện - Tỉnh/TP)</label>
                                    <input type="text" className={inputClass} value={patientInfo.address}
                                        onChange={e => setPatientInfo({ ...patientInfo, address: e.target.value })} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClass}>SĐT liên lạc</label>
                                    <input type="text" className={inputClass} value={patientInfo.phone}
                                        onChange={e => setPatientInfo({ ...patientInfo, phone: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Medical History Section */}
                    {currentSection === 'medical_history' && (
                        <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                            <h3 className="text-lg font-bold text-teal-900 mb-6 flex items-center gap-2">
                                <History className="w-5 h-5 text-teal-500" />
                                II. TIỀN SỬ
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Hút thuốc</label>
                                    <select className={inputClass} value={medicalHistory.smoking}
                                        onChange={e => setMedicalHistory({ ...medicalHistory, smoking: e.target.value })}>
                                        <option value="">Chọn</option>
                                        <option value="never">Không bao giờ</option>
                                        <option value="former">Đã bỏ</option>
                                        <option value="current">Đang hút</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Số năm hút thuốc</label>
                                    <input type="number" className={inputClass} value={medicalHistory.smokingYears}
                                        onChange={e => setMedicalHistory({ ...medicalHistory, smokingYears: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Uống rượu</label>
                                    <select className={inputClass} value={medicalHistory.alcohol}
                                        onChange={e => setMedicalHistory({ ...medicalHistory, alcohol: e.target.value })}>
                                        <option value="">Chọn</option>
                                        <option value="never">Không</option>
                                        <option value="occasional">Thỉnh thoảng</option>
                                        <option value="regular">Thường xuyên</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Tiền sử gia đình</label>
                                    <textarea className={inputClass} rows={3} value={medicalHistory.familyHistory}
                                        onChange={e => setMedicalHistory({ ...medicalHistory, familyHistory: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Tiền sử bản thân</label>
                                    <textarea className={inputClass} rows={3} value={medicalHistory.personalHistory}
                                        onChange={e => setMedicalHistory({ ...medicalHistory, personalHistory: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Dị ứng</label>
                                    <textarea className={inputClass} rows={3} value={medicalHistory.allergies}
                                        onChange={e => setMedicalHistory({ ...medicalHistory, allergies: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Disease History Section */}
                    {currentSection === 'disease_history' && (
                        <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                            <h3 className="text-lg font-bold text-teal-900 mb-6 flex items-center gap-2">
                                <ClipboardList className="w-5 h-5 text-teal-500" />
                                III. BỆNH SỬ
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Triệu chứng đầu tiên</label>
                                    <textarea className={inputClass} rows={3} value={diseaseHistory.firstSymptom}
                                        onChange={e => setDiseaseHistory({ ...diseaseHistory, firstSymptom: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Ngày xuất hiện triệu chứng</label>
                                    <input type="date" className={inputClass} value={diseaseHistory.symptomDate}
                                        onChange={e => setDiseaseHistory({ ...diseaseHistory, symptomDate: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Ngày chẩn đoán</label>
                                    <input type="date" className={inputClass} value={diseaseHistory.diagnosisDate}
                                        onChange={e => setDiseaseHistory({ ...diseaseHistory, diagnosisDate: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Nơi chẩn đoán</label>
                                    <input type="text" className={inputClass} value={diseaseHistory.diagnosisLocation}
                                        onChange={e => setDiseaseHistory({ ...diseaseHistory, diagnosisLocation: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Phương pháp chẩn đoán</label>
                                    <input type="text" className={inputClass} value={diseaseHistory.diagnosisMethod}
                                        onChange={e => setDiseaseHistory({ ...diseaseHistory, diagnosisMethod: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Clinical Examination Section */}
                    {currentSection === 'clinical_examination' && (
                        <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                            <h3 className="text-lg font-bold text-teal-900 mb-6 flex items-center gap-2">
                                <Stethoscope className="w-5 h-5 text-teal-500" />
                                IV. KHÁM LÂM SÀNG
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className={labelClass}>Chiều cao (cm)</label>
                                    <input type="number" className={inputClass} value={clinicalExam.height}
                                        onChange={e => setClinicalExam({ ...clinicalExam, height: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Cân nặng (kg)</label>
                                    <input type="number" className={inputClass} value={clinicalExam.weight}
                                        onChange={e => setClinicalExam({ ...clinicalExam, weight: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>BMI</label>
                                    <input type="text" className={inputClass} value={clinicalExam.bmi}
                                        onChange={e => setClinicalExam({ ...clinicalExam, bmi: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>PS (ECOG)</label>
                                    <select className={inputClass} value={clinicalExam.ps}
                                        onChange={e => setClinicalExam({ ...clinicalExam, ps: e.target.value })}>
                                        <option value="">Chọn</option>
                                        <option value="0">0 - Hoạt động bình thường</option>
                                        <option value="1">1 - Hạn chế hoạt động nặng</option>
                                        <option value="2">2 - Đi lại được</option>
                                        <option value="3">3 - Nghỉ ngơi &gt;50%</option>
                                        <option value="4">4 - Nằm nghỉ hoàn toàn</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Nhiệt độ (°C)</label>
                                    <input type="text" className={inputClass} value={clinicalExam.temperature}
                                        onChange={e => setClinicalExam({ ...clinicalExam, temperature: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Huyết áp (mmHg)</label>
                                    <input type="text" className={inputClass} placeholder="120/80" value={clinicalExam.bloodPressure}
                                        onChange={e => setClinicalExam({ ...clinicalExam, bloodPressure: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Nhịp tim (lần/phút)</label>
                                    <input type="number" className={inputClass} value={clinicalExam.heartRate}
                                        onChange={e => setClinicalExam({ ...clinicalExam, heartRate: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Nhịp thở (lần/phút)</label>
                                    <input type="number" className={inputClass} value={clinicalExam.respiratoryRate}
                                        onChange={e => setClinicalExam({ ...clinicalExam, respiratoryRate: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Subclinical Section */}
                    {currentSection === 'subclinical' && (
                        <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                            <h3 className="text-lg font-bold text-teal-900 mb-6 flex items-center gap-2">
                                <TestTube className="w-5 h-5 text-teal-500" />
                                V. CẬN LÂM SÀNG
                            </h3>
                            <h4 className="text-sm font-semibold text-teal-700 mb-3">Công thức máu</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div>
                                    <label className={labelClass}>RBC (T/L)</label>
                                    <input type="text" className={inputClass} value={subclinical.rbc}
                                        onChange={e => setSubclinical({ ...subclinical, rbc: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>WBC (G/L)</label>
                                    <input type="text" className={inputClass} value={subclinical.wbc}
                                        onChange={e => setSubclinical({ ...subclinical, wbc: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Hb (g/L)</label>
                                    <input type="text" className={inputClass} value={subclinical.hb}
                                        onChange={e => setSubclinical({ ...subclinical, hb: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>PLT (G/L)</label>
                                    <input type="text" className={inputClass} value={subclinical.plt}
                                        onChange={e => setSubclinical({ ...subclinical, plt: e.target.value })} />
                                </div>
                            </div>
                            <h4 className="text-sm font-semibold text-teal-700 mb-3">Sinh hóa máu</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className={labelClass}>AST (U/L)</label>
                                    <input type="text" className={inputClass} value={subclinical.ast}
                                        onChange={e => setSubclinical({ ...subclinical, ast: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>ALT (U/L)</label>
                                    <input type="text" className={inputClass} value={subclinical.alt}
                                        onChange={e => setSubclinical({ ...subclinical, alt: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Ure (mmol/L)</label>
                                    <input type="text" className={inputClass} value={subclinical.ure}
                                        onChange={e => setSubclinical({ ...subclinical, ure: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Creatinine (µmol/L)</label>
                                    <input type="text" className={inputClass} value={subclinical.creatinine}
                                        onChange={e => setSubclinical({ ...subclinical, creatinine: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Treatments Section */}
                    {currentSection === 'treatments' && (
                        <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                            <h3 className="text-lg font-bold text-teal-900 mb-6 flex items-center gap-2">
                                <Pill className="w-5 h-5 text-teal-500" />
                                VI. PHƯƠNG PHÁP ĐIỀU TRỊ
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Phẫu thuật</label>
                                    <select className={inputClass} value={treatments.surgery}
                                        onChange={e => setTreatments({ ...treatments, surgery: e.target.value })}>
                                        <option value="">Chọn</option>
                                        <option value="yes">Có</option>
                                        <option value="no">Không</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Ngày phẫu thuật</label>
                                    <input type="date" className={inputClass} value={treatments.surgeryDate}
                                        onChange={e => setTreatments({ ...treatments, surgeryDate: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Hóa trị</label>
                                    <select className={inputClass} value={treatments.chemotherapy}
                                        onChange={e => setTreatments({ ...treatments, chemotherapy: e.target.value })}>
                                        <option value="">Chọn</option>
                                        <option value="yes">Có</option>
                                        <option value="no">Không</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Phác đồ hóa trị</label>
                                    <input type="text" className={inputClass} value={treatments.chemotherapyRegimen}
                                        onChange={e => setTreatments({ ...treatments, chemotherapyRegimen: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Xạ trị</label>
                                    <select className={inputClass} value={treatments.radiotherapy}
                                        onChange={e => setTreatments({ ...treatments, radiotherapy: e.target.value })}>
                                        <option value="">Chọn</option>
                                        <option value="yes">Có</option>
                                        <option value="no">Không</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Điều trị đích</label>
                                    <select className={inputClass} value={treatments.targetedTherapy}
                                        onChange={e => setTreatments({ ...treatments, targetedTherapy: e.target.value })}>
                                        <option value="">Chọn</option>
                                        <option value="yes">Có</option>
                                        <option value="no">Không</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Điều trị miễn dịch</label>
                                    <select className={inputClass} value={treatments.immunotherapy}
                                        onChange={e => setTreatments({ ...treatments, immunotherapy: e.target.value })}>
                                        <option value="">Chọn</option>
                                        <option value="yes">Có</option>
                                        <option value="no">Không</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Assessment Section */}
                    {currentSection === 'assessment' && (
                        <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                            <h3 className="text-lg font-bold text-teal-900 mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-teal-500" />
                                VII. ĐÁNH GIÁ ĐÁP ỨNG ĐIỀU TRỊ
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Tỷ lệ đáp ứng (%)</label>
                                    <input type="text" className={inputClass} value={assessment.responseRate}
                                        onChange={e => setAssessment({ ...assessment, responseRate: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Kích thước khối u (mm)</label>
                                    <input type="text" className={inputClass} value={assessment.tumorSize}
                                        onChange={e => setAssessment({ ...assessment, tumorSize: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Ngày đánh giá</label>
                                    <input type="date" className={inputClass} value={assessment.assessmentDate}
                                        onChange={e => setAssessment({ ...assessment, assessmentDate: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Đánh giá đáp ứng</label>
                                    <select className={inputClass} value={assessment.status}
                                        onChange={e => setAssessment({ ...assessment, status: e.target.value })}>
                                        <option value="">Chọn</option>
                                        <option value="CR">CR - Complete Response</option>
                                        <option value="PR">PR - Partial Response</option>
                                        <option value="SD">SD - Stable Disease</option>
                                        <option value="PD">PD - Progression Disease</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Gene Test Section */}
                    {currentSection === 'gen_test' && (
                        <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                            <h3 className="text-lg font-bold text-teal-900 mb-6 flex items-center gap-2">
                                <FlaskConical className="w-5 h-5 text-teal-500" />
                                VIII. THÔNG TIN XÉT NGHIỆM DI TRUYỀN
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Mã xét nghiệm</label>
                                    <input type="text" className={inputClass} value={genTest.testCode}
                                        onChange={e => setGenTest({ ...genTest, testCode: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Mã bệnh nhân</label>
                                    <input type="text" className={inputClass} value={genTest.patientId}
                                        onChange={e => setGenTest({ ...genTest, patientId: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Nguồn gốc mẫu</label>
                                    <select className={inputClass} value={genTest.sourceSample}
                                        onChange={e => setGenTest({ ...genTest, sourceSample: e.target.value })}>
                                        <option value="">Chọn</option>
                                        <option value="primary">Mô tổn thương tiên phát</option>
                                        <option value="metastatic">Mô tổn thương di căn</option>
                                        <option value="other">Khác</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Loại mẫu</label>
                                    <select className={inputClass} value={genTest.typeSample}
                                        onChange={e => setGenTest({ ...genTest, typeSample: e.target.value })}>
                                        <option value="">Chọn</option>
                                        <option value="fresh">Mô tươi</option>
                                        <option value="ffpe">FFPE</option>
                                        <option value="blood">Máu ngoại vi (ctDNA)</option>
                                        <option value="dna">DNA</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Ngày lấy mẫu</label>
                                    <input type="date" className={inputClass} value={genTest.dateSample}
                                        onChange={e => setGenTest({ ...genTest, dateSample: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Ngày xét nghiệm</label>
                                    <input type="date" className={inputClass} value={genTest.testDate}
                                        onChange={e => setGenTest({ ...genTest, testDate: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Nồng độ DNA (ng/µL)</label>
                                    <input type="text" className={inputClass} value={genTest.concentrateDNA}
                                        onChange={e => setGenTest({ ...genTest, concentrateDNA: e.target.value })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Độ tinh sạch DNA (A260/280)</label>
                                    <input type="text" className={inputClass} value={genTest.purityDNA}
                                        onChange={e => setGenTest({ ...genTest, purityDNA: e.target.value })} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClass}>Đột biến phát hiện</label>
                                    <textarea className={inputClass} rows={4} value={genTest.mutations}
                                        placeholder="VD: EGFR L858R, KRAS G12C..."
                                        onChange={e => setGenTest({ ...genTest, mutations: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HealthRecordDetail;
