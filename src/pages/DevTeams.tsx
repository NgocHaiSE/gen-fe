import { useNavigate } from 'react-router-dom';
import { Users, Github, Linkedin, Mail, GraduationCap, Building2, Heart, Code2, ArrowLeft } from 'lucide-react';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    institution: string;
    avatar: string;
    bio: string;
    email?: string;
    github?: string;
    linkedin?: string;
}

const teamMembers: TeamMember[] = [
    {
        id: '1',
        name: 'PGS.TS. Nguyễn Thị Trang',
        role: 'Trưởng nhóm nghiên cứu',
        institution: 'Đại học Y Hà Nội',
        avatar: '/avatars/default.png',
        bio: 'Chuyên gia về di truyền học ung thư với hơn 15 năm kinh nghiệm nghiên cứu',
        email: 'nguyenvana@hmu.edu.vn'
    },
    {
        id: '2',
        name: 'TS. Phan Thị Hải Hồng',
        role: 'Nghiên cứu viên',
        institution: 'Học viện Kỹ thuật quân sự',
        avatar: '/avatars/default.png',
        bio: 'Chuyên gia về tin sinh học và phân tích dữ liệu gen',
        email: 'tranthib@hust.edu.vn',
        github: 'tranthib'
    },
    {
        id: '3',
        name: 'BS. Phạm Thị D',
        role: 'Bác sĩ chuyên khoa ung bướu',
        institution: 'Bệnh viện K',
        avatar: '/avatars/default.png',
        bio: 'Chuyên gia lâm sàng về điều trị ung thư phổi và ung thư vú',
        email: 'phamthid@bvk.vn'
    },
    {
        id: '4',
        name: 'Nguyễn Ngọc Hải',
        role: 'Kỹ sư phần mềm',
        institution: 'Học viện Kỹ thuật quân sự',
        avatar: '/avatars/default.png',
        bio: 'Phát triển và duy trì hệ thống web application',
        email: 'devnnhai@gmail.com',
        github: 'NgocHaiSE'
    },
    {
        id: '5',
        name: 'ThS. Hoàng Văn E',
        role: 'Nghiên cứu sinh',
        institution: 'Đại học Y Hà Nội',
        avatar: '/avatars/default.png',
        bio: 'Nghiên cứu về đột biến gen và điều trị đích trong ung thư',
    },
    {
        id: '6',
        name: 'CN. Ngô Thị F',
        role: 'Kỹ thuật viên xét nghiệm',
        institution: 'Bệnh viện Bạch Mai',
        avatar: '/avatars/default.png',
        bio: 'Thực hiện các xét nghiệm gen bằng kỹ thuật NGS',
    },
];

const DevTeams = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full animate-fade-in space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-xl shadow-lg p-8 text-white">
                <button
                    onClick={() => navigate('/home')}
                    className="flex items-center gap-2 text-teal-100 hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Quay lại Trang chủ</span>
                </button>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white uppercase">NHÓM PHÁT TRIỂN</h1>
                        <p className="text-teal-100 mt-1">Đội ngũ nghiên cứu và phát triển hệ thống</p>
                    </div>
                </div>
                <p className="text-teal-50 max-w-3xl">
                    Dự án được thực hiện bởi sự hợp tác giữa các chuyên gia y khoa, nghiên cứu viên và kỹ sư phần mềm
                    từ nhiều cơ sở đào tạo và bệnh viện hàng đầu Việt Nam.
                </p>
            </div>

            {/* Partner Institutions */}
            <div className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-6">
                <h2 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-teal-500" />
                    Đơn vị hợp tác
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Đại học Y Hà Nội', 'Học viện Kỹ thuật quân sự', 'Bệnh viện K', 'Bệnh viện Bạch Mai'].map((inst, index) => (
                        <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                            <GraduationCap className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                            <p className="text-sm font-medium text-slate-dark">{inst}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                    <div
                        key={member.id}
                        className="bg-pure-white rounded-xl shadow-sm border border-slate-light p-5 hover:shadow-lg transition-all"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {member.name.split(' ').pop()?.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-teal-900">{member.name}</h3>
                                <p className="text-sm text-teal-600 font-medium">{member.role}</p>
                                <p className="text-xs text-slate-medium mt-0.5">{member.institution}</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-dark mb-4 line-clamp-2">{member.bio}</p>
                        <div className="flex gap-2">
                            {member.email && (
                                <a href={`mailto:${member.email}`} className="p-2 text-slate-medium hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                                    <Mail className="w-4 h-4" />
                                </a>
                            )}
                            {member.github && (
                                <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-medium hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                                    <Github className="w-4 h-4" />
                                </a>
                            )}
                            {member.linkedin && (
                                <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-medium hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="bg-teal-50 rounded-xl border border-teal-100 p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <Code2 className="w-5 h-5 text-teal-600" />
                </div>
                <p className="text-sm text-teal-900 font-medium mb-1">
                    Được phát triển với sự tận tâm vì sức khỏe cộng đồng
                </p>
            </div>
        </div>
    );
};

export default DevTeams;
